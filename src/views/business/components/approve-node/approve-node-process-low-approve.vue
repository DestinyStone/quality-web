<template>
  <div  class="approve-node-process-low-approve"  >
    <approve-container
      v-if="showMain"
      :busId="busId"
      :resource-type="resourceType"
      message-title="外购件不良"
      message-min-title="联络书基本信息"
      bpm-status="333"
      bpm-node="213213"
      form="f213123orm"
      code="123123">
      <div slot="content">
        <div style="margin-top: 10px;">
          <process-low-basic-message :data="data"/>
        </div>
      </div>
      <div slot="operator">
        <el-button size="small" @click="handlerClose">返回</el-button>
        <el-button type="danger" size="small" @click="showApproveRejectDialog = true">驳回</el-button>
        <el-button type="success" size="small" @click="clickEditResult">填写调查结果</el-button>
      </div>
    </approve-container>
    <basic-container v-if="showEditResult">
      <fix-color-title>不良联络书</fix-color-title>
      <el-divider></el-divider>
      <div :style="{height: tableHeight}" style="overflow: auto;">
        <extensible-container ref="basicMessage" title="不良信息" :default-status="false">
          <process-low-basic-message :data="data"/>
        </extensible-container>
        <extensible-container title="原因调查, 对策实施填写" :default-status="true">
          <el-form :model="causeForm" :rules="causeRules" ref="causeForm" label-width="150px">
            <div >
              <div style="font-weight: 700;"><span style="color: red; margin-right: 3px;">*</span>不良分析调查</div>
              <div style="position:relative; top: -20px;">
                <el-form-item label="" prop="analyseCause">
                  <el-input v-model="causeForm.analyseCause"
                            type="textarea"
                            :rows="4"
                            resize="none" placeholder="请输入不良分析调查"></el-input>
                </el-form-item>
              </div>
            </div>
            <div>
              <div style="font-weight: 700;"><span style="color: red; margin-right: 3px;">*</span>不良分析调查图片</div>
              <div style="position:relative; top: -20px;">
                <el-form-item label="" prop="analyseCauseImgFileId">
                  <file-drag-upload :file.sync="causeForm.analyseCauseImgFileId"/>
                </el-form-item>
              </div>
            </div>
            <div style=" font-weight: 700;"><span style="color: red; margin-right: 3px;">*</span>再发生对策防止</div>
            <el-form-item label="发生原因类型" prop="analyseCauseType" style="margin-top: 30px;">
              <el-select v-model="causeForm.analyseCauseType" placeholder="请选择发生原因类型" style="width: 100%;">
                <el-option
                  v-for="item in caseTypeDict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发生原因" prop="analyseTriggerCause">
              <el-input v-model="causeForm.analyseTriggerCause"
                        type="textarea"
                        :rows="4"
                        resize="none" placeholder="请输入发生原因"></el-input>
            </el-form-item>
            <el-form-item label="发生对策" prop="analyseTriggerStrategy">
              <el-input v-model="causeForm.analyseTriggerStrategy"
                        type="textarea"
                        :rows="4"
                        resize="none" placeholder="请输入发生对策"></el-input>
            </el-form-item>
            <el-form-item label="流出原因" prop="analyseOutCause">
              <el-input v-model="causeForm.analyseOutCause"
                        type="textarea"
                        :rows="4"
                        resize="none" placeholder="请输入流出原因"></el-input>
            </el-form-item>
            <el-form-item label="流出对策" prop="analyseOutStrategy">
              <el-input v-model="causeForm.analyseOutStrategy"
                        type="textarea"
                        :rows="4"
                        resize="none" placeholder="请输入流出对策"></el-input>
            </el-form-item>
            <el-form-item label="是否上传标准类更新" prop="isUploadStandardFile">
              <el-radio :label="1" v-model="causeForm.isUploadStandardFile">是</el-radio>
              <el-radio :label="0" v-model="causeForm.isUploadStandardFile">否</el-radio>
            </el-form-item>
            <div style=" font-weight: 700;">附件上次</div>
            <el-form-item label="发生对策附件" prop="triggerStrategyFileId">
              <file-upload :file.sync="causeForm.triggerStrategyFileId"/>
            </el-form-item>
            <el-form-item label="流程对策附件" prop="processStrategyFileId">
              <file-upload :file.sync="causeForm.processStrategyFileId"/>
            </el-form-item>
            <el-form-item label="放行通知书附件" prop="passAdviceFileId">
              <file-upload :file.sync="causeForm.passAdviceFileId"/>
            </el-form-item>
            <el-form-item label="标准类文件附件" prop="standardFileId" v-if="causeForm.isUploadStandardFile === 1">
              <file-upload :file.sync="causeForm.standardFileId"/>
            </el-form-item>
          </el-form>
        </extensible-container>
      </div>
    </basic-container>
    <el-dialog title="驳回"
               :visible.sync="showApproveRejectDialog"
               width="50%"
               append-to-body>
      <approve-reject  ref="approveReject" :bus-id="busId" v-if="showApproveRejectDialog" :reject="handlerReject"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showApproveRejectDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleTriggerReject">确 定</el-button>
      </span>
    </el-dialog>
    <div v-if="showEditResult" style="bottom: 0; position: fixed; width: 100%; background: #FFFFFF">
      <div style=" padding: 10px 0; width: 85%;">
        <div style="display: flex; justify-content: center;">
          <el-button @click="handlerClose" size="small">返回</el-button>
          <el-button type="primary" @click="submitEditCheck" size="small">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApproveContainer from "./approve-container";
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import ExtensibleContainer from "../../../../components/min/extensible_container";
  import ApproveReject from "../approve_reject";
  import FileUpload from "../../../../components/file/file-upload";
  import FileDragUpload from "../../../../components/file/file-drag-upload";
  import {approveReject, processLowEditCheck} from "../../../../api/business/process_low/process_low";
  import ProcessLowBasicMessage from "../../process_low/component/process_low_basic_message";
  export default {
      name: "approveNodeProcessLowApprove",
    components: {
      ProcessLowBasicMessage,
      FileDragUpload, FileUpload, ApproveReject, ExtensibleContainer, FixColorTitle, ApproveContainer},
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
    data() {
      return {
        showApproveRejectDialog: false,
        showMain: true,
        showEditResult: false,
        windowHeight: 0,
        typeMap: {0: "外购件", 1: "内制件", 2: "其他"},
        triggerAddressMap: {0: "TNGA#1", 1: "TNGA#2", 2: "TNGA#3", 3: "TNGA#4", 4: "TNGA#5", 5: "TNGA#6"},
        triggerProcessMap: {0: "铸造钢体", 1: "铸造缸盖", 2: "缸盖加工", 3: "缸体加工", 4: "曲轴加工", 5: "连杆加工", 6: "凸轮轴加工"},
        levelMap: {0: "R", 1: "S", 2: "A", 3: "B", 4: "C", 5: "批量", 6: "停线"},
        apparatusMap: {0: "TNAG2.0"},
        caseTypeDict: [
          {label: "异常处理", value: 0},
          {label: "变化点管理", value: 1},
          {label: "良品条件设定", value: 2},
          {label: "维持管理", value: 3},
          {label: "标准作业", value: 4},
          {label: "其他", value: 5},
        ],
        causeForm: {},
        causeRules: {
          analyseCause: [{required: true, message: '请输入不良分析调查', trigger: 'blur'},],
          analyseCauseImgFileId: [{required: true, message: '请上传不良分析调查图片', trigger: 'blur'},],
          analyseCauseType: [{required: true, message: '请选择发生原因类型', trigger: 'blur'},],
          analyseTriggerCause: [{required: true, message: '请输入发生原因', trigger: 'blur'},],
          analyseTriggerStrategy: [{required: true, message: '请输入发生对策', trigger: 'blur'},],
          analyseOutCause: [{required: true, message: '请输入流出原因', trigger: 'blur'},],
          analyseOutStrategy: [{required: true, message: '请输入流出对策', trigger: 'blur'},],
          isUploadStandardFile: [{required: true, message: '请选择是否删除标准类文件', trigger: 'blur'},],
        }
      }
    },
    computed: {
      tableHeight() {
        return (this.windowHeight - 280) + "px";
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
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
      handleTriggerReject() {
        this.$refs['approveReject'].submit();
      },
      submitEditCheck() {
        this.$refs['causeForm'].validate((valid) => {
          if (!valid) {
            return;
          }
          let formCopy = JSON.parse(JSON.stringify(this.causeForm));

          if (!this.validatenull(this.causeForm.analyseCauseImgFileId)) {
            formCopy.analyseCauseImgFileId = this.causeForm.analyseCauseImgFileId.id;
            formCopy.analyseCauseImgFileName = this.causeForm.analyseCauseImgFileId.name;
          }

          if (!this.validatenull(this.causeForm.triggerStrategyFileId)) {
            formCopy.triggerStrategyFileId = this.causeForm.triggerStrategyFileId.id;
            formCopy.triggerStrategyFileName = this.causeForm.triggerStrategyFileId.name;
          }

          if (!this.validatenull(this.causeForm.processStrategyFileId)) {
            formCopy.processStrategyFileId = this.causeForm.processStrategyFileId.id;
            formCopy.processStrategyFileName = this.causeForm.processStrategyFileId.name;
          }

          if (!this.validatenull(this.causeForm.passAdviceFileId)) {
            formCopy.passAdviceFileId = this.causeForm.passAdviceFileId.id;
            formCopy.passAdviceFileName = this.causeForm.passAdviceFileId.name;
          }

          if (!this.validatenull(this.causeForm.standardFileId)) {
            formCopy.standardFileId = this.causeForm.standardFileId.id;
            formCopy.standardFileName = this.causeForm.standardFileId.name;
          }
          this.save(formCopy);
        });
      },
      save(formCopy) {
        processLowEditCheck(this.busId, formCopy).then(() => {
          this.$message({type: "success", message: "提交成功"});
          this.$emit("refresh");
          this.$emit("close");
        })
      },
      handlerClose() {
        if (this.showEditResult) {
          this.showMain = true;
          this.showEditResult = false;
          return;
        }

        this.$emit("close");
      },
      clickEditResult() {
        this.showMain = false;
        this.showEditResult = true;
      }
    }
  }
</script>

<style scoped>
  .approve-node-process-low-approve .title-item{
    font-weight: 700;
  }
  .approve-node-process-low-approve .message-table {

  }
  .approve-node-process-low-approve .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
  }
  .approve-node-process-low-approve .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
  .approve-node-process-low-approve .message-table .message-content {

  }
</style>
