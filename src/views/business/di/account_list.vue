<template>
  <basic-container>
    <div>
      <div style="display: flex; justify-content: space-between;">
        <div style="display: flex;">
          <el-button size="small" type="primary" style="margin-left: 10px;">上报周期配置</el-button>
        </div>
       <div>
         <el-input size="small" style="width: 300px" v-model="query.searchKey" placeholder="品番号/品番名/供应商名称"/>
         <el-button size="small" type="primary" style="margin-left: 10px;" @click="onLoad">查询</el-button>
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
            prop="designation"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="品番名">
          </el-table-column>
          <el-table-column
            prop="dutyDept"
            label="供应商名称">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              启用
            </template>
          </el-table-column>
          <el-table-column
            label="最新版本">
          </el-table-column>
          <el-table-column
            label="最新更新时间">
          </el-table-column>
          <el-table-column
            width = "140"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: space-around;">
                <el-link :underline="false"  type="primary" @click="handlerDetail(scope.row)">修订</el-link>
                <el-link :underline="false"  type="primary" @click="handlerDetail(scope.row)">DI数据版本</el-link>
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
  import {diAccountPage} from "../../../api/business/di/di";

  export default {
    name: "accountList",
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
    methods: {
      init() {
        this.onLoad();
      },
      onLoad() {
        this.loading =  true;
        diAccountPage(this.page.current, this.page.size, this.query).then(res => {
          let data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
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
