<template>
  <basic-container>
    <fix-color-title>QPR录入</fix-color-title>
    <el-divider></el-divider>
    <div style="width: 90%;">
      <div style="width: 70%; min-width: 800px; margin: 0 auto; margin-top: 30px;">
        <el-form size="small" :model="form" :rules="rules" ref="form" label-width="240px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="品号" prop="designation">
            <el-input v-model="form.designation" placeholder="请输入品号"></el-input>
          </el-form-item>
          <el-form-item label="品名" prop="name">
            <el-input v-model="form.name" placeholder="请输入品名"></el-input>
          </el-form-item>
          <el-form-item label="机型" prop="apparatusType">
              <el-radio v-model="form.apparatusType" :label="0">TNGA2.0</el-radio>
          </el-form-item>
          <el-form-item label="供应商名称" prop="dutyDept">
            <el-input v-model="form.dutyDept" placeholder="供应商名称"></el-input>
          </el-form-item>
          <el-form-item label="不良发现日" prop="findTime">
            <el-date-picker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              v-model="form.findTime"
              type="date"
              placeholder="请选择发现时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="不良等级" prop="level">
            <el-radio v-model="form.level" :label="0">R</el-radio>
            <el-radio v-model="form.level" :label="1">S</el-radio>
            <el-radio v-model="form.level" :label="2">A</el-radio>
            <el-radio v-model="form.level" :label="3">B</el-radio>
            <el-radio v-model="form.level" :label="4">C</el-radio>
            <el-radio v-model="form.level" :label="5">批量</el-radio>
            <el-radio v-model="form.level" :label="6">停线</el-radio>
          </el-form-item>
          <el-form-item label="不良数量" prop="findQuantity">
            <el-input v-model="form.findQuantity" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入不良数量"></el-input>
          </el-form-item>
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
          <el-form-item label="不良品处理" prop="dispostType">
            <el-radio v-model="form.dispostType" :label="0">
              <div style="float: right; display: flex;">
                <div>
                  返还
                </div>
                <el-input :disabled="true" v-if="form.dispostType !== 0" size="mini" style="width: 80px; position: relative; top: -7px; margin-left: 10px;"/>
                <el-input :disabled="false"  v-if="form.dispostType === 0" oninput="value=value.replace(/[^\d]/g,'')" v-model="form.dispost" size="mini" style="width: 80px; position: relative; top: -7px; margin-left: 10px;"/>
              </div>
            </el-radio>
            <el-radio v-model="form.dispostType" :label="1">保留</el-radio>
            <el-radio v-model="form.dispostType" :label="2">废弃</el-radio>
            <el-radio v-model="form.dispostType" :label="3">
              <div style="float: right; display: flex;">
                <div>
                  其他
                </div>
                <el-input :disabled="true" v-if="form.dispostType !== 3" size="mini"
                          style="width: 150px; position: relative; top: -7px; margin-left: 10px;"/>
                <el-input :disabled="false"  v-if="form.dispostType === 3"  v-model="form.dispost" size="mini"
                          style="width: 150px; position: relative; top: -7px; margin-left: 10px;"/>
              </div>
            </el-radio>
          </el-form-item>
          <el-form-item label="事件概要" prop="eventRemark">
            <el-input
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="请输入事件概要"
              v-model="form.eventRemark">
            </el-input>
          </el-form-item>
          <el-form-item label="拜托事项" prop="pleaseContent">
            <el-input
              type="textarea"
              :rows="4"
              resize="none"
              placeholder="请输入拜托事项"
              v-model="form.pleaseContent">
            </el-input>
          </el-form-item>
          <el-form-item label="不良图片(注: 最多上次5张图片)" prop="imgReportIds">
            <file-image-upload :file-list.sync="form.imgReportIds" :limit="5"/>
          </el-form-item>
        </el-form>
        <div style="display: flex; justify-content: center; margin-top: 40px;">
          <div>
            <el-button size="small" @click="handlerClose">取消</el-button>
          </div>
          <div style="margin-left: 40px;">
            <el-button type="primary" size="small" @click="handlerSubmit">提交</el-button>
          </div>
        </div>
        <div style="height: 10px"></div>
      </div>
    </div>
  </basic-container>
</template>

<script>
  import FixColorTitle from "../../../components/min/fix_color_title";
  import FileImageUpload from "../../../components/file/file-image-upload";
  import {qprSave} from "../../../api/business/out_buy_low/qpr";
  export default {
    name: "outBuyLowSave",
    components: {FileImageUpload, FixColorTitle},
    data() {
      return {
        form: {},
        rules: {
          title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
          designation: [{ required: true, message: '请输入品番号', trigger: 'blur' },],
          name: [{ required: true, message: '请输入品名', trigger: 'blur' },],
          apparatusType: [{ required: true, message: '请选择机型', trigger: 'blur' },],
          dutyDept: [{ required: true, message: '请输入供应商名称', trigger: 'blur' },],
          findTime: [{ required: true, message: '请选择不良发现日', trigger: 'blur' },],
          level: [{ required: true, message: '请选择不良等级', trigger: 'blur' },],
          findQuantity: [{ required: true, message: '请输入不良数量', trigger: 'blur' },],
          triggerAddress: [{ required: true, message: '请选择发生地点', trigger: 'blur' },],
          dispostType: [{ required: true, message: '请选择不良品处理', trigger: 'blur' },],
          eventRemark: [{ required: true, message: '请输入事件概要', trigger: 'blur' },],
          pleaseContent: [{ required: true, message: '请输入拜托事项', trigger: 'blur' },],
          imgReportIds: [{ required: true, message: '请上传不良图片', trigger: 'blur' },],
        },
        triggerAddressDict: [
          {value: 0, label: "TNGA#1"},
          {value: 1, label: "TNGA#2"},
          {value: 2, label: "TNGA#3"},
          {value: 3, label: "TNGA#4"},
          {value: 4, label: "TNGA#5"},
          {value: 5, label: "TNGA#6"},
        ],
      }
    },
    watch: {
      'form.dispostType'() {
        this.$set(this.form, "dispost", "");
      }
    },
    props: {
      isUseOut: {
        type: Boolean,
        default: false,
      },
      save:{
        type: Function,
      },
      close: {
        type: Function,
      }
    },
    methods: {
      handlerClose() {
        if (this.isUseOut) {
          this.close();
          return;
        }
        this.$router.push({path: "/business/out_buy_low/out_buy_low_list"})
      },
      init() {
        this.loadProperties();
      },
      loadProperties() {
        this.$set(this.form, 'apparatusTypes', []);
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

          // if (!this.validatenull(this.form.apparatusTypes)) {
          //   formCopy.apparatusTypes = this.form.apparatusTypes.join(",");
          // }
          this.handlerSave(formCopy);
        });
      },
      handlerSave(data) {
        if (this.isUseOut) {
          this.save(data);
          return;
        }
        qprSave(data).then(() => {
          this.$message({type: "success", message: "新增成功"});
          this.$router.push({path: "/business/out_buy_low/out_buy_low_list"})
        })
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
