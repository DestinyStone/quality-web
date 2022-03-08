<template>
  <basic-container class="report-account-list">
    <div>
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid  #DCDFE6;">
        <tag-select style="border-bottom: 1px solid #F5F5F5; width: 100%;" :data="tagData" :active="active" @click="handlerSwitchTag">
          <div style="display: flex;" slot="operator">
            <el-input size="small"  v-model="query.searchKey" style="margin-left: 10px; width: 300px" placeholder="品番号/品番名"/>
            <el-button size="small" type="primary" style="margin-left: 10px;" @click="onLoad">查询</el-button>
          </div>
        </tag-select>
      </div>
      <div style="margin-top: 10px;">
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
            label="品番号"
            prop="designation"
            show-overflow-tooltip
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            show-overflow-tooltip
            width="200"
            label="品番名">
          </el-table-column>
          <el-table-column
            prop="dutyDept"
            min-width="240"
            label="供应商名称">
          </el-table-column>
          <el-table-column
            prop="bpmStatus"
            label="状态">
            <template slot-scope="scope">
              {{approveMap[scope.row.bpmStatus]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="reportTime"
            width="180"
            label="提交时间">
          </el-table-column>
          <el-table-column
            width = "140"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: space-around;">
                <el-link :underline="false" v-if="scope.row.bpmStatus === 0"  type="primary" @click="handlerSelfBack(scope.row)">撤回</el-link>
                <el-link :underline="false"  type="primary" @click="handlerDetail(scope.row)">详情</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex; justify-content: flex-end; padding: 10px;">
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
    <el-dialog :title="currentSelect.designation + ' DI数据上报'"
               :visible.sync="showDiReportDetailDialog"
               width="50%"
               append-to-body>
      <di-detail :id="currentSelect.id"
                 ref="diDetail"
                 :trigger="handlerReReport"
                 :is-back="currentSelect.bpmStatus === 3"
                 :business-type="currentSelect.businessType"
                 v-if="showDiReportDetailDialog"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showDiReportDetailDialog = false">取 消</el-button>
        <el-button size="small" type="primary" v-if="currentSelect.bpmStatus !== 3" @click="showDiReportDetailDialog = false">确 定</el-button>
        <el-button size="small" type="primary" v-if="currentSelect.bpmStatus === 3" @click="handleTriggerOpenSubmit">提 交</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {diSelfBack, reportDiAccountPage, reportQuality, reReportDi} from "../../../api/business/di/di";
  import DiDetail from "./component/di-detail";
  import TagSelect from "../../../components/min/tag_select";

  export default {
    name: "reportAccountList",
    components: {TagSelect, DiDetail},
    data() {
      return {
        showDiReportDetailDialog: false,
        windowHeight: 0,
        loading: false,
        data: [],
        query: {},
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        statusDict: [
          {value: 0, label: '审批中'},
          {value: 1, label: '已完成'},
        ],
        approveMap: {0: "待审批", 1: "审批中", 2: "已结案", 3: "退回"},
        currentSelect: {},
        tagData: [
          {label: "全部", value: 0,},
          {label: "进行中", value: 1,},
          {label: "已驳回", value: 2,},
          {label: "已完成", value: 3,},
        ],
        active: 0,
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      tableHeight() {
        return this.windowHeight - 270;
      }
    },
    methods: {
      handlerReReport(form) {
        reReportDi(this.currentSelect.id, form).then(() => {
          this.$message({type: "success", message: "提交成功"});
          this.showDiReportDetailDialog = false;
          this.onLoad();
        })
      },
      handleTriggerOpenSubmit() {
        this.$refs['diDetail'].submit();
      },
      handlerSwitchTag(tag) {
        this.active = tag.value;
        this.query.tag = tag.value;
        this.onLoad();
      },
      handlerDetail(row) {
        this.currentSelect = row;
        this.showDiReportDetailDialog = true;
      },
      handlerSelfBack(row) {
        this.$confirm("是否确定撤回?", {confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"}).then(() => {
            return diSelfBack(row.id);
        }).then(() => {
          this.$message({type: "success", message: "撤回成功"});
          this.onLoad();
        })
      },
      init() {
        this.onLoad();
      },
      onLoad() {
        this.loading = true;
        reportDiAccountPage(this.page.current, this.page.size, this.query).then(res => {
          let data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
          this.loading = false;
        })
        this.loadQuality();
      },
      loadQuality() {
        reportQuality().then(res => {
          let data = res.data.data;
          this.$set(this.tagData[1], 'count', data.await);
          this.$set(this.tagData[2], 'count', data.back);
          this.$set(this.tagData[3], 'count', data.finish);
        })
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style >
  .report-account-list .tag-select > div {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
  }
</style>
