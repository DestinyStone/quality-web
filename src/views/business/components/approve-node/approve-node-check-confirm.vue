<template>
  <div>
    <approve-container
      :busId="busId"
      :resource-type="resourceType"
      message-title="外购件不良"
      :form="bpmNodeMapForm[data.bpmNode]"
      :code="data.code">
      <div slot="bigContent">
        <extensible-container title="不良基本信息" ref="basicMessage" :default-status="true">
          <out-buy-low-basic-message :data="data"/>
        </extensible-container>
        <extensible-container title="不良原因&对策" ref="checkMessage">
          <div style="padding-bottom: 80px;">
            <check-basic-message :data="data"/>
          </div>
        </extensible-container>
        <extensible-container title="不良调查结论" :default-status="true" v-if="isTriggerEdit">
          <div>
            <el-form size="small" style="width: 80%; margin: 30px auto;" :model="form" :rules="rules" ref="form" label-width="150px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="不良属性" prop="fillPropertiesType">
                    <el-radio v-model="form.fillPropertiesType" :label="0">单发</el-radio>
                    <el-radio v-model="form.fillPropertiesType" :label="1">散发</el-radio>
                    <el-radio v-model="form.fillPropertiesType" :label="2">批量</el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="不良类型" prop="fillType">
                    <el-select v-model="form.fillType" placeholder="请选择不良类型" style="width: 100%;">
                      <el-option
                        v-for="item in fillTypeDict"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="流出原因分类" prop="fillOutCauseType">
                    <el-select v-model="form.fillOutCauseType" placeholder="请选择不良类型" style="width: 100%;">
                      <el-option
                        v-for="item in fillOutCauseTypeDict"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发生原因分类" prop="fillTriggerCauseType">
                    <el-select v-model="form.fillTriggerCauseType" placeholder="请选择不良类型" style="width: 100%;">
                      <el-option
                        v-for="item in fillTriggerCauseTypeDict"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="判断结果" prop="fillJudgeResult">
                <el-radio v-for="item in fillJudgeResultDict" v-model="form.fillJudgeResult" :label="item.value">{{item.label}}</el-radio>
              </el-form-item>
              <el-form-item label="备注" prop="fillRemark">
                <el-input v-model="form.fillRemark"
                          type="textarea"
                          :rows="4"
                          resize="none" placeholder="多行输入"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div style="height: 100px;">

          </div>
        </extensible-container>
      </div>
      <div slot="operator">
        <el-button size="small" @click="handlerClose">返回</el-button>
        <el-button type="danger" size="small" @click="showApproveRejectDialog = true"  v-if="!isTriggerEdit">驳回供应商</el-button>
        <el-button type="success" size="small" v-if="!isTriggerEdit" @click="handlerClickEdit">填写不良言论</el-button>
        <el-button type="success" size="small" v-if="isTriggerEdit" @click="handlerSubmit">提交</el-button>
      </div>
    </approve-container>
    <el-dialog title="驳回供应商"
               :visible.sync="showApproveRejectDialog"
               width="50%"
               append-to-body>
      <approve-reject  ref="approveReject" :bus-id="busId" v-if="showApproveRejectDialog" :reject="rejectTrigger"/>
      <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="showApproveRejectDialog = false">取 消</el-button>
          <el-button size="small" type="primary" @click="handlerRejectProvider">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import ApproveContainer from "./approve-container";
  import ExtensibleContainer from "../../../../components/min/extensible_container";
  import {approveOutBuyQprReject, checkConfirmPass, qprDetail} from "../../../../api/business/out_buy_low/qpr";
  import OutBuyLowBasicMessage from "../../out_buy_low/component/out_buy_low_basic_message";
  import CheckBasicMessage from "../../out_buy_low/component/check-basic-message";
  import ApproveReject from "../approve_reject";
  export default {
    name: "approveNodeCheckConfirm",
    components: {ApproveReject, CheckBasicMessage, OutBuyLowBasicMessage, ExtensibleContainer, ApproveContainer},
    props: {
      busId: {
        type: String,
      },
      resourceType: {
        type: String,
      },
    },
    data() {
      return {
        data: {},
        form: {},
        rules: {
          fillPropertiesType: [{ required: true, message: '请选择不良属性', trigger: 'blur' },],
          fillType: [{ required: true, message: '请选择不良类型', trigger: 'blur' },],
          fillOutCauseType: [{ required: true, message: '请选择流出原因分类', trigger: 'blur' },],
          fillTriggerCauseType: [{ required: true, message: '请选择发生原因分类', trigger: 'blur' },],
          fillJudgeResult: [{ required: true, message: '请选择判断结果', trigger: 'blur' },],
        },
        isTriggerEdit: false,
        fillTypeDict: [
          {label: "漏工序", value: 0},
          {label: "欠品误品", value: 1},
          {label: "异音", value: 2},
          {label: "异物", value: 3},
          {label: "外观", value: 4},
          {label: "测漏NG", value: 5},
          {label: "尺寸", value: 6},
          {label: "其他", value: 7},
        ],
        fillOutCauseTypeDict: [
          {label: "检出力低", value: 0},
          {label: "防错失效", value: 1},
          {label: "标准作业不足", value: 2},
          {label: "异常处置不当", value: 3},
          {label: "其他", value: 4},
        ],
        fillTriggerCauseTypeDict: [
          {label: "夹装异常", value: 0},
          {label: "加功条件管理不足", value: 1},
          {label: "标准作业不足", value: 2},
          {label: "异常处置不当", value: 3},
          {label: "变化点管理不足", value: 4},
          {label: "其他", value: 5},
        ],
        fillJudgeResultDict: [
          {label: "供应商责任", value: 0},
          {label: "责任不明结案", value: 1},
          {label: "内制件责任", value: 2},
          {label: "生管责任", value: 3},
          {label: "其他直接结案", value: 4},
        ],
        bpmNodeMapForm: {0: "不良联络书", 1: "不良联络书", 2: "调查结果表", 3: "调查结果表", 4: "调查结果表"},
        showApproveRejectDialog: false,
      }
    },
    created() {
      this.init();
    },
    methods: {
      rejectTrigger(form) {
        approveOutBuyQprReject(form).then(() => {
          this.$message({type: "success", message: "驳回成功"});
          this.showApproveRejectDialog = false;
          this.$emit("refresh");
          this.$emit("close");
        })
      },
      handlerRejectProvider() {
        this.$refs['approveReject'].submit();
      },
      init() {
        qprDetail(this.busId).then(res => {
          this.data = res.data.data;
        })
      },
      handlerSubmit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return;
          }
          let formCopy = JSON.parse(JSON.stringify(this.form));
          this.handlerSave(formCopy);
        });
      },
      handlerSave(data) {
        checkConfirmPass(this.busId, data).then(() => {
          this.$message({type: "success", message: "提交成功"});
          this.$emit("refresh");
          this.$emit("close");
        })
      },
      handlerClose() {
        if (this.isTriggerEdit) {
          this.isTriggerEdit = false;
          return;
        }
        this.$emit("close");
      },
      handlerClickEdit() {
        this.$refs['basicMessage'].close();
        this.$refs['checkMessage'].close();
        this.isTriggerEdit = true;
      },
      handlerPass() {
        this.$emit("pass");
      }
    }
  }
</script>

<style scoped>

</style>
