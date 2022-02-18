<template>
  <div>
    <basic-container v-if="showMain">
      <div>
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
          <el-button size="small" style="margin-left: 10px;">重置</el-button>
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
              label="管理编号"
              width="180">
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
              label="业务类型">
            </el-table-column>
            <el-table-column
              label="状态">
            </el-table-column>
            <el-table-column
              label="创建时间">
            </el-table-column>
            <el-table-column
              width = "140"
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <div style="display: flex; justify-content: space-around;">
                  <el-link :underline="false"  type="primary" @click="handlerDetail(scope.row)">详情</el-link>
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
    <check-detail v-if="showDetail" @reback="handlerReBack"/>
  </div>

</template>

<script>
  import CheckDetail from "./component/check_detail";
  export default {
    name: "checkList",
    components: {CheckDetail},
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
          {value: 1, label: '已完成'},
          {value: 0, label: '未完成'},
          {value: 2, label: '已退回'},
        ],
        showMain: true,
        showDetail: false,
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
      handlerReBack() {
        this.showMain = true;
        this.showDetail = false;
      },
      handlerDetail(row) {
        this.showMain = false;
        this.showDetail = true;
      }
    }
  }
</script>

<style scoped>

</style>
