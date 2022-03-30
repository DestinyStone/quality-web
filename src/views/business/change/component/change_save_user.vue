<template>
  <div>
    <el-button @click="showBelongDialog = true">添加人员</el-button>
    <el-table
      :key="tableUpdate"
      :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
      :cell-style="{'textAlign': 'center'}"
      :data="data"
      border
      height="250"
      style="width: 100%; margin-top: 10px;">
      <el-table-column
        label="序号"
      >
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        show-overflow-tooltip
        label="部门名称">
      </el-table-column>
      <el-table-column
        prop="name"
        show-overflow-tooltip
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="name"
        show-overflow-tooltip
        label="角色">
      </el-table-column>
      <el-table-column
        prop="name"
        show-overflow-tooltip
        label="操作">
      </el-table-column>
    </el-table>
    <el-dialog title="请选择归口部门担当, 系长"
               :visible.sync="showBelongDialog"
               width="80%"
               append-to-body>
      <div style="margin: 0 auto;">
        <change-save-user-form ref="userForm" v-if="showBelongDialog" :default-value="data"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="showBelongDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleTrigger">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ChangeSaveUserForm from "./change_save_user_form";
  export default {
    name: "changeSaveUser",
    components: {ChangeSaveUserForm},
    data() {
      return{
        tableUpdate: 0,
        data: [],
        showBelongDialog: false,
      }
    },
    methods: {
      handleTrigger() {
        let select = this.$refs['userForm'].getSelect();
        if (select.length === 0) {
          this.$message({type: "warning", message: "请至少添加一条数据"});
          return;
        }
        this.$emit("select", select);
        this.showBelongDialog = false;
        this.data = select;
      }
    }
  }
</script>

<style scoped>

</style>
