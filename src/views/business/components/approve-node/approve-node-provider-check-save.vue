<template>
  <div>
    <el-row>
      <el-col :span="4">
        <basic-container>
          <div :style="{height: height}">
            <div style="font-weight: 700; font-size: 14px;">不良业务相关表单</div>
            <el-divider></el-divider>
            <tag-select-column style="margin-top: 10px;" :data="tagData" :active="active" @click="handlerClick"/>
          </div>
        </basic-container>
      </el-col>
      <el-col :span="20">
        <basic-container>
          <div :style="{height: height}">
            <fix-color-title>QPR联络书</fix-color-title>
            <extensible-container title="基本信息" ref="basicMessage" style="margin-top: 20px;" :status="!isClickEdit">
              <div style="height: 1100px;">
                <out-buy-low-basic-message :id="busId" :data="data"/>
                <div style="margin-top: 20px;">
                  <fix-color-title>审批过程</fix-color-title>
                  <approve-detail style="margin-top: 10px;" :bus-id="busId"/>
                </div>
              </div>
            </extensible-container>
            <extensible-container v-if="isClickEdit" title="不良原因&对策" :default-status="true">
             <div style="height: 1200px;">
               <el-form :model="form" :rules="rules" ref="form" label-width="120px">
                 <el-row>
                   <el-col :span="12">
                     <el-form-item label="发生原因" prop="analyseTriggerCause">
                       <el-input
                         type="textarea"
                         :rows="3"
                         resize="none"
                         placeholder="多行输入"
                         v-model="form.analyseTriggerCause">
                       </el-input>
                     </el-form-item>
                   </el-col>
                   <el-col :span="12">
                     <el-form-item label="流出原因" prop="analyseOutCause">
                       <el-input
                         type="textarea"
                         :rows="3"
                         resize="none"
                         placeholder="多行输入"
                         v-model="form.analyseOutCause">
                       </el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>
                 <el-row>
                   <el-col :span="12">
                     <el-form-item label="发生对策" prop="analyseTriggerStrategy">
                       <el-input
                         type="textarea"
                         :rows="3"
                         resize="none"
                         placeholder="多行输入"
                         v-model="form.analyseTriggerStrategy">
                       </el-input>
                     </el-form-item>
                   </el-col>
                   <el-col :span="12">
                     <el-form-item label="流出对策" prop="analyseOutStrategy">
                       <el-input
                         type="textarea"
                         :rows="3"
                         resize="none"
                         placeholder="多行输入"
                         v-model="form.analyseOutStrategy">
                       </el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>
                 <el-row>
                   <el-col :span="12">
                     <el-form-item label="其他" prop="analyseOther">
                       <el-input
                         type="textarea"
                         :rows="4"
                         resize="none"
                         placeholder="多行输入"
                         v-model="form.analyseOther">
                       </el-input>
                     </el-form-item>
                   </el-col>
                   <el-col :span="12">
                   </el-col>
                 </el-row>
               </el-form>
               <div style="display: flex; margin-top: 40px;">
                 <div style="font-weight: 700; font-size: 12px; display: flex; justify-content: center; flex-flow: column;">相关附件</div>
                 <file-mult-upload style="margin-left: 20px;" :file-list.sync="form.analyseExtendsFileIds" @upload="handlerBusincessUpload"/>
               </div>
               <el-table
                 :key="tableUpdate"
                 :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
                 :cell-style="{'textAlign': 'center'}"
                 :data="form.analyseExtendsFileIds"
                 border
                 height="250"
                 style="width: 100%; margin-top: 20px;">
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
                   label="操作">
                   <template slot-scope="scope">
                     <el-link :underline="false"  type="danger" @click="removeBusincessIdFiles(scope.row)">删除</el-link>
                   </template>
                 </el-table-column>
               </el-table>
             </div>
            </extensible-container>
          </div>
        </basic-container>
      </el-col>
    </el-row>
    <div>
    </div>
    <div style="position: fixed; bottom: 0; padding: 10px 0; width: 100%; background: #FFFFFF">
      <div style="display: flex; width: 80%; justify-content: center;">
        <div>
          <el-button size="small" @click="handlerClickClose">返回</el-button>
          <el-button type="primary" size="small" v-if="!isClickEdit" plain>下载QPR</el-button>
          <el-button type="primary" v-if="!isClickEdit" size="small" @click="clickEditCheck">填写调查结果</el-button>
          <el-button type="primary" v-if="isClickEdit" size="small" @click="handlerClickPass">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TagSelectColumn from "../../../../components/min/tag_select_column";
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import ExtensibleContainer from "../../../../components/min/extensible_container";
  import {checkSavePass} from "../../../../api/business/out_buy_low/qpr";
  import FileMultUpload from "../../../../components/file/file-mult-upload";
  import OutBuyLowBasicMessage from "../../out_buy_low/component/out_buy_low_basic_message";
  import ApproveDetail from "../approve_detail";
  export default {
    name: "approve-node-provider-check-save",
    components: {
      ApproveDetail,
      OutBuyLowBasicMessage, FileMultUpload, ExtensibleContainer, FixColorTitle, TagSelectColumn},
    data() {
      return {
        isClickEdit: false,
        windowHeight: 0,
        active: 0,
        tagData: [
          {label: "QPR联络书", value: 0},
        ],
        form: {},
        rules:{
          analyseTriggerCause: [{ required: true, message: '请输入发生原因', trigger: 'blur' },],
          analyseOutCause: [{ required: true, message: '请输入发生对策', trigger: 'blur' },],
          analyseTriggerStrategy: [{ required: true, message: '请输入流出原因', trigger: 'blur' },],
          analyseOutStrategy: [{ required: true, message: '请输入流出对策', trigger: 'blur' },],
        },
        tableUpdate: 0,
        bpmNodeMapForm: {0: "不良联络书", 1: "不良联络书", 2: "调查结果表", 3: "调查结果表", 4: "调查结果表"},
      }
    },
    mounted() {
      this.windowHeight  = document.body.clientHeight;
    },
    computed: {
      height() {
        return this.windowHeight - 220 + "px";
      }
    },
    props: {
      busId: {
        type: String
      },
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      removeBusincessIdFiles(row) {
        this.$confirm("是否删除改文件?", "提示", {confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"}).then(() => {
          for(let key in this.form.busincessIdFiles) {
            let item = this.form.busincessIdFiles[key];
            if (item.id === row.id) {
              this.form.busincessIdFiles.splice(key, 1);
              break;
            }
          }

          this.handlerBusincessUpload();
        });
      },
      handlerBusincessUpload() {
        this.tableUpdate++;
      },
      handlerClickPass() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return;
          }
          let formCopy = JSON.parse(JSON.stringify(this.form));


          if (this.validatenull(formCopy.analyseExtendsFileIds)) {
            formCopy.analyseExtendsFileIds = [];
          }

          if (formCopy.analyseExtendsFileIds.length === 0) {
            formCopy.analyseExtendsFileIds = null;
          }

          if (formCopy.analyseExtendsFileIds !== null) {
            formCopy.analyseExtendsFileIds = this.form.analyseExtendsFileIds.map(item => item.id).join(",");
          }
          this.save(formCopy);
        });
      },
      save(data) {
        checkSavePass(this.busId, data).then(() => {
          this.$message({type: "success", message: "提交成功"});
          this.$emit("refresh");
          this.$emit("close");
        })
      },
      clickEditCheck() {
        this.isClickEdit = true;
        this.$refs['basicMessage'].close();
      },
      handlerClickClose() {
        if (this.isClickEdit) {
          this.isClickEdit = false;
          this.$refs['basicMessage'].open();
          return;
        }
        this.$emit("close");
      },
      handlerClick(item) {
        this.active = item.value;
      },
    }
  }
</script>

<style scoped>

</style>
