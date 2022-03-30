<!-- 用户列表组件 -->
<template>
  <avue-crud
  class="user-select"
    :option="option"
    :search.sync="search"
    :table-loading="loading"
    :data="data"
    ref="crud"
    v-model="form"
    :page.sync="page"
    :permission="permissionList"
    @search-change="searchChange"
    @search-reset="searchReset"
    @selection-change="selectionChange"
    @current-change="currentChange"
    @size-change="sizeChange"
    @refresh-change="refreshChange"
    @on-load="onUserLoad"
  >
    <template slot="header" v-if="showTopBtn">
      <el-button
        class="selected-btn"
        type="primary"
        size="small"
        @click="selectUser()"
        >确认添加</el-button
      >
    </template>
    <template slot-scope="{ row }" slot="deptName">
      <el-tooltip :content="row.deptName" placement="top">
        <el-tag v-if="row.deptName">{{ row.deptName }}</el-tag>
      </el-tooltip>
    </template>
    <template slot-scope="{ row }" slot="isDefault">
      <el-tag v-if="row.isDefault === 1" type="success">主职</el-tag>
      <el-tag v-if="row.isDefault === 0" type="info">兼职</el-tag>
    </template>
    <template slot-scope="{ row, index }" slot="menu">
      <el-button
        type="text"
        class="danger-btn"
        size="small"
        plain
        @click.stop="removeCandidate(row, index)"
        >移除</el-button
      >
    </template>
  </avue-crud>
</template>
 
<script>
import { getDeptTree } from "@/api/system/dept";
import { getPostList } from "@/api/system/post";
import func from "@/util/func";
export default {
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectionList: [],
      data: [],
      loading: false,
      query: {},
      option: {
        height: "auto",
        calcHeight: 20,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        selection: true,
        viewBtn: true,
        menu: false,
        header: false,
        menuWidth: 60,
        rowKey: "uuid",
        column: [
          {
            label: "所属部门",
            prop: "deptId",
            type: "tree",
            searchSpan: 6,
            dicData: [],
            props: {
              label: "title",
            },
            checkStrictly: true,
            search: true,
            hide: true,
          },
          {
            label: "人员编号",
            prop: "account",
          },
          {
            label: "姓名",
            prop: "name",
            search: true,
            searchSpan: 6,
            display: false,
          },
          {
            label: "职务",
            prop: "postId",
            type: "tree",
            search: true,
            searchSpan: 6,
            hide: true,
            dicData: [],
            props: {
              label: "postName",
              value: "id",
            },
          },
          {
            label: "职务",
            prop: "postName",
            slot: true,
            display: false,
          },
          {
            label: "所属部门",
            prop: "deptName",
            slot: true,
            display: false,
          },
          {
            label: "类型",
            prop: "isDefault",
            slot: true,
            display: false,
          },
          // {
          //   label: "组织路径",
          //   prop: "deptPath",
          //   slot: true,
          //   display: false,
          // },
        ],
      },
    };
  },
  props: {
    height: {
      type: String,
      default: "calc(50vh - 230px)",
    },
    searchShow: {
      type: Boolean,
      default: true,
    },
    selection: {
      type: Boolean,
      default: true,
    },
    showTopBtn: {
      type: Boolean,
      default: true,
    },
    menu: {
      type: Boolean,
      default: false,
    },
    static: {
      type: Boolean,
      default: false,
    },
    users: {
      // 表格用户数据，静态表格时需要传入
      type: Array,
      default: () => [],
    },
    selectable: {
      type: Function,
      // 判断某一行是否支持选中
      // eslint-disable-next-line no-unused-vars
      default: (user) => {},
    },
    onLoad: {
      type: Function,
      // 同 crud 组件的 on-load 参数，接收参数, page：分页参数，query：查询参数，callback：(res) => {}
      // eslint-disable-next-line no-unused-vars
      default: (page, query, callback) => {},
    },
    removeCandidate: {
      type: Function,
      // 接收参数，被删除的候选人，index 下标
      // eslint-disable-next-line no-unused-vars
      default: (user, index) => {},
    },
  },
  watch: {
    users: function () {
      this.onUserLoad(this.page);
    },
  },
  created() {
    this.initData();
  },
  computed: {
    permissionList() {
      return {
        addBtn: false,
        viewBtn: false,
        delBtn: false,
        editBtn: false,
      };
    },
  },
  methods: {
    initData() {
      this.option.height = this.height;
      this.option.searchShow = this.searchShow;
      this.option.selection = this.selection;
      this.option.menu = this.menu;
      if (this.searchShow) {
        getDeptTree().then((res) => {
          const column = this.findObject(this.option.column, "deptId");
          column.dicData = res.data.data;
        });
        getPostList().then((res) => {
          const column = this.findObject(this.option.column, "postId");
          column.dicData = res.data.data;
        });
      }
      if (this.selection) {
        this.option.selectable = this.selectable;
      }
    },
    searchReset() {
      this.query = {};
      this.onUserLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onUserLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onUserLoad(this.page, this.query);
    },
    reload(page = { pageSize: 10, currentPage: 1, total: 0 }, params) {
      this.page = { ...this.page, ...page };
      this.onUserLoad(this.page, params);
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud && this.$refs.crud.toggleSelection();
    },
    selectUser() {
      if (this.selectionList.length == 0) {
        this.$message.error("请至少选择一个用户");
        return;
      }
      let users = JSON.parse(JSON.stringify(this.selectionList));
      for (const user of users) {
        user.userId = user.id;
        user.id = null;
      }
      this.$emit("on-selected-user", users);
      this.selectionClear();
    },
    onUserLoad(page, params = {}) {
      if (this.static) {
        const page = this.page;
        this.page.total = this.users.length;
        const start = (page.currentPage - 1) * page.pageSize;
        const end = page.currentPage * page.pageSize;
        const tmp = this.users.slice(start, end);
        tmp.forEach((e) => {
          e.uuid = func.guid();
        });
        this.data = tmp;
        this.loading = false;
        this.selectionClear();
      } else {
        this.onLoad(page, Object.assign(params, this.query), (res) => {
          const data = res.data.data;
          this.page.total = data.total;
          data.records.forEach((e) => {
            e.uuid = func.guid();
          });
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    },
  },
};
</script>

<style scoped>
.selected-btn {
  margin-bottom: 5px;
}
.danger-btn {
  color: #ff4949;
}
.danger-btn:hover,
.danger-btn:active,
.danger-btn:focus {
  color: #ff4949;
  background-color: none;
  border-color: #ff4949;
}

.user-select >>> .el-form-item {
  margin-bottom: 0;
}
</style>