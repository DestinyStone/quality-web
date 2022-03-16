<template>
  <div>
    <div style="overflow: auto;" :style="{height: height + 'px'}">
      <fix-color-title>{{title}}</fix-color-title>
      <avue-form style="width: 80%; margin: 20px auto 0 auto;" ref="templateRef" v-model="form" :option="option">
        <template slot="content">
          <rich-text-editor
            :content="form.content"
            @onchange="form.content = $event"
          />
        </template>
        <template slot="params">
          <email-template-param
            ref="paramRef"
            :params="form.params"
            @change="form.params = $event"
          />
        </template>
      </avue-form>
    </div>
    <div style="display: flex; justify-content: center; padding: 20px;">
      <el-button  size="small" @click="$emit('close')">关 闭</el-button>
      <el-button type="primary" size="small" @click="save()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import RichTextEditor from "@/components/rich-text-editor";
import EmailTemplateParam from "./email_template_param";
import {detailEmail} from "../../../../api/business/email/email";
import FixColorTitle from "../../../../components/min/fix_color_title";
// import { getDetail } from "@/api/business/base/email_template";
export default {
  name: "emailTemplateUpdate",
  components: {
    FixColorTitle,
    RichTextEditor,
    EmailTemplateParam,
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
      windowHeight: 0,
      form: {},
      title: "新增邮件模板",
      option: {
        labelWidth: 120,
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "邮件标题",
            prop: "title",
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入邮件标题",
                trigger: "blur",
              },
            ],
          },
          {
            label: "邮件编码",
            prop: "code",
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入邮件编码",
                trigger: "blur",
              },
            ],
          },
          {
            label: "邮件内容",
            prop: "content",
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入邮件内容",
                trigger: "blur",
              },
            ],
          },
          {
            label: "邮件参数",
            prop: "params",
            span: 24,
            labelTip:
              "此参数可应用与邮件内容中。如存在邮件参数英文名'name'，默认值为'钢笔'，邮件内容设置为：'这是我的${name}。'。则最终的邮件内容为：'这是我的钢笔。'",
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
    // templateId: function () {
      // this.initData();
    // },
  },
  computed: {
    height() {
      return this.windowHeight - 240;
    }
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    save() {
      if (!this.$refs.paramRef.validate()) {
        this.$message.error("请先保存邮件参数");
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
        this.title = "更新邮件模板";
        detailEmail(this.templateId).then((res) => {
          this.form = res.data.data;
        });
      } else {
        this.title = "新增邮件模板";
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
