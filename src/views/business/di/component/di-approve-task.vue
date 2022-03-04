<template>
  <div class="di-approve-task">
    <fix-color-title>DI数据上报</fix-color-title>
    <el-divider></el-divider>
    <table
      class="message-table"
      style="width: 100%;"
    >
      <col width="15%" />
      <col width="35%" />
      <col width="15%" />
      <col width="35%" />
      <tr>
        <td class="message-title">品番号</td>
        <td class="message-value">{{data.designation}}</td>
        <td class="message-title">品名</td>
        <td class="message-value">{{data.name}}</td>
      </tr>
      <tr>
        <td class="message-title">供应商名称</td>
        <td class="message-value" colspan="3">{{data.dutyDept}}</td>
      </tr>
    </table>
    <div style="margin-top: 20px;" v-show="!isPass">
      <fix-tag-title :size="14">附件</fix-tag-title>
      <el-table
        :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
        :cell-style="{'textAlign': 'center'}"
        :data="file"
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
        <el-table-column
          min-width="140"
          prop="reportTime"
          label="最后更新时间">
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 20px;" v-if="isPass">
      <fix-tag-title :size="14">附件 注：请下载供应商回传的DI数据电子源文件进行完善答应签字上传</fix-tag-title>
      <el-table
        :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
        :cell-style="{'textAlign': 'center'}"
        :data="file"
        border
        style="width: 100%; margin-top: 10px;">

        <el-table-column
          prop="dataExcelFileName"
          label="供应商DI数据Excel文件">
          <template slot-scope="scope">
            <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.dataExcelFileId)">
              <tooltop-text :text="scope.row.dataExcelFileName" :limit="30"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="dataSignateFileName"
          label="供应商DI数据签名文件">
          <template slot-scope="scope">
            <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.dataSignateFileId)">
              <tooltop-text :text="scope.row.dataSignateFileName" :limit="30"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="丰田承认DI数据文件">
          <template slot-scope="scope">
            <file-upload :file.sync="submitFile"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="position: fixed; bottom: 0; width: 100%;">
      <div style="width: 100%; display: flex; justify-content: center;">
        <div style="padding-right: 20%; padding-bottom: 20px;">
          <el-button size="small" @click="handlerCancel">返回</el-button>
          <el-button type="danger" v-if="!isPass" size="small" @click="$emit('reject')">退回供应商</el-button>
          <el-button type="primary" v-if="!isPass" size="small" @click="isPass = true">审批通过</el-button>
          <el-button type="success" v-if="isPass" size="small" @click="handlerSubmit">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import FixTagTitle from "../../../../components/min/fix_tag_title";
  import TooltopText from "../../../../components/min/tooltop-text";
  import FileUpload from "../../../../components/file/file-upload";
  import {reportTaskPassApprove} from "../../../../api/business/di/di";
  import {downloadFile} from "../../../../api/business/file/file";
  import {downloadResFile} from "../../../../util/util";
  import ApproveReject from "../../components/approve_reject";
  export default {
    name: "diApproveTask",
    components: {ApproveReject, FileUpload, TooltopText, FixTagTitle, FixColorTitle},
    props: {
      busId: {
        type: String
      },
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isPass: false,
        submitFile: {},
      }
    },
    computed: {
      file() {
        return [{
          dataExcelFileId: this.data.dataExcelFileId,
          dataExcelFileName: this.data.dataExcelFileName,
          dataSignateFileId: this.data.dataSignateFileId,
          dataSignateFileName: this.data.dataSignateFileName,
          reportTime: this.data.reportTime
        }]
      }
    },
    methods: {
      handlerDownload(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      },
      handlerSubmit() {
        if (this.validatenull(this.submitFile)) {
          this.$message({type: "warning", message: "请上传丰田承认DI数据文件"})
          return;
        }

        reportTaskPassApprove(this.busId, {toyoDataFileId: this.submitFile.id, toyoDataFileName: this.submitFile.name}).then(() => {
          this.$message({type: "success", message: "审批通过"})
          this.$emit("refresh");
          this.$emit("cancel");
        })
      },
      handlerCancel() {
        if (this.isPass) {
          this.submitFile = {};
          this.isPass = false;
          return;
        }
        this.$emit("cancel");
      }
    }
  }
</script>

<style scoped>
  .di-approve-task .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
  }
  .di-approve-task .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
</style>
