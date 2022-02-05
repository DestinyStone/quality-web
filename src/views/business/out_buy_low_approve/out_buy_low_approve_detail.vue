<template>
  <div>
    <div style="position:relative; overflow: auto;">
      <approve-node-list code="122222" node="33333"  form="222222" bpmStatus="ssss" busId="1488544480633032705"/>
      <basic-container>
        <div>
          <fix-color-title :size="14" v-if="bpmFlag === 'qprSave'">外购件不良</fix-color-title>
          <fix-color-title :size="14" v-if="bpmFlag === 'qprApprove'">外购件不良</fix-color-title>
          <fix-color-title :size="14" v-if="bpmFlag === 'checkSave'">QPR联络书</fix-color-title>
          <fix-color-title :size="14" v-if="bpmFlag === 'checkConfirm'">外购件不良</fix-color-title>
          <fix-color-title :size="14" v-if="bpmFlag === 'checkApprove'">外购件不良</fix-color-title>
          <!--<fix-color-title :size="14">QPR联络书</fix-color-title>-->
          <div style="margin-top: 20px;">
            <extensible-container title="联络书基本信息" v-if="bpmFlag === 'qprSave'">
              <process-low-basic-message/>
            </extensible-container>
            <extensible-container title="联络书基本信息" v-if="bpmFlag === 'qprApprove'">
              <out-buy-low-basic-message/>
            </extensible-container>
            <extensible-container title="基本信息" v-if="bpmFlag === 'checkSave'">
              不良调查供应商
            </extensible-container>
            <extensible-container title="不良基本信息" v-if="bpmFlag === 'checkConfirm'">
              调查结果确认担当
            </extensible-container>
            <extensible-container title="不良原因&对策" v-if="bpmFlag === 'checkApprove'">
              调查结果审批
            </extensible-container>
          </div>
        </div>
      </basic-container>
      <div style="bottom: 0; position: fixed; width: 100%; background: #FFFFFF">
        <div style="width: 80%; padding: 10px 0;">
          <div style="display: flex; justify-content: center;">
            <el-button size="small">返回</el-button>
            <el-button type="danger" size="small">驳回</el-button>
            <el-button type="warning" size="small" v-if="bpmFlag === 'qprSave'">接受并发起QPR</el-button>
            <el-button type="warning" size="small" v-if="bpmFlag === 'qprApprove'">审批通过</el-button>
            <el-button type="warning" size="small" v-if="bpmFlag === 'checkSave'">填写调查结果</el-button>
            <el-button type="warning" size="small" v-if="bpmFlag === 'checkConfirm'">填写不良言论</el-button>
            <el-button type="warning" size="small" v-if="bpmFlag === 'checkApprove'">审批通过</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApproveNodeList from "../components/approve_node_list";
  import FixColorTitle from "../../../components/min/fix_color_title";
  import ExtensibleContainer from "../../../components/min/extensible_container";
  import ProcessLowBasicMessage from "../process_low/component/process_low_basic_message";
  import OutBuyLowBasicMessage from "../out_buy_low/component/out_buy_low_basic_message";
  export default {
    name: "outBuyLowApproveDetail",
    components: {OutBuyLowBasicMessage, ProcessLowBasicMessage, ExtensibleContainer, FixColorTitle, ApproveNodeList},
    props: {
      bpmFlag: {
        type: String,
        default: "qprApprove"
      },
      busId: {
        type: String,
        default: ""
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    data() {
      return {
        windowHeight: 0,
      }
    },
    computed: {
      height() {
        return (this.windowHeight - 1200) + "px";
      }
    }
  }
</script>

<style scoped>

</style>
