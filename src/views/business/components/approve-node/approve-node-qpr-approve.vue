<template>
  <div>
    <approve-container
      :busId="busId"
      :resource-type="resourceType"
      :reject="handlerReject"
      :show-reject-dialog="showApproveRejectDialog"
      message-title="外购件不良"
      message-min-title="联络书基本信息"
      bpm-status="333"
      bpm-node="213213"
      form="f213123orm"
      code="123123">
      <div slot="content">
        <out-buy-low-basic-message :data="data"/>
      </div>
      <div slot="operator">
        <el-button size="small" @click="$emit('close')">返回</el-button>
        <el-button type="danger" size="small" @click="showApproveRejectDialog = true">驳回</el-button>
        <el-button type="success" size="small" @click="handlerPass">审批通过</el-button>
      </div>
    </approve-container>
  </div>

</template>

<script>
  import ApproveContainer from "./approve-container";
  import OutBuyLowBasicMessage from "../../out_buy_low/component/out_buy_low_basic_message";
  import {approveReject} from "../../../../api/business/process_low/process_low";
  export default {
    name: "approveNodeQprApprove",
    props: {
      busId: {
        type: String,
      },
      resourceType: {
        type: String,
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
        showApproveRejectDialog: false,
      }
    },
    components: {OutBuyLowBasicMessage, ApproveContainer},
    methods: {
      handlerPass() {
        this.$emit("pass");
      },
      handlerReject(form) {
        approveReject(form).then(() => {
          this.$message({type: "success", message: "驳回成功"});
          this.showApproveRejectDialog = false;
          this.$emit("refresh");
          this.$emit("close");
        })
      },
    }
  }
</script>

<style scoped>

</style>
