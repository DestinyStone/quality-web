<template>
  <div>
    <div style="overflow-y: auto;" :style="{height: height + 'px'}">
      <fix-color-title>{{title}}</fix-color-title>
      <div style="width: 80%;  margin: 20px auto 0 auto;">
        <avue-form ref="templateRef" v-model="form" :option="option">
          <template slot="content">
            <el-input v-model="form.content" placeholder="请输入短信内容" type="textarea" :rows="4" resize="none"/>
<!--            <div style=" cursor: pointer; color: #25a5f7;" @click="showPrefix = true">预览</div>-->
<!--            <rich-text-editor-->
<!--              :content="form.content"-->
<!--              @onchange="form.content = $event"-->
<!--            />-->
          </template>
          <template slot="params">
            <phone-template-param
              ref="paramRef"
              :params="form.params"
              @change="form.params = $event"
            />
          </template>
        </avue-form>
      </div>
    </div>
    <div style="display: flex; justify-content: center;">
      <el-button  size="small" @click="$emit('close')">关 闭</el-button>
      <el-button type="primary" size="small" @click="save()">确 定</el-button>
    </div>
<!--    <email-template-prefix :show.sync="showPrefix" :content="content"/>-->
  </div>
</template>

<script>
import RichTextEditor from "@/components/rich-text-editor";
import PhoneTemplateParam from "./phone_template_param";
import {detailEmail} from "../../../../api/business/email/email";
import FixColorTitle from "../../../../components/min/fix_color_title";
import {detailPhone} from "../../../../api/business/phone/phone";
// import { getDetail } from "@/api/business/base/email_template";
export default {
  name: "phoneTemplateUpdate",
  components: {
    FixColorTitle,
    RichTextEditor,
    PhoneTemplateParam,
  },
  props: {
    show: {
      // 是否显示弹窗
      type: Boolean,
      default: false,
    },
    templateId: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      content: false,
      showPrefix: false,
      windowHeight: 0,
      form: {},
      title: "新增短信模板",
      option: {
        labelWidth: 120,
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "短信标题",
            prop: "title",
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入短信标题",
                trigger: "blur",
              },
            ],
          },
          {
            label: "短信编码",
            prop: "code",
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入短信编码",
                trigger: "blur",
              },
            ],
          },
          {
            label: "短信内容",
            prop: "content",
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入短信内容",
                trigger: "blur",
              },
            ],
          },
          {
            label: "短信参数",
            prop: "params",
            span: 24,
            labelTip:
              "此参数可应用与短信内容中。如存在短信参数英文名'name'，默认值为'钢笔'，短信内容设置为：'这是我的${name}。'。则最终的短信内容为：'这是我的钢笔。'",
          },
          {
            label: "备注",
            type: "textarea",
            prop: "remark",
            span: 24,
            maxLength: 100,
            rules: [
              {
                message: "请输入备注",
                trigger: "blur",
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.initData();
    this.windowHeight = document.body.clientHeight;
  },
  watch: {
    form: {
      handler() {
        this.content = this.getContent();
      },
      deep: true,
    }
  },
  computed: {
    height() {
      return this.windowHeight - 200;
    }
  },
  methods: {
    getContent() {
      if (this.validatenull(this.form)) {
        return "";
      }
      if (this.validatenull(this.form.params)) {
        return this.form.content;
      }
      let content = this.form.content;
      for(let key in this.form.params) {
        let item = this.form.params[key];
        // 默认值 或者 新值都为空则跳过
        if (this.validatenull(item.defaultValue)) {
          continue;
        }

        // 新值 优先级更高
        let replace = `\\$\\{${item.name}\\}`;
        // 替换占位符
        content = content.replace(new RegExp(replace, 'g'), item.defaultValue);
      }
      return content;
    },
    handleClose() {
      this.$emit("close");
    },
    save() {
      if (!this.$refs.paramRef.validate()) {
        this.$message.error("请先保存短信参数");
        return;
      }
      this.$refs.templateRef.validate((success, done) => {
        if (!success) {
          return;
        }
        if (!this.templateId) {
          this.$emit("save", { ...this.form });
          done();
        }else {
          this.$emit("update", { ...this.form });
        }
      });
    },
    initData() {
      if (this.templateId) {
        this.title = "更新短信模板";
        detailPhone(this.templateId).then((res) => {
          this.form = res.data.data;
        });
      } else {
        this.title = "新增短信模板";
        this.form = {};
      }
    },
  },
  created() {
    this.initData();
  }
};
</script>

<style scoped>
</style>
