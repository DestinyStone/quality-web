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
      <template slot="status" slot-scope="scope">
        <div>
          <div v-if="scope.row.status === 1">已激活</div>
          <div v-if="scope.row.status === 0">未激活</div>
        </div>
      </template>
      <template slot="menuLeft">
        <el-button
          v-if="permissionList.saveBtn"
          size="small"
          type="primary"
          @click="handlerClickSave"
          >新 增
        </el-button>
        <el-button
          v-if="permissionList.testBtn"
          size="small"
          type="warning"
          @click="handlerClickTest"
        >发送短信
        </el-button>
      </template>
      <template slot-scope="{ type, size, row }" slot="menu">
        <el-button
          v-if="permissionList.editBtn"
          :size="size"
          :type="type"
          @click="updateClick(row)"
          >编 辑</el-button
        >
        <el-button
          v-if="row.status === 0  && permissionList.activeBtn"
          :size="size"
          :type="type"
          @click="enable(row, 1)"
        >激 活</el-button
        >
        <el-button
          v-if="row.status === 1 && permissionList.unActiveBtn"
          :size="size"
          :type="type"
          class="danger"
          @click="enable(row, 0)"
        >禁 用</el-button
        >
<!--        <el-button-->
<!--          v-if="row.status === 0 && permissionList.adviceBtn"-->
<!--          :size="size"-->
<!--          :type="type"-->
<!--          @click="advice(row)"-->
<!--        >激活通知</el-button-->
<!--        >-->
      </template>

    </avue-crud>
    <phone-template-update
      v-if="showSubmit"
      :template-id="form.id"
      @close="handleClose"
      @save="saveTemplate"
      @update="updateTemplate"
    />
    <el-dialog title="短信测试"
               :visible.sync="showTest"
               width="80%"
               top="20px"
               @close="showTest = false"
               append-to-body>
      <div v-loading="testLoading"  element-loading-text="发送短信中..., 请耐心等待">
        <div style="width: 80%;">
          <phone-template-test :template-id="this.selectionList[0].id" ref="emailTemplateTest" v-if="showTest" :trigger="handlerEmailTest"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showTest = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleTrigger" :disabled="testLoading">测 试</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>

import Cookies from 'js-cookie'
import { mapGetters } from "vuex";
import { Base64 } from "js-base64";
import {emailPage, enableEmailStatus, saveEmail, testEmail, updateEmail} from "../../../api/business/email/email";
import PhoneTemplateUpdate from "./component/phone_template_update";
import {
  advicePhone,
  enablePhoneStatus,
  phonePage,
  savePhone,
  testPhone,
  updatePhone
} from "../../../api/business/phone/phone";
import PhoneTemplateTest from "./component/phone_template_test";
// import EmailTemplateTest from "./component/email_template_test";
export default {
  name: "phoneTemplate",
  components: {PhoneTemplateTest, PhoneTemplateUpdate},
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
        addBtn: false,
        editBtn: false,
        delBtn: false,
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
            label: "短信标题",
            prop: "title",
            labelWidth: "20%",
            search: true,
          },
          {
            label: "短信编码",
            prop: "code",
            labelWidth: "20%",
          },
          {
            label: "状态",
            type: "select",
            prop: "status",
            slot: true,
            search: true,
            dicData: [
              {
                label: "已激活",
                value: 1,
              },
              {
                label: "未激活",
                value: 0,
              },
            ]
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
        addBtn: this.vaildData(this.permission.phone_save, false),
        editBtn: this.vaildData(this.permission.phone_edit, false),
        activeBtn: this.vaildData(this.permission.phone_active, false),
        unActiveBtn: this.vaildData(this.permission.phone_unable, false),
        testBtn: this.vaildData(this.permission.phone_test, false),
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
    advice(row) {
      advicePhone(row.id).then(() => {
        this.$message({type: "success", message: "已通知管理员, 请耐心等待"});
      })
    },
    handlerEmailTest(form) {
      let emailTestJson = Cookies.get("phoneTest");
      let emailTest = this.validatenull(emailTestJson) ? [] : JSON.parse(emailTestJson);
      let filter = emailTest.filter(item => item === form.to);
      if (filter.length === 0) {
        emailTest.push(form.to);
        Cookies.set("phoneTest", JSON.stringify(emailTest));
      }

      this.testLoading = true;
      testPhone(this.selectionList[0].id, form).then(() => {
        this.testLoading = false;
        this.$message({type: "success", message: "发送成功"});
      }).catch(() => {
        this.testLoading = false;
        // this.$message({type: "error", message: "短信发送失败"});
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

      let data = this.selectionList[0];
      if (data.status !== 1) {
        this.$message({type: "error", message: "手机短信模板未激活"});
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
      let warning = status === 0 ? `确认禁用【${row.title}】?` : `确认激活【${row.title}】?`;
      let success = status === 0 ? "禁用成功" : "激活成功";
      this.$confirm(warning, "提示", {
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          enablePhoneStatus(row.id, status).then(() => {
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
      updatePhone(this.form.id, data).then(() => {
        this.onLoad(this.page);
        this.$message.success("更新成功");
        this.showMain = true;
        this.showSubmit = false;
        this.form = {};
      });
    },
    saveTemplate(data) {
      data.content = Base64.encode(data.content);
      savePhone(data).then(() => {
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
      phonePage(page.currentPage, page.pageSize, Object.assign(params, this.query)).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
  },
  created() {
    if (!this.permissionList.activeBtn && !this.permissionList.unActiveBtn && !this.permissionList.editBtn) {
      this.option.menu = false;
    }
  }
};
</script>

<style scoped>
.email-template .danger {
  color: red;
}
</style>
