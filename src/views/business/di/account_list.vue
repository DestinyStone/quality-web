<template>
  <basic-container>
    <div>
      <div style="display: flex; justify-content: space-between;">
        <div style="display: flex;">
          <el-button size="small" type="primary" style="margin-left: 10px;" @click="handlerClickSetReport">上报周期配置</el-button>
        </div>
       <div>
         <el-input size="small" style="width: 300px" v-model="query.searchKey" placeholder="品番号/品番名/供应商名称"/>
         <el-button size="small" type="primary" style="margin-left: 10px;" @click="onLoad">查询</el-button>
       </div>
      </div>
      <el-divider></el-divider>
      <div style="margin-top: 10px;">
        <el-table
          ref="table"
          v-loading="loading"
          element-loading-text="拼命加载中"
          :header-cell-style="{background: '#fafafa', 'textAlign': 'center', fontWeight: 700, color: 'rgba(0,0,0,.85)',fontSize: '12px'}"
          :cell-style="{'textAlign': 'center'}"
          :data="data"
          border
          :height="tableHeight"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="品番名">
          </el-table-column>
          <el-table-column
            prop="dutyDept"
            label="供应商名称">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              {{scope.row.status === 0 ? "禁用" : "启用"}}
            </template>
          </el-table-column>
          <el-table-column
            prop="lastFileName"
            label="最新版本">
            <template slot-scope="scope">
              <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.lastFileId)">
                <tooltop-text :text="scope.row.lastFileName" :limit="30"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="最新更新时间">
          </el-table-column>
          <el-table-column
            width = "180"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: space-around;">
                <el-link :underline="false"  type="primary" @click="handlerUpdate(scope.row)">修订</el-link>
                <el-link :underline="false"  type="primary" @click="handlerOperVersionTable(scope.row)">DI数据版本</el-link>
                <el-link :underline="false"  type="primary" @click="handlerUpdateEnable(scope.row, 1)" v-if="scope.row.status === 0">启用</el-link>
                <el-link :underline="false"  type="primary" @click="handlerUpdateEnable(scope.row, 0)" v-if="scope.row.status === 1">禁用</el-link>
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
    <el-dialog title="上报周期配置"
               :visible.sync="showReportConfig"
               width="40%"
               append-to-body>
      <div style="width: 80%;">
        <report-cycle-form v-if="showReportConfig"
                           ref="reportCycle"
                           :handlerSubmit="submitReportConfig"
                           :is-init="isInitReport"
                           :resource-id="currentSelect.resourceId"
                           :resource-type="currentSelect.resourceType"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showReportConfig = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleTriggerReportConfig">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="currentSelect.designation + 'DI数据'"
                            :visible.sync="showDiVersionTableDialog"
                            width="40%"
                            append-to-body>
      <di-version-table :resource-id="currentSelect.resourceId" :resource-type="currentSelect.resourceType"/>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showDiVersionTableDialog = false">关 闭</el-button>
      </span>
  </el-dialog>

  </basic-container>
</template>

<script>
  import {diAccountPage, diAccountSubmit, diConfigEnable} from "../../../api/business/di/di";
  import ReportCycleForm from "./component/report-cycle-form";
  import DiVersionTable from "./component/di-version-table";
  import {downloadFile} from "../../../api/business/file/file";
  import {downloadResFile} from "../../../util/util";
  import TooltopText from "../../../components/min/tooltop-text";

  export default {
    name: "accountList",
    components: {TooltopText, DiVersionTable, ReportCycleForm},
    data() {
      return {
        isInitReport: false,
        showDiVersionTableDialog: false,
        showReportConfig: false,
        windowHeight: 0,
        loading: false,
        selectList: [],
        data: [{name: 1}],
        query: {},
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        currentSelect: {},
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
      handlerUpdateEnable(row, status) {
        diConfigEnable(row.resourceId, row.resourceType, status).then(() => {
          let message = status === 1 ? "启用成功" : "禁用成功";
          this.$emit({type: "success", message: message});
          this.onLoad();
        })
      },
      handlerDownload(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      },
      handlerOperVersionTable(row) {
        this.currentSelect = row;
        this.showDiVersionTableDialog = true;
      },
      handlerUpdate(row) {
        this.$refs['table'].clearSelection();
        this.selectList = [];
        this.currentSelect = row;
        this.isInitReport = true;
        this.showReportConfig = true;
      },
      handleSelectionChange(selectList) {
        this.selectList = selectList;
      },
      submitReportConfig(form) {
        if (!this.validatenull(this.selectList)) {
          form.resourceList = this.selectList.map(item => ({resourceId: item.resourceId, resourceType: item.resourceType}));
        }else {
          form.resourceList = [{resourceId: this.currentSelect.resourceId, resourceType: this.currentSelect.resourceType}]
        }
        diAccountSubmit(form).then(() => {
          this.$message({type: "success", message: "配置成功"});
          this.showReportConfig = false;
          this.onLoad();
        })
      },
      handleTriggerReportConfig() {
        this.$refs['reportCycle'].submit();
      },
      handlerClickSetReport() {
        if (this.selectList.length === 0) {
          this.$message({type: "warning", message: "请至少选择一条数据"});
          return;
        }
        this.currentSelect = {};
        this.isInitReport = false;
        this.showReportConfig = true;
      },
      init() {
        this.onLoad();
      },
      onLoad() {
        this.loading =  true;
        diAccountPage(this.page.current, this.page.size, this.query).then(res => {
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
