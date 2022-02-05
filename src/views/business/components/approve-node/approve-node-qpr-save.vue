<template>
  <div>
    <approve-container
      v-show="showMain"
      :busId="busId"
      :resource-type="resourceType"
      message-title="外购件不良"
      message-min-title="联络书基本信息"
      :bpm-status="data.bpmStatus"
      :bpm-node="data.bpmNode"
      :form="data.bpmNode"
      :reject="handlerReject"
      :show-reject-dialog="showApproveRejectDialog"
      :code="data.code">
      <div slot="content">
        <process-low-basic-message :data="data"/>
      </div>
      <div slot="operator">
        <el-button size="small" @click="$emit('close')">返回</el-button>
        <el-button type="danger" size="small" @click="showApproveRejectDialog = true">驳回</el-button>
        <el-button type="success" size="small" @click="openQprSave">接受并发起QPR</el-button>
      </div>
    </approve-container>
    <div v-if="showQPRSave">
      <out-buy-low-save :close="handlerClose" :is-use-out="true" :save="handlerQPRSave"/>
    </div>
  </div>
</template>

<script>
  import ApproveContainer from "./approve-container";
  import OutBuyLowBasicMessage from "../../out_buy_low/component/out_buy_low_basic_message";
  import OutBuyLowSave from "../../out_buy_low/out_buy_low_save";
  import {approveProcessLowQprSave} from "../../../../api/business/process/process";
  import ApproveReject from "../approve_reject";
  import {approveReject} from "../../../../api/business/process_low/process_low";
  import ProcessLowBasicMessage from "../../process_low/component/process_low_basic_message";
  export default {
    name: "approve-node-qpr-save",
    components: {ProcessLowBasicMessage, ApproveReject, OutBuyLowSave, OutBuyLowBasicMessage, ApproveContainer},
    data() {
      return {
        showMain: true,
        showQPRSave: false,
        showApproveRejectDialog: false,
      }
    },
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
    methods: {
      handlerReject(form) {
        approveReject(form).then(() => {
          this.$message({type: "success", message: "驳回成功"});
          this.showApproveRejectDialog = false;
          this.$emit("refresh");
          this.$emit("close");
        })
      },
      handlerQPRSave(data) {
        approveProcessLowQprSave(this.busId, data).then(() => {
          this.$message({type: "success", message: "QPR录入成功"});
          this.showMain = true;
          this.showQPRSave = false;
          this.$emit("refresh");
          this.$emit("close");
        })
      },
      handlerClose() {
        this.showMain = true;
        this.showQPRSave = false;
      },
      openQprSave() {
        this.showMain = false;
        this.showQPRSave = true;
      }
    }
  }
</script>

<style scoped>

</style>
