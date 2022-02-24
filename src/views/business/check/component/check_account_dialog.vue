<template>
  <el-dialog :title="title + '  检查法版本'"
             :visible.sync="showRejectDialog"
             width="50%"
             :before-close="handlerClose"
             append-to-body>
    <div>
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
          min-width="240"
          label="供应商承认零件检查法EXCEL文件"
          prop="providerExcelFileName">
          <template slot-scope="scope">
            <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.providerExcelFileId)">
              <tooltop-text :text="scope.row.providerExcelFileName" :limit="30"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="240"
          prop="toyotaExcelFileName"
          label="丰田承认零件检查法EXCEL文件">
          <template slot-scope="scope">
            <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.toyotaExcelFileId)">
              <tooltop-text :text="scope.row.toyotaExcelFileName" :limit="30"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="240"
          prop="providerSignatureName"
          label="供应商承认零件检查法签字文件">
          <template slot-scope="scope">
            <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.providerSignatureId)">
              <tooltop-text :text="scope.row.providerSignatureName" :limit="30"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          prop="version"
          label="版本号">
        </el-table-column>
        <el-table-column
          min-width = "180"
          prop="createTime"
          label="最后更新时间">
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
  </el-dialog>
</template>

<script>
  import {accountVersionCheckPage} from "../../../../api/check/check";
  import TooltopText from "../../../../components/min/tooltop-text";
  import {downloadFile} from "../../../../api/business/file/file";
  import {downloadResFile} from "../../../../util/util";

  export default {
    name: "checkAccountDialog",
    components: {TooltopText},
    props: {
      id: {
        type: String,
      },
      title: {
        type: String,
      }
    },
    data() {
      return {
        showRejectDialog: true,
        loading: false,
        data: [],
        query: {},
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
      }
    },
    methods: {
      handlerDownload(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      },
      handlerClose() {
        this.showRejectDialog = false;
        this.$emit("close");
      },
      init() {
        this.onLoad();
      },
      onLoad() {
        this.loading = true;
        accountVersionCheckPage(this.page.current, this.page.size, this.id).then(res => {
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
