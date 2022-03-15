<template>
  <div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :header-cell-style="{background: '#fafafa', 'textAlign': 'center', fontWeight: 700, color: 'rgba(0,0,0,.85)',fontSize: '12px'}"
      :cell-style="{'textAlign': 'center'}"
      :data="data"
      border
      height="250"
      style="width: 100%">
      <el-table-column
        label="操作时间"
        prop="operatorTime"
        width="150">
      </el-table-column>
      <el-table-column
        label="操作者"
        prop="operatorUserName"
        min-width="120">
      </el-table-column>
      <el-table-column
        label="所属部门"
        show-overflow-tooltip
        prop="operatorDeptPath"
        min-width="200">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="operatorRole"
        label="角色"
        min-width="180">
      </el-table-column>
      <el-table-column
        label="操作状态"
        prop="operatorStatus"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="operatorResult"
        label="操作结果"
        min-width="180">
        <template slot-scope="scope">
          <tooltop-text :text="scope.row.operatorResult" :limit="8"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="截止时间"
        width="150">
      </el-table-column>
      <el-table-column
        label="耗时"
        prop="intervalTime"
        width="150">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {approveLogList} from "../../../api/business/process/process";
  import TooltopText from "../../../components/min/tooltop-text";

  export default {
    name: "approveDetail",
    components: {TooltopText},
    props: {
      busId: {
        type: String
      }
    },
    data() {
      return {
        loading: true,
        data: [],
      }
    },
    methods: {
      init() {
        this.loading = true;
        approveLogList(this.busId).then(res => {
          this.$set(this, 'data', res.data.data);
          this.loading = false;
        })
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
