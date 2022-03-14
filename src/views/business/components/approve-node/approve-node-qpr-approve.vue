<template>
  <div>
    <approve-container
      :busId="busId"
      :resource-type="resourceType"
      :reject="handlerReject"
      :show-reject-dialog.sync="showApproveRejectDialog"
      message-title="外购件不良"
      message-min-title="联络书基本信息"
      :form="bpmNodeMapForm[data.bpmNode]"
      :code="data.code">
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
  import {approveOutBuyQprReject} from "../../../../api/business/out_buy_low/qpr";
  export default {
    name: "approveNodeQprApprove",
    props: {
      bpmId: {
        type: String
      },
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
        bpmNodeMapForm: {0: "不良联络书", 1: "不良联络书", 2: "调查结果表", 3: "调查结果表", 4: "调查结果表"},
      }
    },
    components: {OutBuyLowBasicMessage, ApproveContainer},
    methods: {
      handlerPass() {
        this.$emit("pass");
      },
      handlerReject(form) {
        let reject = this.resourceType === 0 ? approveOutBuyQprReject : approveReject;
        reject(form).then(() => {
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
