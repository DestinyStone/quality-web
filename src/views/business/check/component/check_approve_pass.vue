<template>
  <div>
    <check-approve-detail :is-operator="false" :id="busId" :is-access-upload-excel-file="isClickDownload" @upload="handlerUpload"/>
    <div style="bottom: 0; position: fixed; width: 100%; background: #FFFFFF; z-index: 999;">
      <div style="width: 80%; padding: 10px 0;">
        <div style="display: flex; justify-content: center;">
          <el-button size="small" @click="handlerCancel">返回</el-button>
          <el-button type="danger" size="small" @click="showRejectDialog = true">审批不通过</el-button>
          <el-button size="small" type="primary" @click="handlerSubmit">审批通过</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="审批不通过"
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
  import {approvePassCheck, downloadApprovePassCheck, rejectApproveCheck} from "../../../../api/check/check";
  import CheckApproveDetail from "./check_approve_detail";
  import ApproveDetail from "../../components/approve_detail";
  import ApproveReject from "../../components/approve_reject";
  export default {
    name: "checkApprovePass",
    components: {ApproveReject, ApproveDetail, CheckApproveDetail, CheckDetail},
    props: {
      busId: {
        type: String,
      }
    },
    data() {
      return {
        isClickDownload: false,
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
        approvePassCheck(this.busId).then(() => {
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
