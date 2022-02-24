<template>
  <div>
    <basic-container class="check_approve" v-if="showMain">
      <div style="border-bottom: 1px solid  #F2F6FC;">
        <tag-select style="border-bottom: 1px solid #F5F5F5;" :data="tagData" :active="activeTag" @click="handlerSwitchTag">
          <div style="display: flex;" slot="operator">
            <el-input size="small" v-model="query.searchKey" style="margin-left: 10px; width: 300px" placeholder="请输入管理编号/品番/品番名"/>
            <el-button size="small" type="primary" style="margin-left: 10px;" @click="onLoad">查询</el-button>
            <el-button size="small" style="margin-left: 10px;" @click="resetQuery">重置</el-button>
          </div>
        </tag-select>
        <div style="margin-top: 15px;">
          <div style="margin-top: 10px;">
            <el-table
              :key="activeTag"
              v-loading="loading"
              element-loading-text="拼命加载中"
              :header-cell-style="{background: '#fafafa', 'textAlign': 'center', fontWeight: 700, color: 'rgba(0,0,0,.85)',fontSize: '12px'}"
              :cell-style="{'textAlign': 'center'}"
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
                prop="bpmNode"
                width="120"
                label="业务类型">
                <template slot-scope="scope">
                  {{scope.row.bpmNode === 0 ? '新增检查法' : '修订检查法'}}
                </template>
              </el-table-column>
              <el-table-column
                label="管理编号"
                prop="code"
                width="180">
              </el-table-column>
              <el-table-column
                label="品番"
                prop="designation"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="品番名">
              </el-table-column>
              <el-table-column
                prop="dutyDept"
                min-width="120"
                label="供应商名称">
              </el-table-column>
              <el-table-column
                prop="processBpmStatus"
                label="业务状态">
                <template slot-scope="scope">
                  {{approveMap[scope.row.processBpmStatus]}}
                </template>
              </el-table-column>
              <el-table-column
                prop="bpmPushStatus"
                width="120"
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
                width="120"
                label="当前业务环节">
                <template slot-scope="scope">
                  检查法审批
                </template>
              </el-table-column>
              <el-table-column
                prop="startTime"
                width="180"
                label="接收时间">
              </el-table-column>
              <el-table-column
                prop="endTime"
                width="180"
                label="处理截止时间">
              </el-table-column>
              <el-table-column
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
            <div style="display: flex; justify-content: flex-end; padding: 30px;">
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
        </div>
      </div>
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
    <check-approve-convert v-if="showApprove"
                           @cancel="handlerCancel"
                           @refresh="handlerRefresh"
                           :bus-id="currentSelect.id"
                           :flag="currentSelect.bpmFlag"/>
  </div>
</template>

<script>
  import TagSelect from "../../../components/min/tag_select";
  import {approveCheckQuality, pageCheck, pageCheckApprove} from "../../../api/check/check";
  import ApproveUrge from "../components/approve_urge";
  import ApproveUrgeList from "../components/approve_urge_list";
  import CheckApproveConvert from "./component/check_approve_convert";
  export default {
    name: "checkApprove",
    components: {CheckApproveConvert, ApproveUrgeList, ApproveUrge, TagSelect},
    data() {
      return {
        windowHeight: 0,
        loading: false,
        data: [],
        query: {},
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        activeTag: 0,
        tagData: [
          {label: "待办", value: 0,},
          {label: "已办", value: 1,},
          {label: "本部门已超期", value: 2,},
        ],
        approveMap: {2: "待审批", 3: "已完成", 4: "已退回"},
        pushStatusMap: {0: "正常推进", 1: "已超期", 2: "已延期",},
        currentSelect: {},
        showUrgeDetail: false,
        showMain: true,
        showApprove: false,
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      tableHeight() {
        return this.windowHeight - 330;
      }
    },
    methods: {
      handlerRefresh() {
        this.onLoad();
      },
      handlerCancel() {
        this.currentSelect = {};
        this.showMain = true;
        this.showApprove = false;
      },
      handler(row) {
        this.currentSelect = row;
        this.showMain = false;
        this.showApprove = true;
      },
      handlerOpenUrgeDetail(row) {
        this.currentSelect = row;
        this.showUrgeDetail = true;
      },
      resetQuery() {
        this.query = {};
        this.onLoad();
      },
      handlerSwitchTag(tag) {
        this.activeTag = tag.value;
        this.query.tagFlag = tag.value;
        this.onLoad();
      },
      onLoadQuality() {
        approveCheckQuality().then(res => {
          let data = res.data.data;
          this.$set(this.tagData[0], 'count', data.await);
          this.$set(this.tagData[1], 'count', data.finish);
          this.$set(this.tagData[2], 'count', data.staleDated);
        })
      },
      onLoad() {
        this.loading = true;
        pageCheckApprove(this.page.current, this.page.size, this.query).then(res => {
          let data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
          this.loading = false;
        });

        this.onLoadQuality();
      },
    },
    created() {
      this.onLoad();
    }
  }
</script>

<style>
  .check_approve .tag-select > div {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
  }
</style>
