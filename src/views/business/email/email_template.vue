<template>
  <basic-container class="email-template">
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      :page.sync="page"
      :permission="permissionList"
      :before-open="beforeOpen"
      v-model="form"
      ref="crud"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @row-del="rowDel"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @refresh-change="refreshChange"
      @on-load="onLoad"
    >
      <template slot="menuLeft">
        <el-button
          size="small"
          type="primary"
          @click="(showUpdateDialog = true), (form = {})"
          >新 增
        </el-button>
        <el-button
          size="small"
          type="warning"
          @click="(showUpdateDialog = true), (form = {})"
        >测 试
        </el-button>
      </template>
      <template slot-scope="{ type, size, row }" slot="menu">
        <el-button
          :size="size"
          :type="type"
          @click="updateClick(row)"
          >编 辑</el-button
        >
        <el-button
          v-if="row.status === 0"
          :size="size"
          :type="type"
          @click="enable(row)"
        >启 用</el-button
        >
        <el-button
          v-if="row.status === 1"
          :size="size"
          :type="type"
          class="danger"
          @click="disable(row)"
        >禁 用</el-button
        >
      </template>
    </avue-crud>
    <email-template-update
      :show="showUpdateDialog"
      :template-id="form.id"
      @close="handleClose"
      @save="saveTemplate"
    />
  </basic-container>
</template>

<script>
// import {
//   getList,
//   getDetail,
//   remove,
//   add,
//   enable,
//   disable,
// } from "@/api/business/base/email_template";
import { mapGetters } from "vuex";
import { Base64 } from "js-base64";
import {emailPage} from "../../../api/business/email/email";
import EmailTemplateUpdate from "./component/email_template_update";
export default {
  name: "emailTemplate",
  components: {EmailTemplateUpdate},
  data() {
    return {
      form: {},
      query: {},
      loading: true,
      showUpdateDialog: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectionList: [],
      option: {
        cellBtn: false,
        columnBtn: false,
        refreshBtn: false,
        height: "auto",
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: false,
        selection: true,
        column: [
          {
            label: "邮件标题",
            prop: "title",
            labelWidth: "20%",
            search: true,
          },
          {
            label: "邮件编码",
            prop: "code",
            labelWidth: "20%",
          },
          {
            label: "状态",
            type: "select",
            prop: "status",
            dicData: [
              {
                label: "已启用",
                value: 1,
              },
              {
                label: "已禁用",
                value: 0,
              },
            ],
            slot: true,
            search: true,
          },
        ],
      },
      data: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: false,
        viewBtn: false,
        delBtn: false,
        editBtn: false,
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    enable(row) {
      this.$confirm(`确认启用【${row.title}】?`, "提示", {
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          enable(row.id).then(() => {
            this.onLoad(this.page);
            this.$message.success("启用成功");
          });
        })
        .catch(() => {});
    },
    disable(row) {
      this.$confirm(`确认禁用【${row.title}】?`, "提示", {
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          disable(row.id).then(() => {
            this.onLoad(this.page);
            this.$message.success("禁用成功");
          });
        })
        .catch(() => {});
    },
    updateClick(row) {
      getDetail(row.id).then((res) => {
        this.showUpdateDialog = true;
        this.form = res.data.data;
      });
    },
    saveTemplate(data) {
      data.content = Base64.encode(data.content);
      add(data).then(() => {
        this.onLoad(this.page);
        this.$message.success("操作成功");
        this.showUpdateDialog = false;
      });
    },
    handleClose() {
      this.form = {};
      this.showUpdateDialog = false;
    },
    rowSave(row, done, loading) {
      add(row).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowUpdate() {
      // rowUpdate(row, index, done, loading) {
      //   update(row).then(
      //     () => {
      //       this.onLoad(this.page);
      //       this.$message({
      //         type: "success",
      //         message: "操作成功!",
      //       });
      //       done();
      //     },
      //     (error) => {
      //       window.console.log(error);
      //       loading();
      //     }
      //   );
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          this.$refs.crud.toggleSelection();
        });
    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then((res) => {
          this.form = res.data.data;
        });
      }
      done();
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      this.loading = true;
      emailPage(page.currentPage, page.pageSize, Object.assign(params, this.query)).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
  },
};
</script>

<style scoped>
.email-template .danger {
  color: red;
}
</style>
