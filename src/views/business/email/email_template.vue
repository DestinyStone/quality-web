<template>
  <basic-container class="email-template">
    <avue-crud
      v-if="showMain"
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
          size="mini"
          type="primary"
          @click="handlerClickSave"
          >新 增
        </el-button>
        <el-button
          size="mini"
          type="warning"
          @click="handlerClickTest"
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
          @click="enable(row, 1)"
        >启 用</el-button
        >
        <el-button
          v-if="row.status === 1"
          :size="size"
          :type="type"
          class="danger"
          @click="enable(row, 0)"
        >禁 用</el-button
        >
      </template>
    </avue-crud>
    <email-template-update
      v-if="showSubmit"
      :template-id="form.id"
      @close="handleClose"
      @save="saveTemplate"
      @update="updateTemplate"
    />
    <el-dialog title="邮件测试"
               :visible.sync="showTest"
               width="80%"
               top="20px"
               @close="showTest = false"
               append-to-body>
      <div v-loading="testLoading"  element-loading-text="发送邮件中..., 请耐心等待">
        <div style="width: 80%;">
          <email-template-test :template-id="this.selectionList[0].id" ref="emailTemplateTest" v-if="showTest" :trigger="handlerEmailTest"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showTest = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleTrigger" :disabled="!showTest">测 试</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>

import Cookies from 'js-cookie'
import { mapGetters } from "vuex";
import { Base64 } from "js-base64";
import {emailPage, enableEmailStatus, saveEmail, testEmail, updateEmail} from "../../../api/business/email/email";
import EmailTemplateUpdate from "./component/email_template_update";
import EmailTemplateTest from "./component/email_template_test";
export default {
  name: "emailTemplate",
  components: {EmailTemplateTest, EmailTemplateUpdate},
  data() {
    return {
      showEmailTest: false,
      showMain: true,
      showTest: false,
      showSubmit: false,
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
        indexLabel: "序号",
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
      testLoading: false,
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
    handlerEmailTest(form) {
      let emailTestJson = Cookies.get("emailTest");
      let emailTest = this.validatenull(emailTestJson) ? [] : JSON.parse(emailTestJson);
      let filter = emailTest.filter(item => item === form.to);
      if (filter.length === 0) {
        emailTest.push(form.to);
        Cookies.set("emailTest", JSON.stringify(emailTest));
      }

      this.testLoading = true;
      testEmail(this.selectionList[0].id, form).then(() => {
        this.testLoading = false;
        this.$message({type: "success", message: "发送成功"});
      })
    },
    handleTrigger() {
      this.$refs['emailTemplateTest'].submit();
    },
    handlerClickTest() {
      if (this.selectionList.length !== 1) {
        this.$message({type: "warning", message: "请选择一条数据"});
        return;
      }
      this.showTest = true;
    },
    handlerClickSave() {
      this.showMain = false;
      this.showSubmit = true;
      this.form = {};
    },
    enable(row, status) {
      let warning = status === 0 ? `确认禁用【${row.title}】?` : `确认启用【${row.title}】?`;
      let success = status === 0 ? "禁用成功" : "启用成功";
      this.$confirm(warning, "提示", {
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          enableEmailStatus(row.id, status).then(() => {
            this.onLoad(this.page);
            this.$message.success(success);
          });
        })
        .catch(() => {});
    },
    updateClick(row) {
      this.form.id = row.id;
      this.showMain = false;
      this.showSubmit = true;
    },
    updateTemplate(data) {
      data.content = Base64.encode(data.content);
      updateEmail(this.form.id, data).then(() => {
        this.onLoad(this.page);
        this.$message.success("更新成功");
        this.showMain = true;
        this.showSubmit = false;
        this.form = {};
      });
    },
    saveTemplate(data) {
      data.content = Base64.encode(data.content);
      saveEmail(data).then(() => {
        this.onLoad(this.page);
        this.$message.success("新增成功");
        this.showMain = true;
        this.showSubmit = false;
        this.form = {};
      });
    },
    handleClose() {
      this.form = {};
      this.showMain = true;
      this.showSubmit = false;
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
