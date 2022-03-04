<template>
  <div :style="{height: height + 'px'}" class="di-approve-convert">
    <di-approve-task
      v-if="bpmFlag === 'takeApprove'"
      @refresh="handlerRefresh"
      @cancel="handlerCancel"
      @reject="handlerOpenReject"
      :bus-id="busId"
      :data="data"/>
    <di-approve-boos
      v-if="bpmFlag === 'boosProcess'"
      @refresh="handlerRefresh"
      @cancel="handlerCancel"
      @reject="handlerOpenReject"
      :bus-id="busId"
      :data="data"/>
    <di-approve-un-report
      v-if="bpmFlag === 'unReportProcess'"
      @refresh="handlerRefresh"
      @cancel="handlerCancel"
      @reject="handlerOpenReject"
      :bus-id="busId"
      :data="data"/>
    <el-dialog title="审批不通过"
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
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import FixTagTitle from "../../../../components/min/fix_tag_title";
  import {reportDetail, reportReject} from "../../../../api/business/di/di";
  import TooltopText from "../../../../components/min/tooltop-text";
  import FileUpload from "../../../../components/file/file-upload";
  import DiApproveTask from "./di-approve-task";
  import DiApproveBoos from "./di-approve-boos";
  import {downloadFile} from "../../../../api/business/file/file";
  import {downloadResFile} from "../../../../util/util";
  import DiApproveUnReport from "./di-approve-un-report";
  import ApproveReject from "../../components/approve_reject";
  export default {
    name: "diApproveConvert",
    components: {
      ApproveReject,
      DiApproveUnReport, DiApproveBoos, DiApproveTask, FileUpload, TooltopText, FixTagTitle, FixColorTitle},
    props: {
      busId: {
        type: String,
      },
      bpmFlag: {
        type: String,
      }
    },
    data() {
      return {
        windowHeight: 0,
        data: {},
        file: [],
        showRejectDialog: false,
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      height() {
        return this.windowHeight - 160;
      }
    },
    methods: {
      handlerReject(form) {
        reportReject(form).then(() => {
          this.$message({type: "success", message: "驳回成功"});
          this.$emit("refresh");
          this.$emit("cancel");
        })
      },
      handlerOpenReject() {
        this.showRejectDialog = true;
      },
      handleTriggerReject() {
        this.$refs['approveReject'].submit();
      },
      handlerDownload(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      },
      handlerRefresh() {
        this.$emit("refresh");
      },
      handlerCancel() {
        this.$emit("cancel");
      },
      init() {
        reportDetail(this.busId).then(res => {
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
  .di-approve-convert .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
  }
  .di-approve-convert .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
</style>
