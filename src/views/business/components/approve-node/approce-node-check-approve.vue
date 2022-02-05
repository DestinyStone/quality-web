<template>
  <approve-container
    :busId="busId"
    :resource-type="resourceType"
    message-title="外购件不良"
    message-min-title="联络书基本信息"
    bpm-status="333"
    bpm-node="213213"
    form="f213123orm"
    code="123123">
    <div slot="bigContent">
      <extensible-container title="不良基本信息" ref="basicMessage" :default-status="true">
        <out-buy-low-basic-message :data="data"/>
      </extensible-container>
      <extensible-container title="不良原因&对策" ref="checkMessage">
        <check-basic-message :data="data"/>
      </extensible-container>
      <extensible-container title="不良调查结论" :default-status="true" v-if="isTriggerEdit">
        <fill-message :data="data"/>
      </extensible-container>
    </div>
    <div slot="operator">
      <el-button size="small" @click="$emit('close')">返回</el-button>
      <el-button type="danger" size="small">驳回</el-button>
      <el-button type="success" size="small" @click="handlerPass">审批通过</el-button>
    </div>
  </approve-container>
</template>

<script>
  import ExtensibleContainer from "../../../../components/min/extensible_container";
  import OutBuyLowBasicMessage from "../../out_buy_low/component/out_buy_low_basic_message";
  import CheckBasicMessage from "../../out_buy_low/component/check-basic-message";
  import ApproveContainer from "./approve-container";
  import {qprDetail} from "../../../../api/business/out_buy_low/qpr";
  import FillMessage from "../../out_buy_low/component/fill_message";
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
        data: {}
      }
    },
    methods: {
      handlerPass() {
        this.$emit("pass");
      },
      init() {
        qprDetail(this.busId).then(res => {
          this.data = res.data.data;
        })
      },
    }
  }
</script>

<style scoped>

</style>
