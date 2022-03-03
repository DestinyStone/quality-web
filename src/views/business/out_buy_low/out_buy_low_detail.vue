<template>
  <approve-detail-container
    :bus-id="busId"
    :code="data.code"
    :bpm-status="data.bpmStatus"
    :active.sync="active"
    :tagData="tagData"
    :bpm-status-remark="bpmStatusRemark"
    messageTitle="不良业务相关表单"
    :form="bpmNodeMapForm[data.bpmNode]"
    @processAfterInit="handlerAfterInit"
    @close="$emit('close')"
  >
    <div slot="processLowMessage">
      <div v-if="!isEdit">
        <div style="display: flex; justify-content: space-between;">
          <fix-color-title>外购件不良联络书</fix-color-title>
          <div
            v-if="bpmStatus === 3 || bpmStatus === 4"
            @click="handlerClickEdit"
            style="background: #2d8cf0; color: #FFFFFF; margin-right: 20px; padding: 4px 10px; font-size: 12px; cursor: pointer;">
            修改
          </div>
        </div>
        <el-divider></el-divider>
        <out-buy-low-basic-message :data="data"/>
      </div>
      <div v-if="isEdit">
        <out-buy-low-save-content :id="busId"
                                  :is-use-out="true"
                                  :close="handlerCloseEdit"
                                  :save="handlerUpdate"/>
      </div>
    </div>
    <div slot="CheckResult">
      <extensible-container title="不良原因&对策">
        <check-basic-message :id="busId"/>
      </extensible-container>
      <extensible-container title="不良调查结论" v-if="isShowCheckResult">
        <div style="padding-bottom: 100px;">
          <fill-message :id="busId"/>
        </div>
      </extensible-container>
    </div>
  </approve-detail-container>
</template>

<script>
  import ApproveNodeList from "../components/approve_node_list";
  import ApproveDetailContainer from "../components/detail-node/approve-detail-container";
  import FixColorTitle from "../../../components/min/fix_color_title";
  import ExtensibleContainer from "../../../components/min/extensible_container";
  import ProcessLowBasicMessage from "../process_low/component/process_low_basic_message";
  import ProcessLowSave from "../process_low/process_low_save";
  import ProcessLowSaveContent from "../process_low/component/process_low_save_content";
  import {processLowApproveReSubmit} from "../../../api/business/process_low/process_low";
  import OutBuyLowBasicMessage from "./component/out_buy_low_basic_message";
  import {qprDetail, remarkOutBuy} from "../../../api/business/out_buy_low/qpr";
  import CheckBasicMessage from "./component/check-basic-message";
  import FillMessage from "./component/fill_message";
  import OutBuyLowSave from "./out_buy_low_save";
  import OutBuyLowSaveContent from "./component/out_buy_low_save_content";
  export default {
    name: "outBuyLowDetail",
    components: {
      OutBuyLowSaveContent,
      OutBuyLowSave,
      FillMessage,
      CheckBasicMessage,
      OutBuyLowBasicMessage,
      ProcessLowSaveContent,
      ProcessLowSave,
      ProcessLowBasicMessage, ExtensibleContainer, FixColorTitle, ApproveDetailContainer, ApproveNodeList},
    props: {
      busId: {
        type: String,
      },
      bpmStatus: {
        type: Number,
      },
      bpmNode: {
        type: Number,
      }
    },
    data() {
      return {
        active: 0,
        tagData: [
          {label: "外购件不良联络书", slotName: "processLowMessage", value: 0},
          // {label: "QPR调查结果", slotName: "QprCheckResult",  value: 1},
        ],
        isShowQprCheck: false,
        isEdit: false,
        data: {},
        bpmStatusRemark: "",
        isShowCheckResult: false,
        bpmNodeMapForm: {0: "不良联络书", 1: "不良联络书", 2: "调查结果表", 3: "调查结果表", 4: "调查结果表"},
      }
    },
    methods: {
      handlerCloseEdit() {
        this.isEdit = false;
      },
      handlerUpdate(data) {
        remarkOutBuy(this.busId, data).then(() => {
          this.$message({type: "success", message: "修改成功"});
          this.$emit("refresh");
          this.$emit("close");
        })
      },
      handlerCloseUpdate() {
        this.isEdit = false;
      },
      handlerClickEdit() {
        this.isEdit = true;
      },
      init() {
        qprDetail(this.busId).then(res => {
          this.data = res.data.data;
        })
        if (this.bpmNode > 2) {
          this.tagData.push({label: "不良调查结果", slotName: "CheckResult",  value: 2});
        }
        if (this.bpmNode > 3) {
          this.isShowCheckResult = true;
        }
      },
      handlerAfterInit(data) {
        if (data[0].bpmStatus === 0) {
          this.bpmStatusRemark = "自撤回";
          return;
        }

        if (data[data.length - 1].bpmStatus === 3) {
          this.bpmStatusRemark = "已完成";
          return;
        }

        for(let key in data) {
          if(data[key].bpmStatus === 4) {
            this.bpmStatusRemark = "已退回";
            return;
          }

          if(data[key].bpmStatus === 2) {
            this.bpmStatusRemark = data[key].bpmRemark;
            return;
          }
        }
      },
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
