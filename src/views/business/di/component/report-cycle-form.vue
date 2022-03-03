<template>
  <el-form :model="form" :rules="rules" ref="form" size="small" label-width="120px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="上报对象:">
           全部供应商
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="零件范围:">
           所有外购件
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="上报周期:" prop="cycleType">
      <div style="display: flex;">
        <el-checkbox-group v-model="form.cycleType" @change="handlerChange">
          <el-checkbox :label="0">每月1号</el-checkbox>
          <el-checkbox :label="1">
            特定
            <el-date-picker
              :picker-options="pickerOptions"
              style="margin-left: 10px;"
              :disabled="!form.cycleType.find(item => item === 1)"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="form.cycleTime"
              type="date"
              placeholder="年/月/日">
            </el-date-picker>
          </el-checkbox>
          <el-checkbox :label="2">立即触发</el-checkbox>
        </el-checkbox-group>
        <div style="margin-left: 20px;">
          <el-tooltip class="item" effect="dark"  placement="top">
            <div style="cursor: pointer; color: #25a5f7;">
              规则
            </div>
            <div slot="content">
              <div>每月1号: 每月1号的00:00:00 触发 优先级最低</div>
              <div style="margin-top: 10px;">特定: 根据选定的当天00:00:00 触发, 优先级大于每月1号, 如勾选每月1号，则该月1号不会触发</div>
              <div style="margin-top: 10px;">立即触发: 当前时间立即触发 优先级最高</div>
            </div>
          </el-tooltip>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="超期提醒:" prop="pastType">
      <el-radio v-model="form.pastType" :label="0">立即提醒</el-radio>
      <el-radio v-model="form.pastType" :label="1">
        超期
        <el-select v-model="form.pastDay"  size="mini" style="width: 60px" >
          <el-option
            v-for="item in pastDayOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        天进行提醒
      </el-radio>
    </el-form-item>
  </el-form>
</template>

<script>
  import {diConfigDetail} from "../../../../api/business/di/di";

  export default {
    name: "reportCycleForm",
    props: {
      handlerSubmit: {
        type: Function,
        default: () => {},
      },
      resourceId: {
        type: String,
      },
      resourceType: {
        type: Number,
      },
      isInit: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      let cycleTypeValidator = (rule, value, callback) => {
        if (this.validatenull(value)) {
          return callback(new Error('请选择上报周期'));
        }
        let filter = value.find(item => item === 1);
        if (!this.validatenull(filter) && this.validatenull(this.form.cycleTime)) {
          return callback(new Error('请选择特定日期'));
        }
        return callback();
      }
      return {
        form: {},
        rules: {
          cycleType: [{validator: cycleTypeValidator, required: true, trigger: 'blur'},],
          pastType: [{required: true, message: '请选择上报周期', trigger: 'blur'},],
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() <Date.now();
          }
        },
        pastDayOption: [],
      }
    },
    methods: {
      submit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return;
          }
          let copy = JSON.parse(JSON.stringify(this.form));
          copy.cycleType = this.form.cycleType.join(",");
          this.handlerSubmit(copy);
        })
      },
      handlerChange(select) {
        let filter = select.find(item => item === 1);
        if (this.validatenull(filter)) {
          this.$set(this.form, 'cycleTime', null);
        }
      },
      init() {
        for(let i = 0; i<7; i++) {
          this.pastDayOption.push({label: i + 1, value: i + 1});
        }
        this.$set(this.form, 'cycleType', []);
        this.$set(this.form, 'pastDay', 1);
        if (this.isInit) {
          diConfigDetail(this.resourceId, this.resourceType).then(res => {
            let form = res.data.data;
            if (!this.validatenull(form)) {
              this.form = form;
              this.$set(this.form, 'cycleType', this.form.cycleType.split(",").map(item => parseInt(item)));
            }
          })
        }
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
