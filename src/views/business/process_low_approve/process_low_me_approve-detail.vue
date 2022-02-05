<template>
  <basic-container class="process-low-me-approve-detail">
    <fix-color-title>不良联络书</fix-color-title>
    <el-divider></el-divider>
    <div :style="{height: tableHeight}" style="overflow: auto;">
      <extensible-container ref="basicMessage" title="不良信息" :default-status="showBasicMessage">
        <div>
          <div class="title-item">不良现状</div>
          <div style="margin-top: 10px;">
            <table
              class="message-table"
              style="width: 100%;"
            >
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
              <tr>
                <td class="message-title">不良编号</td>
                <td class="message-value">{{data.code}}</td>
                <td class="message-title">标题</td>
                <td class="message-value">{{data.title}}</td>
              </tr>
              <tr>
                <td class="message-title">不良分类</td>
                <td class="message-value">{{typeMap[data.type]}}</td>
                <td class="message-title">不良等级</td>
                <td class="message-value">{{levelMap[data.level]}}</td>
              </tr>
              <tr>
                <td class="message-title">发生地点</td>
                <td class="message-value">{{triggerAddressMap[data.triggerAddress]}}</td>
                <td class="message-title">发生工序</td>
                <td class="message-value">{{triggerProcessMap[data.triggerProcess]}}</td>
              </tr>
              <tr>
                <td class="message-title">品名</td>
                <td class="message-value">{{data.name}}</td>
                <td class="message-title">品番号</td>
                <td class="message-value">{{data.designation}}</td>
              </tr>
              <tr>
                <td class="message-title">责任部门/厂家</td>
                <td class="message-value">{{data.dutyDept}}</td>
                <td class="message-title">机型</td>
                <td class="message-value">{{apparatusMap[data.apparatusType]}}</td>
              </tr>
              <tr>
                <td class="message-title">发现数量</td>
                <td class="message-value">{{data.findQuantity}}</td>
                <td class="message-title">发现时间</td>
                <td class="message-value">{{data.findTime}}</td>
              </tr>
              <tr>
                <td class="message-title">不良内容</td>
                <td class="message-value">{{data.content}}</td>
              </tr>
              <tr>
                <td class="message-title">拜托事项</td>
                <td class="message-value">{{data.pleaseContent}}</td>
              </tr>
              <tr>
                <td class="message-title">测量结果</td>
                <td class="message-value">{{data.testResult}}</td>
              </tr>
              <tr>
                <td class="message-title">关联部件确认(性能, 作业等影响)</td>
                <td class="message-value">{{data.correlationConfirm}}</td>
              </tr>
              <tr>
                <td class="message-title">不良图片</td>
                <td class="message-value">
                  <div>
                    <el-image
                      v-for="item in (data.imgReportList || [])"
                      style="width: 100px; height: 100px"
                      :src="item.url"
                      fit="contain"></el-image>
                  </div>
                </td>
                <td class="message-title">不良图片说明</td>
                <td class="message-value">{{data.imgRemark}}</td>
              </tr>
              <tr>
                <td class="message-title">不良测定报告</td>
                <td class="message-value">
                  <div v-if="validatenull(data.testReportFileName)" style="color: #C0C4CC;">
                    无文件
                  </div>
                  <div style="color: #2d8cf0; cursor: pointer;" @click="handlerDownLoad(data.testReportFileId)">
                    {{data.testReportFileName}}
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <div class="title-item">临时处理<span style="color: #C0C4CC; font-weight: 100; margin-left: 20px;">判断人: (xxAxxB不良临时对策方案必须经科长以上认可！其他不良必须由系长认可)</span></div>
          <div style="margin-top: 10px;">
            <table
              class="message-table"
              style="width: 100%;"
            >
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
              <tr>
                <td class="message-title">流出防止</td>
                <td class="message-value">{{data.banOutflowRemark}}</td>
                <td class="message-title">不良追溯</td>
                <td class="message-value">{{data.formRemark}}</td>
              </tr>
              <tr>
                <td class="message-title">生产对应</td>
                <td class="message-value">{{data.productRemark}}</td>
                <td class="message-title">异常件的返修方法, 关联部品的更换， 返修完毕的确认</td>
                <td class="message-value">{{data.rebackFixConfirm}}</td>
              </tr>
              <tr>
                <td class="message-title">不良排查及隔离(外购品, 毛坯, 在制品, 完成品, 分总成, 发动机)</td>
                <td class="message-value">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="data.separateFile || data.separateFile.url"
                    fit="contain"></el-image>
                </td>
                <td class="message-title">不良排查及隔离图片源文件</td>
                <td class="message-value">
                  <div v-if="validatenull(data.separateFileDependName)" style="color: #C0C4CC;">
                    无文件
                  </div>
                  <div style="color: #2d8cf0; cursor: pointer;" @click="handlerDownLoad(data.separateFileDependId)">
                    {{data.separateFileDependName}}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="message-title">变化点(与不良内容有因果关系的变化点)</td>
                <td class="message-value">{{data.changeRemark}}</td>
                <td class="message-title">是否发行业务通知书</td>
                <td class="message-value">{{data.isBusinessFile === 1 ? "是" : "否"}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <div class="title-item">附件</div>
          <div style="margin-top: 10px;">
            <el-table
              :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center', fontWeight: 700, color: 'rgba(0,0,0,.85)',fontSize: '12px'}"
              :cell-style="{'textAlign': 'center'}"
              :data="data.busincessFiles || []"
              border
              height="200px"
              style="width: 100%">
              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="附件名称">
              </el-table-column>
              <el-table-column
                prop="createUserName"
                label="操作人">
              </el-table-column>
              <el-table-column
                prop="createDeptName"
                label="所属部门">
              </el-table-column>
              <el-table-column
                prop="createTime"
                width="180"
                label="操作时间">
              </el-table-column>
              <el-table-column
                label="下载">
                <template slot-scope="scope">
                  下载
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </extensible-container>
      <extensible-container title="原因调查, 对策实施填写" v-if="isTriggerEditResult" :default-status="showEditResult">
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
    <div>
      <el-divider></el-divider>
      <div style="display: flex; justify-content: center;">
        <div v-if="!isTriggerEditResult">
          <el-button @click="clickClose">返回</el-button>
          <el-button type="danger" @click="handlerClickReject">驳回</el-button>
          <el-button type="success" @click="handlerClickEditResult">填写调查结果</el-button>
        </div>
        <div v-if="isTriggerEditResult">
          <el-button @click="clickClose">返回</el-button>
          <el-button type="primary" @click="submitEditCheck">提交</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="驳回"
               :visible.sync="showApproveRejectDialog"
               width="50%"
               append-to-body>
      <approve-reject  ref="approveReject" :bpm-id="bpmId" v-if="showApproveRejectDialog" :reject="handlerReject"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showApproveRejectDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleTriggerReject">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
  import ExtensibleContainer from "../../../components/min/extensible_container";
  import FixColorTitle from "../../../components/min/fix_color_title";
  import FileDragUpload from "../../../components/file/file-drag-upload";
  import FileUpload from "../../../components/file/file-upload";
  import {approveReject, processLowDetail, processLowEditCheck} from "../../../api/business/process_low/process_low";
  import {detailFile} from "../../../api/business/file/file";
  import ApproveReject from "../components/approve_reject";
  export default {
    name: "processLowMeApproveDetail",
    components: {ApproveReject, FileUpload, FileDragUpload, FixColorTitle, ExtensibleContainer},
    props: {
      id: {
        type: String,
      },
      bpmId: {
        type: String,
      }
    },
    data() {
      return {
        showBasicMessage: true,
        showEditResult: false,
        isTriggerEditResult: false,
        showApproveRejectDialog: false,
        data: {},
        windowHeight: 0,
        accessoryData: [],
        causeForm: {},
        caseTypeDict: [
          {label: "异常处理", value: 0},
          {label: "变化点管理", value: 1},
          {label: "良品条件设定", value: 2},
          {label: "维持管理", value: 3},
          {label: "标准作业", value: 4},
          {label: "其他", value: 5},
        ],
        typeMap: {0: "外购件", 1: "内制件", 2: "其他"},
        triggerAddressMap: {0: "TNGA#1", 1: "TNGA#2", 2: "TNGA#3", 3: "TNGA#4", 4: "TNGA#5", 5: "TNGA#6"},
        triggerProcessMap: {0: "铸造钢体", 1: "铸造缸盖", 2: "缸盖加工", 3: "缸体加工", 4: "曲轴加工", 5: "连杆加工", 6: "凸轮轴加工"},
        levelMap: {0: "R", 1: "S", 2: "A", 3: "B", 4: "C", 5: "批量", 6: "停线"},
        apparatusMap: {0: "TNAG2.0"},
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
    methods: {
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
        processLowEditCheck(this.id, this.bpmId, formCopy).then(res => {
          this.$message({type: "success", message: "提交成功"});
          this.showApproveRejectDialog = false;
          this.$emit("refresh");
          this.$emit("close");
        })
      },
      handlerClickEditResult() {
        this.showBasicMessage = false;
        this.showEditResult = true;
        this.isTriggerEditResult = true;
        this.$refs['basicMessage'].close();
      },
      handlerReject(form) {
        approveReject(form).then(() => {
          this.$message({type: "success", message: "驳回成功"});
          this.showApproveRejectDialog = false;
          this.$emit("refresh");
          this.clickClose();
        })
      },
      handleTriggerReject() {
        this.$refs['approveReject'].submit();
      },
      handlerClickReject() {
        this.showApproveRejectDialog = true;
      },
      handlerDownLoad(fileId) {
        detailFile(fileId).then(res => {
          let data = res.data.data;
          window.open(data.url);
        })
      },
      clickClose() {
        if (this.isTriggerEditResult) {
          this.isTriggerEditResult = false;
          this.showBasicMessage = true;
          this.showEditResult = false;
          this.$refs['basicMessage'].open();
          return;
        }
        this.$emit("close");
      },
      init() {
        processLowDetail(this.id).then(res => {
          this.data = res.data.data;
        })
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
    created() {
      this.init();
    }
  }
</script>

<style scoped>
.process-low-me-approve-detail .title-item{
  font-weight: 700;
}
.process-low-me-approve-detail .message-table {

}
.process-low-me-approve-detail .message-table td {
  border: 1px solid rgb(227, 237, 255);
  padding: 10px;
}
.process-low-me-approve-detail .message-table .message-title {
  text-align: right;
  background: rgb(239, 245, 255);
}
.process-low-me-approve-detail .message-table .message-content {

}
</style>
