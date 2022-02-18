<template>
  <basic-container>
    <div>
      <div style="display: flex; justify-content: space-between;">
        <div style="display: flex;">
          <el-select   size="small" v-model="query.status" style="width: 100px;" placeholder="状态">
            <el-option
              v-for="item in statusDict"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input size="small" style="margin-left: 10px; width: 300px" placeholder="品番号/品番名"/>
          <el-button size="small" type="primary" style="margin-left: 10px;">查询</el-button>
        </div>
        <div>
          <el-button size="small" type="primary" style="margin-left: 10px;">上报周期配置</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <div style="margin-top: 10px;">
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
          <el-table-column
            label="品番号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="品番名">
          </el-table-column>
          <el-table-column
            label="供应商名称">
          </el-table-column>
          <el-table-column
            label="状态">
          </el-table-column>
          <el-table-column
            label="提交时间">
          </el-table-column>
          <el-table-column
            width = "140"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: space-around;">
                <el-link :underline="false"  type="primary" @click="handlerDetail(scope.row)">详情</el-link>
                <el-link :underline="false"  type="primary" @click="handlerDetail(scope.row)">上报数据</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex; justify-content: flex-end; padding: 30px;">
          <div style="display: flex; justify-content: center; flex-flow: column">共 {{page.total}} 条</div>
          <el-pagination
            style="margin-left: 30px;"
            background
            layout="sizes, prev, pager, next"
            @current-change="onLoad"
            @size-change="onLoad"
            :page-sizes="[10, 20, 30]"
            :current-page.sync="page.current"
            :page-size.sync="page.size"
            :total="page.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </basic-container>
</template>

<script>
  export default {
    name: "awaitReportAccountList",
    data() {
      return {
        windowHeight: 0,
        loading: false,
        data: [{name: 1}],
        query: {},
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        statusDict: [
          {value: 0, label: '未上报'},
          {value: 1, label: '已退回'},
        ],
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      tableHeight() {
        return this.windowHeight - 330;
      }
    },
  }
</script>

<style scoped>

</style>
