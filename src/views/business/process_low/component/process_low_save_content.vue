<template>
  <div>
    <fix-color-title>不良录入</fix-color-title>
    <el-divider></el-divider>
    <div style=" margin-top: 30px;">
      <div style=" margin: 0 auto;">
        <el-form :key="updateForm" :model="form" size="small" :rules="rules" ref="form" label-width="240px">
          <div style="font-weight: 700; margin-left: 100px;">不良现状</div>
          <div style="width: 90%;">
            <div style="width: 70%;  min-width: 900px; margin: 0 auto;">
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" type="small" placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="不良分类" prop="type">
                    <div style="width: 300px;">
                      <el-radio v-model="form.type" :label="0">外购件</el-radio>
                      <el-radio v-model="form.type" :label="1">内制件</el-radio>
                      <el-radio v-model="form.type" :label="2">其他</el-radio>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="不良等级" prop="level">
                    <el-select v-model="form.level" placeholder="请选择不良等级" style="width: 100%;">
                      <el-option
                        v-for="item in levelDict"
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
                  <el-form-item label="发生地点" prop="triggerAddress">
                    <el-select v-model="form.triggerAddress" placeholder="请选择发生地点" style="width: 100%;">
                      <el-option
                        v-for="item in triggerAddressDict"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发生工序" prop="triggerProcess">
                    <el-select v-model="form.triggerProcess" placeholder="请选择发生工序" style="width: 100%;">
                      <el-option
                        v-for="item in triggerProcessDict"
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
                  <el-form-item label="品番号" prop="designation">
                    <el-input v-model="form.designation" placeholder="请输入品番号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="品名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入品名"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="责任部门/厂家" prop="dutyDept">
                    <duty-select placeholder="请输入责任部门/厂家" :default-value="form.dutyDept" @change="(data) => {$set(form, 'dutyDept', data)}"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="机型" prop="apparatusType">
                    <el-select v-model="form.apparatusType" placeholder="请选择机型" style="width: 100%;">
                      <el-option
                        v-for="item in apparatusTypeDict"
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
                  <el-form-item label="发现数量" prop="findQuantity">
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="form.findQuantity"  placeholder="请输入发现数量"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发现时间" prop="findTime">
                    <el-date-picker
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      style="width: 100%;"
                      v-model="form.findTime"
                      type="date"
                      placeholder="请选择发现时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="不良内容" prop="content">
                <el-input v-model="form.content"   placeholder="请输入不良内容"></el-input>
              </el-form-item>
              <el-form-item label="拜托事项" prop="pleaseContent">
                <el-input v-model="form.pleaseContent"
                          type="textarea"
                          :rows="4"
                          resize="none"
                          placeholder="请输入拜托事项"></el-input>
              </el-form-item>
              <el-form-item label="测量结果" prop="testResult">
                <el-input v-model="form.testResult"
                          type="textarea"
                          :rows="6"
                          resize="none"
                          placeholder="请输入测量结果"></el-input>
              </el-form-item>
              <el-form-item label="关联部件确认(性能，作业等影响)" prop="correlationConfirm">
                <el-input v-model="form.correlationConfirm"
                          type="textarea"
                          :rows="4"
                          resize="none"
                          placeholder="请输入关联部件确认"></el-input>
              </el-form-item>
              <el-form-item label="不良图示/测定报告(最多5张图片)" prop="imgReportIds">
                <file-image-upload :file-list.sync="form.imgReportIds" :limit="5"/>
              </el-form-item>
              <el-form-item label="图片特殊说明" prop="imgRemark">
                <el-input v-model="form.imgRemark"></el-input>
              </el-form-item>
              <el-form-item label="不良测定报告" prop="testReportFileId">
                <file-upload :file.sync="form.testReportFileId"/>
              </el-form-item>
            </div>
          </div>

          <div style="font-weight: 700; margin-top: 100px; margin-left: 100px;">临时处理 <span style="color: #C0C4CC; font-weight: 100;">判断人: (xxA xxB不良临时对策方案必须经过科长以上认可)</span></div>
          <div style="width: 90%; margin-top: 30px;">
            <div  style="width: 70%;  min-width: 900px; margin: 0 auto;">
              <el-form-item label="流出防止" prop="banOutflowRemark">
                <el-input v-model="form.banOutflowRemark" placeholder="请输入流出防止"></el-input>
              </el-form-item>
              <el-form-item label="不良追溯" prop="formRemark">
                <el-input v-model="form.formRemark"  placeholder="请输入不良追溯"></el-input>
              </el-form-item>
              <el-form-item label="生产对应" prop="productRemark">
                <el-input v-model="form.productRemark" placeholder="请输入生产对应"></el-input>
              </el-form-item>
              <el-form-item label="异常件的返修方法, 关联部品的更换, 返修完毕的确认" prop="rebackFixConfirm">
                <el-input v-model="form.rebackFixConfirm"
                          type="textarea"
                          :rows="4"
                          resize="none" placeholder="请输入异常件的返修方法, 关联部品的更换, 返修完毕的确认"></el-input>
              </el-form-item>
              <el-form-item label="不良排查及隔离" prop="separateFileId">
                <file-drag-upload :file.sync="form.separateFileId"/>
              </el-form-item>
              <el-form-item label="不良排查及隔离附件" prop="separateFileDependId">
                <file-upload :file.sync="form.separateFileDependId"/>
              </el-form-item>
              <el-form-item label="变化点" prop="changeRemark">
                <el-input v-model="form.changeRemark"
                          type="textarea"
                          :rows="4"
                          resize="none" placeholder="请输入变化点"></el-input>
              </el-form-item>
              <el-form-item label="是否发行业务通知书" prop="isBusinessFile">
                <el-radio v-model="form.isBusinessFile" :label="1">是</el-radio>
                <el-radio v-model="form.isBusinessFile" :label="0">否</el-radio>
              </el-form-item>
              <el-form-item label="相关附件" prop="busincessIdFiles" >
                <div>
                  <file-mult-upload :file-list.sync="form.busincessIdFiles" @upload="handlerBusincessUpload"/>
                  <el-table
                    :key="tableUpdate"
                    :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
                    :cell-style="{'textAlign': 'center'}"
                    :data="form.busincessIdFiles"
                    border
                    height="250"
                    style="width: 100%; margin-top: 10px;">
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
              </el-form-item>
            </div>
          </div>

        </el-form>
        <div style="display: flex; justify-content: center; margin-top: 40px;">
          <div>
            <el-button size="small" @click="handlerClose">取消</el-button>
          </div>
          <div style="margin-left: 40px;">
            <el-button type="primary" size="small" @click="handlerSubmit">提交</el-button>
          </div>
        </div>
        <div style="height: 30px"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import FileImageUpload from "../../../../components/file/file-image-upload";
  import FileUpload from "../../../../components/file/file-upload";
  import {processLowDetail, processLowSave} from "../../../../api/business/process_low/process_low";
  import FileMultUpload from "../../../../components/file/file-mult-upload";
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import FileDragUpload from "../../../../components/file/file-drag-upload";
  import DutySelect from "../../components/duty_select";
  export default {
    name: "processLowSaveContent",
    components: {DutySelect, FileDragUpload, FixColorTitle, FileMultUpload, FileUpload, FileImageUpload},
    data() {
      return {
        form: {},
        rules: {
          title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
          type: [{ required: true, message: '请输入不良分类', trigger: 'blur' },],
          level: [{ required: true, message: '请选择不良等级', trigger: 'blur' },],
          designation: [{ required: true, message: '请输入品番号', trigger: 'blur' },],
          name: [{ required: true, message: '请输入品名', trigger: 'blur' },],
          dutyDept: [{ required: true, message: '请输入责任部门/厂家', trigger: 'blur' },],
          apparatusType: [{ required: true, message: '请选择机型', trigger: 'blur' },],
          findQuantity: [{ required: true, message: '请输入发现数量', trigger: 'blur' },],
          findTime: [{ required: true, message: '请选择发现时间', trigger: 'blur' },],
          content: [{ required: true, message: '请输入不良内容', trigger: 'blur' },],
          pleaseContent: [{ required: true, message: '请输入拜托事项', trigger: 'blur' },],
          testResult: [{ required: true, message: '请输入测量结果', trigger: 'blur' },],
          correlationConfirm: [{ required: true, message: '请输入关联部件确认', trigger: 'blur' },],
          banOutflowRemark: [{ required: true, message: '请输入流出防止', trigger: 'blur' },],
          formRemark: [{ required: true, message: '请输入不良追溯', trigger: 'blur' },],
          productRemark: [{ required: true, message: '请输入生产对应', trigger: 'blur' },],
          separateFileId: [{ required: true, message: '请上传不良排查及隔离文件', trigger: 'blur' },],
          changeRemark: [{ required: true, message: '请输入变化点', trigger: 'blur' },],
          imgReportIds: [{ required: true, message: '请上传不良图示/测定报告(', trigger: 'blur' },],
          triggerAddress: [{ required: true, message: '请选择发生地点', trigger: 'blur' },],
          triggerProcess: [{ required: true, message: '请选择发生工序', trigger: 'blur' },],
          isBusinessFile: [{ required: true, message: '请选择是否发行业务通知书', trigger: 'blur' },],
        },
        levelDict: [
          {value: 0, label: "R"},
          {value: 1, label: "S"},
          {value: 2, label: "A"},
          {value: 3, label: "B"},
          {value: 4, label: "C"},
          {value: 5, label: "批量"},
          {value: 6, label: "停线"},
        ],
        apparatusTypeDict: [
          {value: 0, label: "TNGA2.0"},
        ],
        triggerAddressDict: [
          {value: 0, label: "TNGA#1"},
          {value: 1, label: "TNGA#2"},
          {value: 2, label: "TNGA#3"},
          {value: 3, label: "TNGA#4"},
          {value: 4, label: "TNGA#5"},
          {value: 5, label: "TNGA#6"},
        ],
        triggerProcessDict: [
          {value: 0, label: "铸造钢体"},
          {value: 1, label: "铸造缸盖"},
          {value: 2, label: "缸盖加工"},
          {value: 3, label: "缸体加工"},
          {value: 4, label: "曲轴加工"},
          {value: 5, label: "连杆加工"},
          {value: 6, label: "凸轮轴加工"},
        ],
        tableUpdate: 0,
        updateForm: 0,
      }
    },
    props: {
      id: {
        type: String,
      },
      isPublic: {
        type: Boolean,
        default: false,
      },
      isExistBorder: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      'form.isBusinessFile'(val) {
        // if (val === 1) {
        //   this.$set(this.rules, 'busincessIdFiles', [{ required: true, message: '请上传相关附件', trigger: 'blur' },]);
        //   this.updateForm++;
        // }else {
        //   this.rules.busincessIdFiles = null;
        // }
        // console.log(this.rules);
      },
      'form.busincessIdFiles'() {
        this.$forceUpdate();
      }
    },
    methods: {
      handlerClose() {
        if (this.isPublic) {
          this.$emit("close");
          return
        }
        this.$router.push({path: "/business/process_low/process_low_list"})
      },
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
      init() {
        this.loadInitProperties();
      },
      loadInitProperties() {
        if (!this.validatenull(this.id)) {
          processLowDetail(this.id).then(res => {
            let data = res.data.data;
            data.busincessIdFiles = this.validatenull(data.busincessFiles) ? null : data.busincessFiles;
            data.imgReportIds = this.validatenull(data.imgReportList) ? null : data.imgReportList;
            data.testReportFileId = this.validatenull(data.testReportFile) ? null : data.testReportFile;
            data.busincessIdFileName = null;
            data.separateFileId = this.validatenull(data.separateFile) ? null : data.separateFile;
            data.busincessIdFileName = null;
            data.separateFileDependId = this.validatenull(data.separateFileDepend) ? null : data.separateFileDepend;
            data.separateFileDependName = null;
            this.$set(this, 'form', res.data.data);
            // this.form = res.data.data;
          });
          return;
        }
        this.$set(this.form, "type", 0);
        this.$set(this.form, "isBusinessFile", 1);
      },
      handlerSubmit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return;
          }
          let formCopy = JSON.parse(JSON.stringify(this.form));

          if (!this.validatenull(this.form.imgReportIds)) {
            formCopy.imgReportIds = this.form.imgReportIds.map(item => item.id).join(",");
          }

          if (!this.validatenull(this.form.testReportFileId)) {
            formCopy.testReportFileId = this.form.testReportFileId.id;
            formCopy.testReportFileName = this.form.testReportFileId.name;
          }
          if (!this.validatenull(this.form.separateFileId)) {
            formCopy.separateFileId = this.form.separateFileId.id;
            formCopy.separateFileName = this.form.separateFileId.name;
          }

          if (!this.validatenull(this.form.separateFileDependId)) {
            formCopy.separateFileDependId = this.form.separateFileDependId.id;
            formCopy.separateFileDependName = this.form.separateFileDependId.name;
          }

          if (!this.validatenull(this.form.busincessIdFiles)) {
            formCopy.busincessIdFiles = this.form.busincessIdFiles.map(item => item.id).join(",");
          }

          this.save(formCopy);
        });
      },
      save(data) {
        if (this.isPublic) {
          this.$emit("save", data);
          return;
        }
        processLowSave(data).then(() => {
          this.$message({type: "success", message: "新增成功"});
          this.$router.push({path: "/business/process_low/process_low_list"})
        })
      },
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
