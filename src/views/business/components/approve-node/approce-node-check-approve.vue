<template>
  <approve-container
    :busId="busId"
    :reject="handlerReject"
    :showRejectDialog.sync="showRejectDialog"
    :resource-type="resourceType"
    message-title="外购件不良"
    bpm-status="333"
    bpm-node="213213"
    form="f213123orm"
    code="123123">
    <div slot="bigContent">
      <extensible-container title="不良基本信息" ref="basicMessage">
        <out-buy-low-basic-message :data="data"/>
      </extensible-container>
      <extensible-container title="不良原因&对策" ref="checkMessage">
        <check-basic-message :data="data"/>
      </extensible-container>
      <extensible-container title="不良调查结论">
        <div style="padding-bottom: 100px;">
          <fill-message :data="data"/>
        </div>
      </extensible-container>
    </div>
    <div slot="operator">
      <el-button size="small" @click="$emit('close')">返回</el-button>
      <el-button type="danger" size="small" @click="showRejectDialog = true">驳回</el-button>
      <el-button type="success" size="small" @click="handlerPass">审批通过</el-button>
    </div>
  </approve-container>
</template>

<script>
  import ExtensibleContainer from "../../../../components/min/extensible_container";
  import OutBuyLowBasicMessage from "../../out_buy_low/component/out_buy_low_basic_message";
  import CheckBasicMessage from "../../out_buy_low/component/check-basic-message";
  import ApproveContainer from "./approve-container";
  import {approveOutBuyQprReject, qprDetail} from "../../../../api/business/out_buy_low/qpr";
  import FillMessage from "../../out_buy_low/component/fill_message";
  import {approveReject} from "../../../../api/business/process_low/process_low";
  export default {
    name: "approveNodeCheckApprove",
    components: {FillMessage, CheckBasicMessage, OutBuyLowBasicMessage, ExtensibleContainer, ApproveContainer},
    props: {
      busId: {
        type: String,
      },
      resourceType: {
        type: String,
      },
    },
    created() {
      this.init();
    },
    data() {
      return {
        data: {},
        showRejectDialog: false,
      }
    },
    methods: {
      handlerReject(form) {
        console.log(this.resourceType);
        let rejectMethod;
        if (this.resourceType === 0) {
          rejectMethod = approveOutBuyQprReject;
        }
        if (this.resourceType === 1) {
          rejectMethod = approveReject;
        }
        rejectMethod(form).then(() => {
          this.$message({type: "success", message: "驳回成功"});
          this.showRejectDialog = false;
          this.$emit("refresh");
          this.$emit("close");
        })
      },
      handlerPass() {
        this.$emit("pass");
      },
      init() {
        qprDetail(this.busId).then(res => {
          this.data = res.data.data;
          console.log(  this.data);
        })
      },
    }
  }
</script>

<style scoped>

</style>
