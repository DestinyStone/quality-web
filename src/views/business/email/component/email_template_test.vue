<template>
  <div>
    <el-form :model="form"
             ref="form"
             size="small"
             :rules="rules"
             label-width="120px">
      <el-form-item label="当前模板：">
        <div style="position:relative;">
          <div style="height: 200px; overflow-x: auto;: auto; border: 1px solid #E4E7ED; padding-left: 10px; ">
            <div :key="loadIndex" v-html="detail.content"></div>
          </div>
          <div style="position:absolute; right: -40px; top: 0; cursor: pointer; color: #25a5f7;" @click="showPrefix = true">预览</div>
        </div>
      </el-form-item>
      <el-form-item label="参数：">
        <div v-if="validatenull(detail.params)">
          无需填写
        </div>
        <div v-else style="height: 200px; overflow: auto;">
          <table style="width: 100%;">
            <col width="20%" />
            <col width="33%" />
            <col width="33%" />
            <tr v-for="(item, index) in detail.params" :key="index" >
              <td><span style="font-weight: 700; margin-right: 10px;">名称:</span> {{item.name}}</td>
              <td style="display: flex;"><span style="font-weight: 700; margin-right: 10px; white-space: nowrap;">默认值: </span><tooltop-text :limit="30" :text="item.defaultValue || '无默认值'"></tooltop-text></td>
              <td><span style="font-weight: 700">填充: </span><el-input v-model="item.newValue" style="max-width: 200px;margin-left: 10px;"/></td>
            </tr>
          </table>
        </div>
      </el-form-item>
      <el-form-item label="QQ邮箱：" prop="to">
        <div style="display: flex;">
          <search-input ref="searchInput" style="width: 300px" :loadOption="loadOption" @change="handlerChange"/>
          <div style="margin-left: 10px; font-size: 16px; display: flex;">
            <div>@qq.com</div>
            <div style="margin-left: 20px; cursor: pointer; color: #25a5f7;" @click="showUserDialog = true">选择用户</div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <email-template-prefix :content="content" :show.sync="showPrefix"/>
    <user-select-dialog :show.sync="showUserDialog" @select="handlerSelectUser"/>
  </div>
</template>

<script>
  import SearchInput from "../../../../components/search-input/search-input";
  import Cookies from 'js-cookie'
  import {detailEmail} from "../../../../api/business/email/email";
  import EmailTemplatePrefix from "./email_template_prefix";
  import TooltopText from "../../../../components/min/tooltop-text";
  import UserSelectDialog from "../../components/user-select-dialog";
  export default {
    name: "emailTemplateTest",
    components: {UserSelectDialog, TooltopText, EmailTemplatePrefix, SearchInput},
    props: {
      templateId: {
        type: String,
      },
      trigger: {
        type: Function,
      }
    },
    data() {
      let validateTo = (rule, value, callback) => {
        if (this.validatenull(value)) {
          return callback(new Error('请输入QQ邮箱'));
        }
;
        if (value.length < 7 || value.length > 10) {
          return callback(new Error('请输入正确的QQ邮箱'));
        }
        return callback();
      };
      return {
        showPrefix: false,
        form: {},
        rules: {
          // to: [{validator: validateTo, required: true, trigger: 'blur'},],
        },
        detail: {},
        loadIndex: 0,
        content: "",
        showUserDialog: false,
        reloadSearchInput: 0,
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
      handlerSelectUser(data) {
        let email = "";
        if (!this.validatenull(data.email)) {
          email = data.email.slice(0, data.email.length - 7);
        }
        this.showUserDialog = false;
        this.$set(this.form, 'to', email);
        this.$refs['searchInput'].setValue(email);
      },
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
