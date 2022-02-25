<template>
  <div>
    <basic-container v-if="showMain">
      <div>
        <div style="display: flex; justify-content: space-between">
          <div>
<!--            <el-button size="small" type="primary" @click="handlerClickSaveCheck">新增检查法</el-button>-->
<!--            <el-button size="small" type="primary">检查制作提醒</el-button>-->
          </div>
          <div>
            <el-input size="small"  v-model="query.searchKey" style="width: 300px" placeholder="品番号/品番名/供应商名称"/>
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
            @selection-change="handleSelectionChange"
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
              prop="designation">
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
              prop="bpmStatus"
              label="审批状态">
              <template slot-scope="scope">
                {{approveMap[scope.row.bpmStatus]}}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="toyotaExcelFileName"
              label="最新版本">
              <template slot-scope="scope">
                <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.oldToyotaExcelFileId)">
                  <tooltop-text :text="scope.row.oldToyotaExcelFileName" :limit="30"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width = "180"
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <div style="display: flex; justify-content: space-around;">
                  <el-link :underline="false" v-if="scope.row.bpmStatus === 2 || scope.row.bpmStatus === 3"  type="primary" @click="handlerClickRowSaveCheck(scope.row)">发起修订</el-link>
                  <el-link :underline="false"  type="primary" @click="handlerClickOpenAccount(scope.row)">检查法版本</el-link>
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
    </basic-container>
    <check-submit v-if="showSubmit" @cancel="handlerCancel" :update="update" :is-update="true" :id="currentSelect.id"/>
    <check-account-dialog v-if="showAccount" :id="currentSelect.id" :title="currentSelect.designation" @close="showAccount = false"/>
  </div>
</template>

<script>
  import CheckSubmit from "./component/check_submit";
  import {accountCheckPage, getAccessSavePage, pageCheck, saveCheck, updateCheck} from "../../../api/check/check";
  import {downloadFile} from "../../../api/business/file/file";
  import {downloadResFile} from "../../../util/util";
  import TooltopText from "../../../components/min/tooltop-text";
  import CheckAccountDialog from "./component/check_account_dialog";
  export default {
    name: "checkAccount",
    components: {CheckAccountDialog, TooltopText, CheckSubmit},
    data() {
      return {
        showMain: true,
        showSubmit: false,
        showAccount: false,
        windowHeight: 0,
        loading: true,
        data: [],
        query: {},
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        selectList: [],
        currentSelect: {},
        approveMap: {0: "待审批", 1: "审批中", 2: "已结案", 3: "退回", 4: "自撤回"},
      }
    },
    created() {
      this.init();
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      tableHeight() {
        return this.windowHeight - 330;
      },
    },
    methods: {
      update(form) {
        updateCheck(this.currentSelect.id, form).then(() => {
          this.$message({type: "success", message: "修订成功"});
          this.showMain = true;
          this.showSubmit = false;
          this.onLoad();
        })
      },
      handlerClickOpenAccount(row) {
        this.currentSelect = row;
        this.showAccount = true;
      },
      handlerDownload(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      },
      save(form) {
        let resourceList = this.selectList.map(item => ({resourceId: item.resourceId, resourceType: item.resourceType}));
        form.resourceList = resourceList;
        saveCheck(form).then(() => {
          this.$message({type: "success", message: "新增成功"});
          this.showMain = true;
          this.showSubmit = false;
          this.onLoad();
        })
      },
      handleSelectionChange(selectList) {
        this.selectList = selectList;
      },
      init() {
        this.onLoad();
      },
      onLoad() {
        this.loading = true;
        accountCheckPage(this.page.current, this.page.size, this.query).then(res => {
          let data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
          this.loading = false;
        })
      },
      handlerClickRowSaveCheck(row) {
        this.currentSelect = row;
        this.selectList.push(row);
        this.showMain = false;
        this.showSubmit = true;
      },
      handlerClickSaveCheck() {
        if (this.selectList.length === 0) {
          this.$message({type: "warning", message: "请至少选择一条数据"});
          return;
        }

        this.showMain = false;
        this.showSubmit = true;
      },
      handlerCancel() {
        this.showMain = true;
        this.showSubmit = false;
        this.selectList = [];
      }
    }
  }
</script>

<style scoped>

</style>
