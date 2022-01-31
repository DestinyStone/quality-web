<template>
  <div>
    <el-form :model="form"
             ref="form"
             :rules="rules"
             label-width="120px">
      <el-form-item label="延迟说明" prop="remark">
        <el-input v-model="form.remark"
                  type="textarea"
                  :rows="4"
                  resize="none"
                  placeholder="请输入延迟说明"></el-input>
      </el-form-item>
      <el-form-item label="延期截止时间" prop="endTime">
        <el-date-picker
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          style="width: 100%;"
          v-model="form.endTime"
          type="date"
          placeholder="年/月/日">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "putOf",
    props: {
      bpmId: {
        type: String,
      },
      save: {
        type: Function,
      }
    },
    data() {
      return {
        form: {},
        rules: {
          remark: [{required: true, message: '请输入延迟说明', trigger: 'blur'},],
          endTime: [{required: true, message: '请选择延期截止时间', trigger: 'blur'},],
        }
      }
    },
    methods: {
      submit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return;
          }
          this.form.bpmId = this.bpmId;
          this.save(this.form);
        })
      }
    }
  }
</script>

<style scoped>

</style>
