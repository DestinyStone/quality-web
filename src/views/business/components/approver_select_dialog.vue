<!-- 候选人选择弹窗组件 -->
<template>
  <el-dialog
    class="approver-select-dialog"
    :title="candidateTitle"
    :visible.sync="show"
    top="3%"
    width="70%"
    append-to-body
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
   <div style="height: 500px; overflow: auto;">
     <div class="candidate-table" >
       <user-select
         ref="candidateTable"
         :on-load="onCandidateUserLoad"
         :selectable="selectable"
         @on-selected-user="onSelectUser"
       ></user-select>
     </div>
     <div class="selected-table">
       <div class="selected-title">{{ selectedTitle }}</div>
       <user-select
         ref="selectedTable"
         :on-load="onSelectedLoad"
         :search-show="false"
         :show-top-btn="false"
         :selection="false"
         :users="users"
         menu
         static
         :remove-candidate="onRemoveCandidate"
       ></user-select>
     </div>
   </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="finish">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getApprovalList } from "@/api/system/user";
import UserSelect from "./user_select.vue";
export default {
  name: "approvelSelectDialog",
  components: {
    UserSelect,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.deepCopyUser();
  },
  watch: {
    selectedUser: function () {
      this.deepCopyUser();
    },
    show(value) {
      value && this.deepCopyUser();
    },
  },
  props: {
    candidateTitle: {
      // 候选人部分标题
      type: String,
      default: "提示",
    },
    selectedTitle: {
      // 已选审批人标题
      type: String,
      default: "提示",
    },
    show: {
      type: Boolean,
      default: false,
    },
    // 审批人限制
    limit: Number,
    selectedUser: {
      // 已选中审批人
      type: Array,
      default: () => [],
    },
    onCandidateLoad: {
      // 候选人表格数据加载方法，分页
      type: Function,
      // 同 crud 组件的 on-load 参数，接收参数, page：分页参数，query：查询参数，callback：(res) => {}
      // eslint-disable-next-line no-unused-vars
      default: null, //(page, query, callback) => {},
    },
    onSelectedLoad: {
      // 已选择审批人表格数据加载方法，分页
      type: Function,
      // 同 crud 组件的 on-load 参数，接收参数, page：分页参数，query：查询参数，callback：(res) => {}
      // eslint-disable-next-line no-unused-vars
      default: (page, query, callback) => {},
    },
    removeCandidate: {
      // 删除已选审批人方法
      type: Function,
      // 接收参数，被删除的候选人，index 下标
      // eslint-disable-next-line no-unused-vars
      default: null, // (user, index) => {},
    },
  },
  methods: {
    deepCopyUser() {
      this.users = this.selectedUser
        ? JSON.parse(JSON.stringify(this.selectedUser))
        : [];
    },
    handleClose() {
      this.$emit("close");
    },
    finish() {
      this.$emit("finish", this.users);
    },
    selectable(user) {
      return (
        this.users.filter((u) => u.userId == user.userId || u.userId == user.id)
          .length == 0
      );
    },
    onSelectUser(users) {
      if (this.limit && users.length + this.users.length > this.limit) {
        this.$message.warning(`超出人数限制，最多${this.limit}人`);
        return;
      }
      for (const user of users) {
        if (this.selectable(user)) {
          this.users.push(user);
        }
      }
    },
    onCandidateUserLoad(page, params = {}, callback) {
      if (this.onCandidateLoad) {
        this.onCandidateLoad(page, params, callback);
      } else {
        let deptId = params.deptId;
        delete params.deptId;
        getApprovalList(page.currentPage, page.pageSize, params, deptId).then(callback);
      }
    },
    onRemoveCandidate(user, index) {
      this.$confirm(`"确认删除此候选人【${user.account}】？"`).then(() => {
        if (this.removeCandidate) {
          this.removeCandidate(user, index);
        } else {
          const index = this.users.indexOf(user);
          if (index != -1) {
            this.users.splice(index, 1);
          }
        }
      });
    },
  },
};
</script>

<style scoped>

.approver-select-dialog >>> .el-dialog__body {
  padding: 5px 15px;
}

.approver-select-dialog .candidate-table {
  height: 50vh;
  border-bottom: 3px solid #e6e6e6;
}
.approver-select-dialog .selected-table {
  height: 23vh;
}
.approver-select-dialog .selected-title {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}
.approver-select-dialog .selected-btn {
  margin-bottom: 5px;
}
</style>
