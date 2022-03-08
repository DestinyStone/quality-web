<template>
  <basic-container>
    <div>
      <div style="display: flex; justify-content: space-between;">
        <div>
        </div>
        <div style="display: flex;">
          <el-input size="small" v-model="query.searchKey" style="margin-left: 10px; width: 300px" placeholder="品番号/品番名"/>
          <el-button size="small" type="primary" style="margin-left: 10px;" @click="onLoad">查询</el-button>
        </div>
      </div>
      <el-divider></el-divider>
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
            prop="status"
            label="状态">
            <template slot-scope="scope">
              {{statusMap[scope.row.status]}}
            </template>
          </el-table-column>
          <el-table-column
            width = "180"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: space-around;">
                <el-link :underline="false"  type="primary" @click="handlerReport(scope.row)">上报数据</el-link>
                <el-link :underline="false"  type="primary" @click="handlerUnReport(scope.row)">无需上报</el-link>
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
               :visible.sync="showReportDialog"
               width="60%"
               append-to-body>
      <report-form ref="report" v-if="showReportDialog" :trigger="handlerTriggerReport"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showReportDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleTriggerOpenReport">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="currentSelect.designation + ' 无需上报DI数据'"
               :visible.sync="showNoReportDialog"
               width="30%"
               append-to-body>
      <no-report-form ref="noReportForm" :id="currentSelect.id" v-if="showNoReportDialog" :trigger="handlerTriggerNoReport"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showNoReportDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleTriggerOpenNoReport">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {awaitReportDiAccountPage, reportDi, unReportDi} from "../../../api/business/di/di";
  import NoReportForm from "./component/no-report-form";
  import ReportForm from "./component/report-form";

  export default {
    name: "awaitReportAccountList",
    components: {ReportForm, NoReportForm},
    data() {
      return {
        showReportDialog: false,
        showNoReportDialog: false,
        windowHeight: 0,
        loading: true,
        data: [],
        query: {},
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        statusDict: [
          {value: 0, label: '未上报'},
          {value: 1, label: '已退回'},
        ],
        statusMap: {0: "未上报", 1: "已上报", 2: "无需上报"},
        currentSelect: {},
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
      handlerTriggerReport(form) {
        reportDi(this.currentSelect.id, form).then(() => {
          this.$message({type: "success", message: "DI数据上报成功"});
          this.showReportDialog = false;
          this.onLoad();
        })
      },
      handleTriggerOpenReport() {
        this.$refs['report'].submit();
      },
      handlerTriggerNoReport(form) {
        unReportDi(this.currentSelect.id, form.noReportRemark).then(() => {
          this.$message({type: "success", message: "无需上报成功"});
          this.showNoReportDialog = false;
          this.onLoad();
        })
      },
      handleTriggerOpenNoReport() {
        this.$refs['noReportForm'].submit();
      },
      handlerReport(row) {
        this.currentSelect = row;
        this.showReportDialog = true;
      },
      handlerUnReport(row) {
        this.currentSelect = row;
        this.showNoReportDialog = true;
      },
      init() {
        this.onLoad();
      },
      onLoad() {
        this.loading = true;
        awaitReportDiAccountPage(this.page.current, this.page.size, this.query).then(res => {
          let data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
          this.loading = false;
        })
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
