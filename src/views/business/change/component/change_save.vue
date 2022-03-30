<template>
  <div>
    <basic-container v-loading="loading">
      <fix-color-title>工序内工变申请</fix-color-title>
      <el-divider></el-divider>
      <el-form :key="loadIndex" :model="form" :rules="rules" size="small" ref="form" label-width="240px" style="width: 90%; margin: 50px auto;">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机型" prop="type">
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
          <el-col :span="12">
            <el-form-item label="生产线" prop="type">
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
            <el-form-item label="工序号" prop="type">
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
          <el-col :span="12">
            <el-form-item label="设备号/刀具号" prop="type">
              <div style="display: flex;">
                <el-select v-model="form.level" placeholder="请选择设备号/刀具号" style="width: 250px;">
                  <el-option
                    v-for="item in levelDict"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input placeholder="设备号/刀具号" style="margin-left: 10px;"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="工变类型" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox :label="0">品质改善</el-checkbox>
            <el-checkbox :label="1">成本降低</el-checkbox>
            <el-checkbox :label="2">生产性提高</el-checkbox>
            <el-checkbox :label="3">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="主要变化点" prop="mainChangeType">
          <el-checkbox-group v-model="form.mainChangeType" style="display: flex; flex-flow: column">
            <el-checkbox :label="0">生产工序的新设或改善(设置新工序/新设, 改造设备, 机器, 模具)</el-checkbox>
            <el-checkbox :label="1">更换材料厂家, 零件厂家(外部供应商)</el-checkbox>
            <el-checkbox :label="2">加工, 组装方法，条件的变更</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="背景" prop="mainChangeType">
          <el-input  type="textarea" :rows="4" resize="none" placeholder="请输入背景"/>
        </el-form-item>
        <el-form-item label="变更内容" prop="mainChangeType">
          <el-input  type="textarea" :rows="4" resize="none" placeholder="请输入变更内容"/>
        </el-form-item>
        <el-form-item label="该部品的功能" prop="mainChangeType">
          <el-input  type="textarea" :rows="4" resize="none" placeholder="请输入该部品的功能"/>
        </el-form-item>
        <el-form-item label="该部品过完不良" prop="mainChangeType">
          <el-input  type="textarea" :rows="4" resize="none" placeholder="请输入该部品过完不良"/>
        </el-form-item>
        <el-form-item label="附件" prop="mainChangeType">
          <file-upload/>
        </el-form-item>
        <el-form-item label="归口部门担当, 系长" prop="mainChangeType">
          <change-save-user/>
        </el-form-item>
        <el-form-item label="实施确认部门, 系长" prop="mainChangeType">
          <change-save-user/>
        </el-form-item>
      </el-form>
      <div style="display: flex; justify-content: center; padding: 20px;">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary">提交</el-button>
      </div>
    </basic-container>
  </div>
</template>

<script>
  import FileUpload from "../../../../components/file/file-upload";
  import ChangeSaveUser from "./change_save_user";
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import ApprovelSelectDialog from "../../components/approver_select_dialog";
  import ChangeSaveUserForm from "./change_save_user_form";
  export default {
    name: "changeSave",
    components: {ChangeSaveUserForm, ApprovelSelectDialog, FixColorTitle, ChangeSaveUser, FileUpload},
    data() {
      return {
        showApproverSelectDialog: true,
        loading: false,
        loadIndex: 0,
        form: {},
        rules: {
          lineGroupType: [{ required: true, message: '请输入线组', trigger: 'blur' },],
          engineering: [{ required: true, message: '请选择工程', trigger: 'blur' },],
          trait: [{ required: true, message: '请选择特性', trigger: 'blur' },],
          mainTriggerCase: [{ required: true, message: '请想定不具合内容', trigger: 'blur' },],
          target: [{ required: true, message: '请选择目标', trigger: 'blur' },],
        },
        showBelongDialog: false,
        showExecutionDialog: false,
      }
    },
    created() {
      this.$set(this.form, 'type', []);
      this.$set(this.form, 'mainChangeType', []);
    }
  }
</script>

<style scoped>

</style>
