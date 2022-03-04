<template>
  <div>
    <el-table
      :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
      :cell-style="{'textAlign': 'center'}"
      :data="data"
      border
      style="width: 100%; margin-top: 10px;">
      <el-table-column
        prop="dataExcelFileId"
        label="供应商DI数据Excel文件">
        <template slot-scope="scope">
          <file-upload :file-name-limit="20" :file.sync="scope.row.dataExcelFileId"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="dataSignateFileId"
        label="供应商DI数据签名文件">
        <template slot-scope="scope">
          <file-upload :file-name-limit="20" :file.sync="scope.row.dataSignateFileId"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import FileUpload from "../../../../components/file/file-upload";
  import {downloadFile} from "../../../../api/business/file/file";
  import {downloadResFile} from "../../../../util/util";
  export default {
    name: "reportForm",
    components: {FileUpload},
    props: {
      trigger: {
        type: Function,
        default: () => {},
      }
    },
    data() {
      return {
        data: []
      }
    },
    methods: {
      init() {
        this.data.push({})
      },
      submit() {
        let item = this.data[0];
        if (this.validatenull(item.dataExcelFileId)) {
          this.$message({type: "warning", message: "请上传供应商DI数据Excel文件"});
          return;
        }

        if (this.validatenull(item.dataSignateFileId)) {
          this.$message({type: "warning", message: "请上传供应商DI数据签名文件"});
          return;
        }

        let copy = {};
        copy.dataExcelFileId = item.dataExcelFileId.id;
        copy.dataExcelFileName = item.dataExcelFileId.name;
        copy.dataSignateFileId = item.dataSignateFileId.id;
        copy.dataSignateFileName = item.dataSignateFileId.name;
        this.trigger(copy);
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
