<template>
  <div>
    <el-form :model="form"
             ref="form"
             size="small"
             :rules="rules"
             label-width="120px">
      <el-form-item label="当前模板：">
        <div style="height: 200px; overflow: auto; border: 1px solid #E4E7ED; padding-left: 10px;">
          <div :key="loadIndex" v-html="content"></div>
        </div>
      </el-form-item>
      <el-form-item label="参数：">
        <div v-if="validatenull(detail.params)">
          无需填写
        </div>
        <div v-else style="height: 200px; overflow: auto;">
          <table style="width: 100%;">
            <col width="33%" />
            <col width="33%" />
            <col width="33%" />
            <tr v-for="(item, index) in detail.params" :key="index" >
              <td><span style="font-weight: 700; margin-right: 10px;">名称:</span> {{item.name}}</td>
              <td><span style="font-weight: 700; margin-right: 10px;">默认值: </span>{{item.defaultValue || "无默认值"}}</td>
              <td><span style="font-weight: 700">填充: </span><el-input v-model="item.newValue" style="width: 200px; margin-left: 10px;"/></td>
            </tr>
          </table>
        </div>
      </el-form-item>
      <el-form-item label="QQ邮箱：" prop="to">
        <div style="display: flex;">
          <search-input style="width: 300px" :loadOption="loadOption" @change="handlerChange"/>
          <div style="margin-left: 10px; font-size: 16px;">
            @qq.com
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import SearchInput from "../../../../components/search-input/search-input";
  import Cookies from 'js-cookie'
  import {detailEmail} from "../../../../api/business/email/email";
  export default {
    name: "emailTemplateTest",
    components: {SearchInput},
    props: {
      templateId: {
        type: String,
      },
      trigger: {
        type: Function,
      }
    },
    data() {
      return {
        form: {},
        rules: {
          to: [{required: true, message: '请输入QQ邮箱', trigger: 'blur'},],
        },
        detail: {},
        loadIndex: 0,
        content: "",
      }
    },
    watch: {
      detail: {
        handler() {
          this.content = this.getContent();
        },
        deep: true,
      }
    },
    methods: {
      getContent() {
        if (this.validatenull(this.detail)) {
          return "";
        }
        if (this.validatenull(this.detail.params)) {
          return this.detail.content;
        }
        let content = this.detail.content;
        for(let key in this.detail.params) {
          let item = this.detail.params[key];
          // 默认值 或者 新值都为空则跳过
          if (this.validatenull(item.defaultValue) && this.validatenull(item.newValue)) {
            continue;
          }

          // 新值 优先级更高
          let value = this.validatenull(item.newValue) ? item.defaultValue : item.newValue;
          let replace = `\\$\\{${item.name}\\}`;
          // 替换占位符
          content = content.replace(new RegExp(replace, 'g'), value);
        }
        return content;
      },
      handlerChange(value) {
        this.$set(this.form, 'to', value);
      },
      loadOption(value, page) {
        return new Promise((resolve) => {
          let emailTestJson = Cookies.get("emailTest");
          let emailTest = this.validatenull(emailTestJson) ? [] : JSON.parse(emailTestJson);

          let newData = [];
          if (this.validatenull(value)) {
            newData = emailTest;
          }else {
            newData = emailTest.filter(item => item.indexOf(value) !== -1);
          }
          let startIndex = (page.current - 1) * page.size;
          let endIndex = (page.current - 1) * page.size + page.size;
          if (startIndex > newData.length - 1) {
            resolve([]);
          }else {
            resolve(newData.splice(startIndex, endIndex));
          }
        })
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return;
          }
          this.form.content = Base64.encode(this.content);
          this.trigger(this.form);
        })
      },
      init() {
        detailEmail(this.templateId).then(res => {
          this.detail = res.data.data;
        });
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
