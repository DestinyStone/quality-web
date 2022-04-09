<template>
  <avue-crud
    ref="crud"
    :option="option"
    :data="data"
    @row-update="rowSave"
    @row-add="rowAdd"
    @row-save="rowSave"
    @row-del="rowDel"
  >
    <template slot="menuLeft">
      <el-button @click="addRow" type="primary" size="small">新 增</el-button>
    </template>
  </avue-crud>
</template>

<script>
export default {
  props: {
    params: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.initData();
  },
  watch: {
    params: function () {
      this.initData();
    },
  },
  data() {
    return {
      data: [],
      option: {
        addBtn: false,
        cellBtn: true,
        columnBtn: false,
        refreshBtn: false,
        menuWidth: 250,
        height: 200,
        column: [
          {
            label: "参数中文名",
            prop: "label",
            cell: true,
            rules: [
              {
                required: true,
                message: "请输入姓名",
                trigger: "blur",
              },
            ],
          },
          {
            label: "参数英文名",
            prop: "name",
            cell: true,
            rules: [
              {
                required: true,
                message: "请输入姓名",
                trigger: "blur",
              },
            ],
          },
          {
            label: "默认值",
            prop: "defaultValue",
            cell: true,
          },
          {
            label: "备注",
            prop: "remark",
            maxLength: 50,
            cell: true,
          },
        ],
      },
    };
  },
  methods: {
    initData() {
      let data = this.params ? JSON.parse(JSON.stringify(this.params)) : [];
      data.forEach(item => item.id = null);
      this.data = data;
    },
    addRow() {
      if (!this.validate()) {
        this.$message.warning("请先保存上一次编辑的行");
      } else {
        this.data.push({
          $cellEdit: true,
        });
      }
    },
    rowSave(form, done) {
      done();
      this.change();
    },
    change() {
      this.$emit("change", this.data);
    },
    rowDel(row, index) {
      this.$confirm(`确认删除参数【${row.label}】?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.data.splice(index, 1);
          this.change();
        })
        .catch(() => {});
    },
    validate() {
      let valid = this.data.filter((row) => row.$cellEdit).length === 0;
      if (!valid) {
        this.$refs.crud.$refs.cellForm.validate();
      }
      return valid;
    },
  },
};
</script>

<style scoped>
</style>
