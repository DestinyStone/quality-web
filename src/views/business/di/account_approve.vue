<template>
  <div>
    <basic-container v-if="showMain" class="account-approve">
      <div style="border-bottom: 1px solid  #F2F6FC;">
        <tag-select style="border-bottom: 1px solid #F5F5F5;" :data="tagData" :active="activeTag" @click="handlerSwitchTag">
          <div style="display: flex;" slot="operator">
            <el-input size="small" v-model="query.searchKey" style="margin-left: 10px; width: 300px" placeholder="品番号/品番名"/>
            <el-button size="small" @click="onLoad" type="primary" style="margin-left: 10px;">查询</el-button>
          </div>
        </tag-select>
        <div style="margin-top: 15px;">
          <div>
            <el-button size="small" type="danger">批量退回供应商</el-button>
            <el-button size="small" type="success">审批通过</el-button>
          </div>
          <div  style="margin-top: 10px;">
            <el-table
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
                prop="businessType"
                label="业务类型"
                width="180">
                <template slot-scope="scope">
                  {{scope.row.businessType === 0 ? "DI数据上报" : "无需上报"}}
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
                label="品名"
                prop="name"
                width="180">
              </el-table-column>
              <el-table-column
                label="供应商"
                prop="dutyDept"
                min-width="240">
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
                  DI数据审批
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
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <div style="display: flex; justify-content: space-around;">
                    <el-link :underline="false"  type="primary" @click="handler(scope.row)">处理</el-link>
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
    </basic-container>
    <basic-container v-if="showApproveDetail">
      <di-approve-convert :bus-id="currentSelect.id" :bpm-flag="currentSelect.bpmFlag" @cancel="handlerCancel" @refresh="onLoad"/>
    </basic-container>
  </div>
</template>

<script>
  import TagSelect from "../../../components/min/tag_select";
  import {reportApprovePage, reportApproveQuality} from "../../../api/business/di/di";
  import DiApproveConvert from "./component/di-approve-convert";
  export default {
    name: "accountApprove",
    components: {DiApproveConvert, TagSelect},
    data() {
      return {
        windowHeight: 0,
        loading: true,
        data: [{name: 1}],
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
          {label: "已超期", value: 2,},
        ],
        approveMap: {2: "待审批", 3: "已完成", 4: "已退回"},
        pushStatusMap: {0: "正常推进", 1: "已超期", 2: "已延期",},
        showMain: true,
        showApproveDetail: false,
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
      handlerCancel() {
        this.showMain = true;
        this.showApproveDetail = false;
      },
      handler(row) {
        this.currentSelect = row;
        this.showMain = false;
        this.showApproveDetail = true;
      },
      init() {
        this.onLoad();
      },
      onLoad() {
        this.loading = true;
        reportApprovePage(this.page.current, this.page.size, this.query).then(res => {
          let data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
          this.loading = false;
        })
        this.onQuality();
      },
      onQuality() {
        reportApproveQuality().then(res => {
          let data = res.data.data;
          this.$set(this.tagData[0], 'count', data.await);
          this.$set(this.tagData[1], 'count', data.finish);
          this.$set(this.tagData[2], 'count', data.staleDated);
        })
      },
      handlerSwitchTag(tag) {
        this.activeTag = tag.value;
        this.query.tagFlag = tag.value;
        this.onLoad();
      },
    },
    created() {
      this.init();
    }
  }
</script>

<style>
  .account-approve .tag-select > div {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
  }
</style>
