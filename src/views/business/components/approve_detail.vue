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
        width="80">
      </el-table-column>
      <el-table-column
        label="操作者"
        width="80">
      </el-table-column>
      <el-table-column
        label="所属部门"
        width="80">
      </el-table-column>
      <el-table-column
        label="角色"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作状态"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作结果"
        width="80">
      </el-table-column>
      <el-table-column
        label="开始时间"
        width="80">
      </el-table-column>
      <el-table-column
        label="截止时间"
        width="80">
      </el-table-column>
      <el-table-column
        label="耗时"
        width="80">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {approveLogList} from "../../../api/business/process/process";

  export default {
    name: "approveDetail",
    props: {
      busId: {
        type: String
      }
    },
    data() {
      return {
        loading: false,
        data: [],
      }
    },
    methods: {
      init() {
        approveLogList(this.busId).then(res => {
          this.data = res.data.data;
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
