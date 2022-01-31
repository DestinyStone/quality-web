<template>
  <div>
    <el-form :model="form"
             ref="form"
             :rules="rules"
             label-width="120px">
      <el-form-item label="驳回原因" prop="backCause">
        <el-input v-model="form.backCause"
                  type="textarea"
                  :rows="4"
                  resize="none"
                  placeholder="驳回原因"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "approveReject",
    props: {
      bpmId: {
        type: String,
      },
      reject: {
        type: Function,
      }
    },
    data() {
      return {
        form: {},
        rules: {
          backCause: [{required: true, message: '请输入延迟说明', trigger: 'blur'},],
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
          this.reject(this.form);
        })
      }
    }
  }
</script>

<style scoped>

</style>
