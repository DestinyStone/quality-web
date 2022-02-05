<template>
  <div>
    <el-form :model="form"
             ref="form"
             :rules="rules"
             label-width="120px">
      <el-form-item label="催办内容" prop="content">
        <el-input v-model="form.content"
                  type="textarea"
                  :rows="4"
                  resize="none"
                  placeholder="请输入催办内容"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "approveUrge",
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
          content: [{required: true, message: '请输入催办内容', trigger: 'blur'},],
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
