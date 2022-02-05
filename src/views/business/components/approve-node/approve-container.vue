<template>
  <div>
    <approve-node-list :bus-id="busId"
                       :bpm-status="bpmStatus"
                       :bpm-node="node"
                       :form="form"
                       :code="code"
    />
    <div>
      <basic-container>
        <div>
          <fix-color-title :size="14">{{messageTitle}}</fix-color-title>
          <el-divider></el-divider>
          <div style="margin-top: 20px;">
            <slot name="bigContent"></slot>
            <extensible-container :title="messageMinTitle" :default-status="true" v-if="!validatenull(messageMinTitle)">
              <slot name="content"/>
            </extensible-container>
          </div>
        </div>
      </basic-container>
      <div style="bottom: 0; position: fixed; width: 100%; background: #FFFFFF">
        <div style=" padding: 10px 0; width: 85%;">
          <div style="display: flex; justify-content: center;">
            <slot name="operator"/>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="驳回"
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
  import ApproveNodeList from "../approve_node_list";
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import ExtensibleContainer from "../../../../components/min/extensible_container";
  import ApproveReject from "../approve_reject";
  export default {
    name: "approveContainer",
    components: {ApproveReject, ExtensibleContainer, FixColorTitle, ApproveNodeList},
    props: {
      messageTitle: {
        type: String,
      },
      messageMinTitle: {
        type: String
      },
      code: {
        type: String,
      },
      node: {
        type: String,
      },
      form: {
        type: String
      },
      bpmStatus: {
        type: String,
      },
      busId: {
        type: String,
      },
      reject: {
        type: Function
      },
      showRejectDialog: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        data: {},
      }
    },
    methods: {
      handlerReject(form) {
        this.reject(form);
      },
      handleTriggerReject() {
        this.$refs['approveReject'].submit();
      },
    }
  }
</script>

<style scoped>

</style>
