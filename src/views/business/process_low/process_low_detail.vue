<template>
  <approve-detail-container
    :bus-id="busId"
    :active.sync="active"
    :tagData="tagData"
    messageTitle="不良业务相关表单"
    @processAfterInit="handlerAfterInit"
    @close="$emit('close')"
  >
    <div slot="processLowMessage">
      <div v-if="!isEdit">
        <div style="display: flex; justify-content: space-between;">
          <fix-color-title>工序内不良联络书</fix-color-title>
          <div
            v-if="bpmStatus === 3"
            @click="handlerClickEdit"
            style="background: #2d8cf0; color: #FFFFFF; margin-right: 20px; padding: 4px 10px; font-size: 12px; cursor: pointer;">
            修改
          </div>
        </div>
        <el-divider></el-divider>
        <extensible-container title="基本信息" :default-status="true">
          <process-low-basic-message :data="data"/>
        </extensible-container>
      </div>
      <div v-if="isEdit">
        <process-low-save-content :is-public="true"
                                  :id="busId"
                                  @save="handlerUpdate"
                                  @close="handlerCloseUpdate"/>
      </div>
    </div>
    <div slot="QprCheckResult">
      22
    </div>
  </approve-detail-container>
</template>

<script>
  import ApproveNodeList from "../components/approve_node_list";
  import ApproveDetailContainer from "../components/detail-node/approve-detail-container";
  import FixColorTitle from "../../../components/min/fix_color_title";
  import ExtensibleContainer from "../../../components/min/extensible_container";
  import {processLowApproveReSubmit, processLowDetail} from "../../../api/business/process_low/process_low";
  import ProcessLowBasicMessage from "./component/process_low_basic_message";
  import ProcessLowSave from "./process_low_save";
  import ProcessLowSaveContent from "./component/process_low_save_content";
  export default {
    name: "processLowDetail",
    components: {
      ProcessLowSaveContent,
      ProcessLowSave,
      ProcessLowBasicMessage, ExtensibleContainer, FixColorTitle, ApproveDetailContainer, ApproveNodeList},
    props: {
      busId: {
        type: String,
      },
      bpmStatus: {
        type: Number,
      }
    },
    data() {
      return {
        active: 0,
        tagData: [
          {label: "工序内不良联络书", slotName: "processLowMessage", value: 0},
          // {label: "QPR调查结果", slotName: "QprCheckResult",  value: 1},
        ],
        isShowQprCheck: false,
        isEdit: false,
        data: {}
      }
    },
    methods: {
      handlerUpdate(data) {
        processLowApproveReSubmit(this.busId, data).then(() => {
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
        processLowDetail(this.busId).then(res => {
          this.data = res.data.data;
        })
      },
      handlerAfterInit(data) {
        console.log(data);
      },
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
