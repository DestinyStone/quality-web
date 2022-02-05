<template>
  <div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :header-cell-style="{background: '#fafafa', 'textAlign': 'center', fontWeight: 700, color: 'rgba(0,0,0,.85)',fontSize: '12px'}"
      :cell-style="{'textAlign': 'center'}"
      :data="data"
      height="300"
      border
      style="width: 100%">
      <el-table-column
        label="操作时间"
        min-width="180"
        prop="createTime">
      </el-table-column>
      <el-table-column
        prop="createUserName"
        min-width="180"
        label="警办人">
      </el-table-column>
      <el-table-column
        prop="createDeptName"
        min-width="180"
        label="所属部门">
      </el-table-column>
      <el-table-column
        prop="createRole"
        min-width="180"
        label="角色">
      </el-table-column>
      <el-table-column
        label="操作状态">
        <template>
          催办
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        min-width="180"
        label="催办内容">
        <template slot-scope="scope">
          <div style="display: flex; justify-content: center;">
            <el-tooltip effect="dark" :content="scope.row.content" placement="top">
              <div style="width: 100px; overflow: hidden; text-align: center;">
                {{scope.row.content.length > 8 ? `${scope.row.content.substring(0, 8)}...` : scope.row.content}}
              </div>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        min-width="180"
        label="催办时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {approveUrgeList} from "../../../api/business/process/process";

  export default {
    name: "approveUrgeList",
    props: {
      bpmId: {
        type: String,
      }
    },
    data() {
      return {
        data: [],
        loading: false,

      }
    },
    methods: {
      init() {
        this.loading = true;
        approveUrgeList(this.bpmId).then(res => {
          this.loading = false;
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
