<template>
  <div>
    <basic-container v-loading="loading">
      <fix-color-title>工序内工变申请</fix-color-title>
      <el-divider></el-divider>
      <el-form :key="loadIndex" :model="form" :rules="rules" size="small" ref="form" label-width="150px" style="width: 90%; margin: 50px auto;">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机型" prop="apparatusType">
              <el-select v-model="form.apparatusType" placeholder="请选择机型" style="width: 100%;">
                <el-option
                  v-for="item in apparatusDict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产线" prop="productLine">
              <el-select multiple  v-model="form.productLine" placeholder="请选择生产线" style="width: 100%;">
                <el-option
                  v-for="item in productLineDict"
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
            <el-form-item label="工序号" prop="processType">
              <el-select v-model="form.processType" placeholder="请选择工序号" style="width: 100%;">
                <el-option
                  v-for="item in processDict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备号/刀具号" prop="utilType">
              <div style="display: flex;">
                <el-select v-model="form.utilType" placeholder="请选择设备号/刀具号" style="min-width: 180px;">
                  <el-option
                    v-for="item in utilDict"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input placeholder="设备号/刀具号" v-model="form.utilContent" style="margin-left: 10px;"/>
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
        <el-form-item label="背景" prop="background">
          <el-input  type="textarea" v-model="form.background" :rows="4" resize="none" placeholder="请输入背景"/>
        </el-form-item>
        <el-form-item label="变更内容" prop="changeContent">
          <el-input  type="textarea" v-model="form.changeContent" :rows="4" resize="none" placeholder="请输入变更内容"/>
        </el-form-item>
        <el-form-item label="该部品的功能" prop="mainChangeType">
          <el-input  type="textarea" v-model="form.mainFunction" :rows="4" resize="none" placeholder="请输入该部品的功能"/>
        </el-form-item>
        <el-form-item label="该部品过完不良" prop="mainChangeType">
          <el-input  type="textarea" v-model="form.mainLow" :rows="4" resize="none" placeholder="请输入该部品过完不良"/>
        </el-form-item>
        <el-form-item label="附件" prop="extendsFileIds">
          <div>
            <file-mult-upload :file-list.sync="form.extendsFileIds" @upload="handlerUpload"/>
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
                  <el-link :underline="false"  type="danger" @click="removeFiles(scope.row)">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
        <el-form-item label="归口部门担当, 系长" prop="belongUserIds">
          <change-save-user @select="item => setUserSelect('belongUserIds', item)" :get-list="getBelongList"/>
        </el-form-item>
        <el-form-item label="实施确认部门, 系长" prop="executionUserIds">
          <change-save-user @select="item => setUserSelect('executionUserIds', item)"/>
        </el-form-item>
      </el-form>
      <div style="display: flex; justify-content: center; padding: 20px;">
        <el-button size="small" @click="handlerClose">取消</el-button>
        <el-button size="small" type="primary" @click="handlerSubmit">提交</el-button>
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
  import FileMultUpload from "../../../../components/file/file-mult-upload";
  import {belongUserPage, detailChange} from "../../../../api/business/change/change";
  export default {
    name: "changeSave",
    components: {FileMultUpload, ChangeSaveUserForm, ApprovelSelectDialog, FixColorTitle, ChangeSaveUser, FileUpload},
    data() {
      return {
        showApproverSelectDialog: true,
        loading: false,
        loadIndex: 0,
        form: {},
        rules: {
          apparatusType: [{ required: true, message: '请选择机型', trigger: 'blur' },],
          productLine: [{ required: true, message: '请选择生产线', trigger: 'blur' },],
          processType: [{ required: true, message: '请选择工序号', trigger: 'blur' },],
          utilType: [{ required: true, message: '请选择设备型号', trigger: 'blur' },],
          type: [{ required: true, message: '请选择工变类型', trigger: 'blur' },],
          mainChangeType: [{ required: true, message: '请选择主要变化点', trigger: 'blur' },],
          background: [{ required: true, message: '请输入背景', trigger: 'blur' },],
          changeContent: [{ required: true, message: '请输入变更内容', trigger: 'blur' },],
          belongUserIds: [{ required: true, message: '归口部门担当, 系长', trigger: 'blur' },],
          executionUserIds: [{ required: true, message: '实施确认担当, 系长', trigger: 'blur' },],
        },
        tableUpdate: 0,
        showBelongDialog: false,
        showExecutionDialog: false,
        apparatusDict: [
          {label: "TNGA1.5", value: 0},
          {label: "TNGA2.0", value: 1},
          {label: "NR", value: 2},
          {label: "AZ", value: 3},
        ],
        productLineDict:  [
          {label: "TNGA#1", value: 0},
          {label: "TNGA#2", value: 1},
          {label: "TNGA#3", value: 2},
          {label: "TNGA#4", value: 3},
          {label: "TNGA#5", value: 4},
        ],
        processDict: [
          {label: "TNGA1.5", value: 0},
          {label: "TNGA2.0", value: 1},
          {label: "NR", value: 2},
          {label: "AZ", value: 3},
        ],
        utilDict: [
          {label: "MK设备", value: 0},
          {label: "C设备", value: 1},
          {label: "刀具", value: 2},
        ]
      }
    },
    props: {
      id: {
        type: String
      },
      close: {
        type: Function,
        default() {
          return () => {}
        }
      },
      submit: {
        type: Function,
        default() {
          return () => {}
        }
      },
    },
    created() {
      this.init();
    },
    methods: {
      getBelongList(current, size, params) {
        return belongUserPage(current, size, params);
      },
      init() {
        this.$set(this.form, 'productLine', []);
        this.$set(this.form, 'type', []);
        this.$set(this.form, 'mainChangeType', []);
        this.$set(this.form, 'extendsFileIds', []);
        if (this.id) {
          detailChange(this.id).then(res => {
            this.form = res.data.data;
            this.$set(this.form, 'productLine', this.form.productLine.split(",").map(item => parseInt(item)));
            this.$set(this.form, 'type', this.form.type.split(",").map(item => parseInt(item)));
            this.$set(this.form, 'mainChangeType', this.form.mainChangeType.split(",").map(item => parseInt(item)));
            this.$set(this.form, 'extendsFileIds', this.form.extendsFile);
          });
          return;
        }
      },
      handlerClose() {
        this.close();
      },
      handlerSubmit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return;
          }
          let copy = JSON.parse(JSON.stringify(this.form));
          copy.productLine = copy.productLine.join(",");
          copy.type = copy.type.join(",");
          copy.mainChangeType = copy.mainChangeType.join(",");
          copy.extendsFileIds = copy.extendsFileIds.map(item => item.id).join(",");
          copy.belongUserIds = copy.belongUserIds.map(item => item.id).join(",");
          copy.executionUserIds = copy.executionUserIds.map(item => item.id).join(",");
          this.submit(copy);
        })
      },
      setUserSelect(prop, select) {
        this.$set(this.form, prop, select);
      },
      removeFiles(row) {
        this.$confirm("是否删除改文件?", "提示", {confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"}).then(() => {
          for(let key in this.form.extendsFileIds) {
            let item = this.form.extendsFileIds[key];
            if (item.id === row.id) {
              this.form.extendsFileIds.splice(key, 1);
              break;
            }
          }

          this.handlerUpload();
        });
      },
      handlerUpload() {
        this.tableUpdate++;
      }
    }
  }
</script>

<style scoped>

</style>
