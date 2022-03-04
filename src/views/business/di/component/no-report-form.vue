<template>
  <div>
    <el-form :model="form"
             ref="form"
             :rules="rules"
             label-width="0px">
      <el-form-item label="" prop="noReportRemark">
        <el-input v-model="form.noReportRemark"
                  type="textarea"
                  :rows="4"
                  resize="none"
                  placeholder="请填写无需上报说明"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "noReportForm",
    props: {
      trigger: {
        type: Function,
      }
    },
    data() {
      return {
        form: {},
        rules: {
          noReportRemark: [{required: true, message: '请填写无需上报说明', trigger: 'blur'},],
        }
      }
    },
    methods: {
      submit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return;
          }
          this.trigger(this.form);
        })
      }
    }
  }
</script>

<style scoped>

</style>
