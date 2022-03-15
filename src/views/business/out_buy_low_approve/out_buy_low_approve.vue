<template>
  <div>
    <basic-container v-if="showMain" class="process-low-me-approve">
      <div style="border-bottom: 1px solid  #DCDFE6;">
        <tag-select style="" :data="tagData" :active="activeTag" @click="handlerSwitchTag">
          <div style="display: flex;" slot="operator">
            <el-input style="width: 300px;" v-model="query.searchKey" placeholder="请输入事项编号/标题" size="small"></el-input>
            <el-button type="primary" style="margin-left: 20px;" @click="onLoad" size="small">查询</el-button>
          </div>
        </tag-select>
      </div>
      <div>
        <!--<div style="display: flex; width: 20%; min-width: 300px; margin-top: 20px;">-->
          <!--<el-input v-model="query.searchKey" placeholder="请输入事项编号/标题" size="small"></el-input>-->
          <!--<el-button type="primary" style="margin-left: 20px;" @click="onLoad" size="small">查询</el-button>-->
        <!--</div>-->
        <div style="margin-top: 20px;">
          <el-table
            :key="activeTag"
            v-loading="loading"
            element-loading-text="拼命加载中"
            :header-cell-style="{background: '#fafafa', 'textAlign': 'center', fontWeight: 700, color: 'rgba(0,0,0,.85)',fontSize: '12px'}"
            :cell-style="{'textAlign': 'center',}"
            :data="data"
            border
            :height="tableHeight"
            style="width: 100%">
            <el-table-column
              label="序号"
              width="80">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              label="业务类型">
              <template slot-scope="scope">
                {{scope.row.resourceType === 0 ? '外购件不良' : '工序内不良'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="code"
              label="不良编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="title"
              min-width="180"
              label="标题">
            </el-table-column>
            <el-table-column
              prop="apparatusType"
              label="机型">
              <template slot-scope="scope">
                {{apparatusMap[scope.row.apparatusType]}}
              </template>
            </el-table-column>
            <el-table-column
              prop="designation"
              label="品番号">
            </el-table-column>
            <el-table-column
              prop="dutyDeptName"
              min-width="240"
              show-overflow-tooltip
              label="责任部门/厂家">
            </el-table-column>
            <el-table-column
              prop="bpmRemark"
              min-width="200"
              label="当前业务环节">
            </el-table-column>
            <el-table-column
              prop="bpmPushStatus"
              min-width="200"
              label="推进状态">
              <template slot-scope="scope">
                <div>
                  <el-tag size="small" v-if="scope.row.bpmPushStatus===0" type="success">{{pushStatusMap[scope.row.bpmPushStatus]}}</el-tag>
                  <el-tag size="small" v-if="scope.row.bpmPushStatus===1" type="danger">{{pushStatusMap[scope.row.bpmPushStatus]}}</el-tag>
                  <el-tag size="small" v-if="scope.row.bpmPushStatus===2" type="warning">{{pushStatusMap[scope.row.bpmPushStatus]}}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="startTime"
              min-width="200"
              v-if="activeTag !== 2"
              label="接受时间">
            </el-table-column>
            <el-table-column
              prop="endTime"
              min-width="200"
              v-if="activeTag !== 2"
              label="处理截至时间">
            </el-table-column>
            <el-table-column
              v-if="activeTag !== 2"
              prop="urgeQuality"
              min-width="200"
              label="催办消息">
              <template slot-scope="scope">
                <div style="color: #2d8cf0; cursor: pointer;" @click="handlerOpenUrgeDetail(scope.row)">
                  {{scope.row.urgeQuality}}条
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="activeTag === 2"
              prop="putOfRemark"
              min-width="200"
              label="延期消息">
            </el-table-column>
            <el-table-column
              v-if="activeTag === 2"
              min-width="200"
              label="延期处理时间">
              <template slot-scope="scope">
                {{validatenull(scope.row.putOfRemark) ? "" : scope.row.endTime}}
              </template>
            </el-table-column>

            <el-table-column
              width = "140"
              v-if="activeTag === 0 || activeTag === 2"
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <div style="display: flex; justify-content: space-around;">
                  <el-link :underline="false" v-if="scope.row.bpmPushStatus === 1 && activeTag === 0"  type="primary" @click="handlerPutOf(scope.row)">延期</el-link>
                  <el-link :underline="false"
                           v-if="(scope.row.bpmPushStatus === 0 || scope.row.bpmPushStatus === 2)
                            && scope.row.processBpmStatus === 2
                            && activeTag === 0
                          "
                           @click="handler(scope.row)"
                           type="primary">处理</el-link>
                  <el-link type="primary" @click="handlerOpenUrge(scope.row)" :underline="false" v-if="activeTag === 2">
                    催办
                  </el-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="display: flex; justify-content: flex-end; padding: 15px;">
          <div style="display: flex; justify-content: center; flex-flow: column">共 {{page.total}} 条</div>
          <el-pagination
            style="margin-left: 30px;"
            background
            layout="sizes, prev, pager, next"
            @current-change="onLoad"
            @size-change="onLoad"
            :page-sizes="[10, 20, 30]"
            :current-page.sync="page.current"
            :page-size.sync="page.size"
            :total="page.total">
          </el-pagination>
        </div>
      </div>
      <el-dialog title="延迟"
                 :visible.sync="showPutOfDialog"
                 width="50%"
                 append-to-body>
        <put-of ref="putOf" :bpm-id="currentSelect.bpmId" v-if="showPutOfDialog" :save="handlerUpdatePutOf"/>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="showPutOfDialog = false">取 消</el-button>
          <el-button size="small" type="primary" @click="handleTriggerPutOf">确 定</el-button>
       </span>
      </el-dialog>
      <el-dialog title="催办内容"
                 :visible.sync="showUrgeDialog"
                 append-to-body>
          <approve-urge ref="urge" :bpm-id="currentSelect.bpmId" v-if="showUrgeDialog" :save="handlerSaveUrge"/>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="showUrgeDialog = false">取 消</el-button>
          <el-button size="small" type="primary" @click="handleTriggerUrgeDialog">确 定</el-button>
       </span>
      </el-dialog>
      <el-dialog title="催办详情"
                 :visible.sync="showUrgeDetail"
                 width="50%"
                 append-to-body>
        <approve-urge-list :bpm-id="currentSelect.bpmId" v-if="showUrgeDetail"/>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="showUrgeDetail = false">关 闭</el-button>
       </span>
      </el-dialog>
    </basic-container>
    <approve-convert :bus-id="currentSelect.id"
                     :bpm-id="currentSelect.bpmId"
                     v-if="showDetail"
                     :resource-type="currentSelect.resourceType"
                     :flag="currentSelect.bpmFlag"
                     @close="handlerClose"
                     @refresh="onLoad"
    />
    <!--<out-buy-low-approve-detail/>-->
    <!--<process-low-me-approve-detail v-if="showDetail" :id="currentSelect.id" :bpm-id="currentSelect.bpmId" @close="handlerClose" @refresh="handlerRefresh"/>-->
  </div>

</template>

<script>
  import TagSelect from "../../../components/min/tag_select";
  import ExtensibleContainer from "../../../components/min/extensible_container";
  import {processLowApprovePage, processLowApproveQuality} from "../../../api/business/process_low/process_low";
  import PutOf from "../components/put_of";
  import {approvePutOf, approveUrgeSave} from "../../../api/business/process/process";
  import {qprApprovePage} from "../../../api/business/out_buy_low/qpr";
  import OutBuyLowApproveDetail from "./out_buy_low_approve_detail";
  import ApproveConvert from "../components/approve_convert";
  import ApproveUrge from "../components/approve_urge";
  import ApproveUrgeList from "../components/approve_urge_list";
  export default {
    name: "outBuyLowApprove",
    components: {
      ApproveUrgeList,
      ApproveUrge, ApproveConvert, OutBuyLowApproveDetail, PutOf, ExtensibleContainer, TagSelect},
    data() {
      return{
        showMain: true,
        showDetail: false,
        loading: false,
        windowHeight: 0,
        activeTag: 0,
        tagData: [
          {label: "待办", value: 0,},
          {label: "已办", value: 1,},
          {label: "本部门已超期", value: 2,},
        ],
        query: {},
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        data: [],
        typeMap: {0: "外购件", 1: "内购价", 2: "其他"},
        triggerAddressMap: {0: "TNGA#1", 1: "TNGA#2", 2: "TNGA#3", 3: "TNGA#4", 4: "TNGA#5", 5: "TNGA#6"},
        triggerProcessMap: {0: "铸造钢体", 1: "铸造缸盖", 2: "缸盖加工", 3: "缸体加工", 4: "曲轴加工", 5: "连杆加工", 6: "凸轮轴加工"},
        levelMap: {0: "R", 1: "S", 2: "A", 3: "B", 4: "C", 5: "批量", 6: "停线"},
        approveMap: {0: "待审批", 1: "审批中", 2: "已结案", 3: "退回", 4: "自撤回"},
        apparatusMap: {0: "TNAG2.0"},
        pushStatusMap: {0: "正常推进", 1: "已超期", 2: "已延期",},
        currentSelect: {},
        showPutOfDialog: false,
        showUrgeDialog: false,
        showUrgeDetail: false,
        bpmNodeMap: {0: "不良联络书发行确认", 1: "不良联络书发行审批", 2: "不良调查", 3: "调查结果确认",  4: "调查结果审批"},
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      tableHeight() {
        return (this.windowHeight - 260) + "px";
      }
    },
    methods: {
      handlerOpenUrgeDetail(row) {
        this.currentSelect = row;
        this.showUrgeDetail = true;
      },
      handlerOpenUrge(row) {
        this.currentSelect = row;
        this.showUrgeDialog = true;
      },
      handlerSaveUrge(form) {
        approveUrgeSave(form).then(() => {
          this.$message({type: "success", message: "催办成功"});
          this.onLoad();
          this.showUrgeDialog = false;
        })
      },
      handlerRefresh() {
        this.onLoad();
      },
      handlerClose() {
        this.currentSelect = {};
        this.showMain = true;
        this.showDetail = false;
      },
      handler(row) {
        this.currentSelect = row;
        this.showMain = false;
        this.showDetail = true;
      },
      handleTriggerUrgeDialog() {
        this.$refs['urge'].submit();
      },
      handleTriggerPutOf() {
        this.$refs['putOf'].submit();
      },
      handlerUpdatePutOf(form) {
        approvePutOf(form).then(() => {
          this.$message({type: "success", message: "延期成功"});
          this.showPutOfDialog = false;
          this.onLoad();
        })
      },
      handlerPutOf(item) {
        this.currentSelect = item;
        this.showPutOfDialog = true;
      },
      handlerSwitchTag(tag) {
        this.activeTag = tag.value;
        this.query.tagFlag = tag.value;
        this.onLoad();
      },
      onLoad() {
        this.loading = true;
        qprApprovePage(this.page.current, this.page.size, this.query).then(res => {
          let data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
          this.loading = false;
        });
        this.onLoadQuality();
      },
      onLoadQuality() {
        processLowApproveQuality().then(res => {
          let data = res.data.data;
          this.$set(this.tagData[0], 'count', data.await);
          this.$set(this.tagData[1], 'count', data.finish);
          this.$set(this.tagData[2], 'count', data.staleDated);
        })
      }
    },
    created() {
      if (!this.validatenull(this.$route.query)) {
        this.$set(this.query, 'searchKey', this.$route.query.title);
        this.$set(this, 'activeTag', this.$route.query.tag);
        this.query.tagFlag = this.$route.query.tag;
      }
      this.onLoad();
    }
  }
</script>

<style>
  .process-low-me-approve .tag-select > div {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
  }
</style>
