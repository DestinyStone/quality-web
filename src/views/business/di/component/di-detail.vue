<template>
  <div>
    <el-table
      v-if="businessType === 0 && !isBack"
      :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
      :cell-style="{'textAlign': 'center'}"
      :data="data"
      border
      style="width: 100%; margin-top: 10px;">
      <el-table-column
        min-width="240"
        prop="dataExcelFileName"
        label="供应商DI数据Excel文件">
        <template slot-scope="scope">
          <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.dataExcelFileId)">
            <tooltop-text :text="scope.row.dataExcelFileName" :limit="30"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="240"
        prop="dataSignateFileName"
        label="供应商DI数据签名文件">
        <template slot-scope="scope">
          <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.dataSignateFileId)">
            <tooltop-text :text="scope.row.dataSignateFileName" :limit="30"/>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <report-form ref="report" v-if="isBack" :trigger="trigger"/>
    <div  style="margin-top: 20px;" >
      <div style="font-weight: 700;">操作记录:</div>
      <approve-detail style="margin-top: 10px;"  :bus-id="id"/>
    </div>

  </div>
</template>

<script>
  import {reportDetail} from "../../../../api/business/di/di";
  import TooltopText from "../../../../components/min/tooltop-text";
  import {downloadFile} from "../../../../api/business/file/file";
  import {downloadResFile} from "../../../../util/util";
  import ApproveDetail from "../../components/approve_detail";
  import ReportForm from "./report-form";

  export default {
    name: "diDetail",
    components: {ReportForm, ApproveDetail, TooltopText},
    props: {
      id: {
        type: String,
      },
      businessType: {
        type: Number,
      },
      isBack: {
        type: Boolean,
        default: false,
      },
      trigger: {
        type: Function,
        default: () => {},
      }
    },
    data() {
      return {
        data: [],
      }
    },
    methods: {
      handlerDownload(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      },
      init() {
        reportDetail(this.id).then(res => {
          this.data.push(res.data.data);
        })
      },
      submit() {
        this.$refs['report'].submit();
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
