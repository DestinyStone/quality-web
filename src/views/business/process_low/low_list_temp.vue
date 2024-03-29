<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               @row-del="rowDel"
               v-model="form"
               ref="crud"
               :permission="permissionList"
               @row-update="rowUpdate"
               @row-save="rowSave"
               :before-open="beforeOpen"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <template slot="menuLeft">
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "processLowList",
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          height: 'auto',
          calcHeight: 30,
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          dialogClickModal: false,
          column: [
            {
              label: "应用id",
              prop: "clientId",
              search: true,
              rules: [{
                required: true,
                message: "请输入客户端id",
                trigger: "blur"
              }]
            },
            {
              label: "应用密钥",
              prop: "clientSecret",
              search: true,
              rules: [{
                required: true,
                message: "请输入客户端密钥",
                trigger: "blur"
              }]
            },
            {
              label: "授权类型",
              prop: "authorizedGrantTypes",
              type: "checkbox",
              value: "refresh_token,password,authorization_code",
              dicData: [
                {
                  label: "refresh_token",
                  value: "refresh_token"
                },
                {
                  label: "password",
                  value: "password"
                },
                {
                  label: "authorization_code",
                  value: "authorization_code"
                },
                {
                  label: "captcha",
                  value: "captcha"
                },
                {
                  label: "social",
                  value: "social"
                }
              ],
              rules: [{
                required: true,
                message: "请输入授权类型",
                trigger: "blur"
              }]
            },
            {
              label: "授权范围",
              prop: "scope",
              value: "all",
              rules: [{
                required: true,
                message: "请输入授权范围",
                trigger: "blur"
              }]
            },
            {
              label: "令牌秒数",
              prop: "accessTokenValidity",
              type: "number",
              value: 3600,
              rules: [{
                required: true,
                message: "请输入令牌过期秒数",
                trigger: "blur"
              }]
            },
            {
              label: "刷新秒数",
              prop: "refreshTokenValidity",
              type: "number",
              value: 604800,
              hide: true,
              rules: [{
                required: true,
                message: "请输入刷新令牌过期秒数",
                trigger: "blur"
              }]
            },
            {
              label: "回调地址",
              prop: "webServerRedirectUri",
              hide: true,
              rules: [{
                required: true,
                message: "请输入回调地址",
                trigger: "blur"
              }]
            },
            {
              label: "资源集合",
              prop: "resourceIds",
              hide: true,
              rules: [{
                message: "请输入资源集合",
                trigger: "blur"
              }]
            },
            {
              label: "权限",
              prop: "authorities",
              hide: true,
              rules: [{
                message: "请输入权限",
                trigger: "blur"
              }]
            },
            {
              label: "自动授权",
              prop: "autoapprove",
              hide: true,
              rules: [{
                message: "请输入自动授权",
                trigger: "blur"
              }]
            },
            {
              label: "附加说明",
              hide: true,
              prop: "additionalInformation",
              span: 24,
              rules: [{
                message: "请输入附加说明",
                trigger: "blur"
              }]
            },
          ]
        },
        data: []
      }
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {

        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
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
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
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
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  }
</script>

<style scoped>

</style>
