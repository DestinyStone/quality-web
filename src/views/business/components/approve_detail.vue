<template>
  <div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :header-cell-style="{background: '#fafafa', 'textAlign': 'center', fontWeight: 700, color: 'rgba(0,0,0,.85)',fontSize: '12px'}"
      :cell-style="{'textAlign': 'center'}"
      :data="data"
      border
      :height="tableHeight"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="80">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {approveLogList} from "../../../api/business/process/process";

  export default {
    name: "approveDetail",
    props: {
      bpmId: {
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
        approveLogList(this.bpmId).then(res => {
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
