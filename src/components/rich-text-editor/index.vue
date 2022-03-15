<template>
  <div
    :class="['rich-text-editor', border ? 'border' : '']"
    :style="{
      width: isNaN(Number(width)) ? width : width + 'px',
    }"
  >
    <div ref="toobar" class="editor-bar"></div>
    <div
      ref="editor"
      class="editor-content"
      :style="{
        height: isNaN(Number(height)) ? height : height + 'px',
      }"
    ></div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  props: {
    content: {
      type: String,
      default: null,
    },
    zIndex: {
      type: Number,
      default: 10,
    },
    height: {
      type: String,
      default: "300",
    },
    width: {
      type: String,
      default: "100%",
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      value: null,
      editor: null,
    };
  },
  watch: {
    content: function (value) {
      if (value != this.value) {
        this.editor.txt.html(value);
      }
    },
  },
  mounted() {
    var editor = (this.editor = new E(this.$refs.toobar, this.$refs.editor));
    // 自定义菜单配置
    editor.config.zIndex = this.zIndex;
    editor.config.height = this.height;
    editor.config.onchange = (value) => {
      this.value = value;
      this.$emit("onchange", value);
    };
    editor.create();
    editor.txt.html(this.content);
  },
  methods: {},
};
</script>

<style scoped>
.rich-text-editor {
  width: 100%;
}

.rich-text-editor .editor-bar,
.rich-text-editor .editor-content {
  width: 100%;
  flex: 0;
}

.rich-text-editor.border {
  border: 1px solid #c9d8db;
}

.rich-text-editor.border .editor-bar {
  border-bottom: 1px solid #eee;
}
</style>
