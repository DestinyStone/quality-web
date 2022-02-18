<template>
  <basic-container class="check-submit">
    <div :style="{height: height + 'px'}" style="overflow: auto;">
      <div style="display: flex; justify-content: space-between;">
        <fix-color-title>
          <div style="display: flex; justify-content: space-between;">
            <div>检查法确认书</div>
          </div>
        </fix-color-title>
      </div>
      <el-divider></el-divider>
      <div>
        <el-form style="width: 80%; margin: 0 auto;"  :model="form" size="small" :rules="rules" ref="form" label-width="180px">
          <el-form-item label="种类" prop="type">
            <el-radio v-model="form.type" :label="0">新规格</el-radio>
            <el-radio v-model="form.type" :label="1">工变</el-radio>
            <el-radio v-model="form.type" :label="2">设变</el-radio>
            <el-radio v-model="form.type" :label="3">写误订正</el-radio>
            <el-radio v-model="form.type" :label="4">只变更检查法方法</el-radio>
          </el-form-item>
          <el-form-item label="要求确认的主要内容" prop="confirmContent">
            <el-input type="textarea" :rows="4" resize="none" v-model="form.confirmContent"/>
          </el-form-item>
          <el-form-item label="新规格及变更内容" prop="changeContent">
            <el-input type="textarea" :rows="4" resize="none" v-model="form.changeContent"/>
          </el-form-item>
          <el-form-item label="新规格及变更图片" prop="changeImageId">
            <file-drag-upload :file.sync="form.changeImageId"/>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="相关部门意见" prop="deptIdea">
                <el-input type="textarea" :rows="4" resize="none" v-model="form.deptIdea"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查管理部门意见" prop="checkDeptIdea">
                <el-input type="textarea" :rows="4" resize="none" v-model="form.checkDeptIdea"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="检查法文件" prop="checkFile">
            <table class="check-file-table" style="width: 100%; text-align: center; border-collapse:collapse;">
              <tr>
                <td>供应商承认零件检查法EXCEL文件</td>
                <td>供应商承认零件检查法签字文件</td>
              </tr>
              <tr>
                <td>
                  <file-upload :file.sync="form.providerExcelFileId"/>
                </td>
                <td>
                  <file-upload :file.sync="form.providerSignatureId"/>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item label="相关附件" >
            <div>
              <file-mult-upload :file-list.sync="form.extendsFileIds" @upload="handlerBusincessUpload"/>
              <el-table
                :key="tableUpdate"
                :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
                :cell-style="{'textAlign': 'center'}"
                :data="form.extendsFileIds"
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
        </el-form>
      </div>
      <div style="display: flex; justify-content: center; padding: 40px;">
        <div>
          <el-button size="small" @click="$emit('cancel')">取消</el-button>
          <el-button size="small" type="primary" @click="handlerSave">新增</el-button>
        </div>
      </div>
    </div>
  </basic-container>
</template>

<script>
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import TitleContainer from "../../work/component/title-container";
  import FileImageUpload from "../../../../components/file/file-image-upload";
  import FileMultUpload from "../../../../components/file/file-mult-upload";
  import FileUpload from "../../../../components/file/file-upload";
  import FileDragUpload from "../../../../components/file/file-drag-upload";
  export default {
    name: "checkSubmit",
    components: {FileDragUpload, FileUpload, FileMultUpload, FileImageUpload, TitleContainer, FixColorTitle},
    props: {
      save: {
        type: Function,
      }
    },
    data() {
      let validateCheckFile = (rule, value, callback) => {
        console.log(this.form);
        if (this.validatenull(this.form.providerExcelFileId) && this.validatenull(this.form.providerSignatureId)) {
          callback(new Error('请上次供应商承认零件检查法EXCEL文件和签字文件'));
          return;
        }
        if (this.validatenull(this.form.providerExcelFileId)) {
          callback(new Error('请上次供应商承认零件检查法EXCEL文件'));
          return;
        }
        if (this.validatenull(this.form.providerSignatureId)) {
          callback(new Error('请上次供应商承认零件检查法签字文件'));
          return;
        }
        callback();
      };
      return {
        data: {},
        windowHeight: 0,
        form: {},
        rules: {
          type: [{required: true, message: '请输入种类', trigger: 'blur'},],
          confirmContent: [{required: true, message: '请输入确认的主要内容', trigger: 'blur'},],
          changeContent: [{required: true, message: '请输入新规格及变更内容', trigger: 'blur'},],
          changeImageId: [{required: true, message: '请输入新规格及变更图片', trigger: 'blur'},],
          deptIdea: [{required: true, message: '请输入相关部门意见', trigger: 'blur'},],
          checkDeptIdea: [{required: true, message: '请输入检查管理部门意见', trigger: 'blur'},],
          checkFile: [{validator: validateCheckFile, trigger: 'blur'},],
        },
        tableUpdate: 0,
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      height() {
        return this.windowHeight - 180;
      }
    },
    methods: {
      handlerBusincessUpload() {
        this.tableUpdate++;
      },
      handlerReback() {
        this.$emit("reback");
      },
      handlerSave() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return;
          }
          let copy = JSON.parse(JSON.stringify(this.form));

          if (!this.validatenull(this.form.changeImageId)) {
            copy.changeImageId = this.form.changeImageId.id;
          }

          if (!this.validatenull(this.form.providerExcelFileId)) {
            copy.providerExcelFileId = this.form.providerExcelFileId.id;
            copy.providerExcelFileName = this.form.providerExcelFileId.name;
          }

          if (!this.validatenull(this.form.providerSignatureId)) {
            copy.providerSignatureId = this.form.providerSignatureId.id;
            copy.providerSignatureName = this.form.providerSignatureId.name;
          }

          if (!this.validatenull(this.form.extendsFileIds)) {
            copy.extendsFileIds = this.form.extendsFileIds.map(item => item.id).join(",");
          }

          this.save(copy);
        })
      }
    }
  }
</script>

<style scoped>
  .check-submit .check-file-table td {
    border: 1px solid #EBEEF5;
  }
</style>
