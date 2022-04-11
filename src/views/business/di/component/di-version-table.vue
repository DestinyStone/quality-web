<template>
  <div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :header-cell-style="{background: '#fafafa', 'textAlign': 'center', fontWeight: 700, color: 'rgba(0,0,0,.85)',fontSize: '12px'}"
      :cell-style="{'textAlign': 'center'}"
      :data="data"
      border
      height="250"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="80">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column
        label="供应商DI数据Excel文件"
        show-overflow-tooltip
        prop="dataExcelFileName"
        width="150">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="供应商名称"
        prop="dutyDept"
        min-width="120">
      </el-table-column>
      <el-table-column
        label="上报时间"
        prop="reportTime"
        width="180">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="operatorRole"
        label="备注"
        min-width="180">
      </el-table-column>
      <el-table-column
        width = "180"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <div style="display: flex; justify-content: space-around;">
            <el-link :underline="false"  type="primary" @click="handlerDownload(scope.row.dataExcelFileId)">下载</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {versionPage} from "../../../../api/business/di/di";
  import TooltopText from "../../../../components/min/tooltop-text";
  import {downloadFile} from "../../../../api/business/file/file";
  import {downloadResFile} from "../../../../util/util";

  export default {
    name: "diVersionTable",
    components: {TooltopText},
    props: {
      resourceId: {
        type: String
      },
      resourceType: {
        type: Number
      }
    },
    data() {
      return {
        loading: true,
        data: [],
        page: {
          current: 1,
          size: 10,
          total: 0,
        }
      }
    },
    methods: {
      handlerDownload(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      },
      init() {
        this.loading = true;
        versionPage(this.resourceId, this.resourceType).then(res => {
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
