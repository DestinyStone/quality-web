<template>
  <div>
    <!--    不良联络书发行确认-->
    <approve-node-qpr-save
      v-if="flag === 'qprSave'"
      :bus-id="busId"
      :resource-type="resourceType"
      @refresh="handleRefresh"
      @close="handlerClose"
      :data="data"
    />
<!--    不良联络书发行审批-->
    <approve-node-qpr-approve
      :bus-id="busId"
      :data="data"
      :resource-type="resourceType"
      v-if="flag === 'qprApprove'"
      @refresh="handleRefresh"
      @pass="handlerPass"
      @close="handlerClose"
    />
    <approve-node-process-low-approve
      v-if="flag === 'processLowApprove'"
      :bus-id="busId"
      :data="data"
      :resource-type="resourceType"
      @refresh="handleRefresh"
      @close="handlerClose"
    />
    <approve-node-provider-check-save
      :bus-id="busId"
      :data="data"
      v-if="flag === 'checkSave'"
      @refresh="handleRefresh"
      @close="handlerClose"
    />
<!--    调查结果确认-->
    <approve-node-check-confirm
      :bus-id="busId"
      v-if="flag === 'checkConfirm'"
      @pass="handlerPass"
      @refresh="handleRefresh"
      @close="handlerClose"
    />
<!--    调查结果审批-->
    <approve-node-check-approve
      :bus-id="busId"
      v-if="flag === 'checkApprove'"
      :resource-type="resourceType"
      @pass="handlerPass"
      @refresh="handleRefresh"
      @close="handlerClose"
    />
  </div>
</template>

<script>
  import ApproveContainer from "./approve-node/approve-container";
  import ApproveNodeQprSave from "./approve-node/approve-node-qpr-save";
  import {qprDetail, qprPass} from "../../../api/business/out_buy_low/qpr";
  import {processLowApprovePass, processLowDetail} from "../../../api/business/process_low/process_low";
  import ApproveNodeQprApprove from "./approve-node/approve-node-qpr-approve";
  import ApproveNodeProviderCheckSave from "./approve-node/approve-node-provider-check-save";
  import ApproveNodeCheckConfirm from "./approve-node/approve-node-check-confirm";
  import ApproveNodeProcessLowApprove from "./approve-node/approve-node-process-low-approve";
  import ApproveNodeCheckApprove from "./approve-node/approce-node-check-approve";
  export default {
    name: "approveConvert",
    components: {
      ApproveNodeCheckApprove,
      ApproveNodeProcessLowApprove,
      ApproveNodeCheckConfirm,
      ApproveNodeProviderCheckSave, ApproveNodeQprApprove, ApproveNodeQprSave, ApproveContainer},
    props: {
      bpmId: {
        type: String,
      },
      busId: {
        type: String,
      },
      resourceType: {
        type: Number
      },
      flag: {
        type: String
      },
    },
    data() {
      return {
        data: {}
      }
    },
    methods: {
      handleRefresh() {
        this.$emit("refresh");
      },
      handlerPass() {
        let method;
        if (this.resourceType === 0) {
          method = qprPass;
        }
        if (this.resourceType === 1) {
          method = processLowApprovePass;
        }
        method(this.busId, this.bpmId).then(() => {
          this.$message({type: "success", message: "审批通过"});
          this.$emit("refresh");
          this.$emit("close");
        })
      },
      handlerClose() {
        this.$emit("close");
      },
      init() {
        let method;
        if (this.resourceType === 0) {
          method = qprDetail;
        }
        if (this.resourceType === 1) {
          method = processLowDetail;
        }
        method(this.busId).then(res => {
          this.data = res.data.data;
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
