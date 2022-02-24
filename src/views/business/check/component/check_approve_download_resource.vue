<template>
  <div>
    <check-approve-detail :is-operator="false" :id="busId" :is-access-upload-excel-file="isClickDownload" @upload="handlerUpload"/>
    <div style="position:fixed; bottom: 0px; width: 100%; padding: 20px; background-color: #FFFFFF">
      <div style="display: flex; justify-content: center;">
        <div style="position: relative; left: -5%;">
          <el-button size="small" @click="handlerCancel">返回</el-button>
          <el-button type="danger" size="small" v-if="!isClickDownload" @click="showRejectDialog = true">退回供应商</el-button>
          <el-button type="success" size="small" v-if="!isClickDownload" @click="isClickDownload = true">下载源文件完善</el-button>
          <el-button size="small" type="primary" v-if="isClickDownload" @click="handlerSubmit">提交</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="驳回供应商"
               :visible.sync="showRejectDialog"
               width="50%"
               append-to-body>
      <div style="width: 80%;">
        <approve-reject  ref="approveReject" :bus-id="busId" v-if="showRejectDialog" :reject="handlerReject"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showRejectDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleTriggerReject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import CheckDetail from "./check_detail";
  import {downloadApprovePassCheck, rejectApproveCheck} from "../../../../api/check/check";
  import CheckApproveDetail from "./check_approve_detail";
  import ApproveReject from "../../components/approve_reject";
  export default {
    name: "checkApproveDownloadResource",
    components: {ApproveReject, CheckApproveDetail, CheckDetail},
    props: {
      busId: {
        type: String,
      }
    },
    data() {
      return {
        isClickDownload: false,
        file: {},
        showRejectDialog: false,
      }
    },
    methods: {
      handlerReject(data) {
        rejectApproveCheck(data).then(() => {
          this.$message({type: "success", message: "驳回成功"});
          this.$emit('cancel');
          this.$emit('refresh');
        })
      },
      handleTriggerReject() {
        this.$refs['approveReject'].submit();
      },
      handlerCancel() {
        if (this.isClickDownload) {
          this.isClickDownload = false;
          return;
        }
        this.$emit('cancel');
      },
      handlerSubmit() {
        if (this.validatenull(this.file)) {
          this.$message({type: "warning", message: "请上传文件"});
          return;
        }
        downloadApprovePassCheck(this.busId, this.file).then(() => {
          this.$message({type: "success", message: "审批通过"});
          this.$emit('cancel');
          this.$emit('refresh');
        })

      },
      handlerUpload(file) {
        this.file = file;
      }
    }
  }
</script>

<style scoped>

</style>
