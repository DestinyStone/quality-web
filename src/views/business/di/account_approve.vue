<template>
  <basic-container class="account-approve">
    <div style="border-bottom: 1px solid  #F2F6FC;">
      <tag-select style="border-bottom: 1px solid #F5F5F5;" :data="tagData" :active="activeTag" @click="handlerSwitchTag"/>
      <div style="margin-top: 15px;">
        <div style="display: flex;">
          <el-input size="small" style="margin-left: 10px; width: 300px" placeholder="请输入事项编号/标题"/>
          <el-button size="small" type="primary" style="margin-left: 10px;">查询</el-button>
        </div>
        <div style="padding: 10px;">
          <el-button size="small" type="danger">批量退回供应商</el-button>
          <el-button size="small" type="success">批量确认提交</el-button>
          <el-button size="small" type="primary">转办</el-button>
        </div>
        <div style="padding: 0 10px;">
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
              label="事项编号"
              width="180">
            </el-table-column>
            <el-table-column
              label="标题"
              width="180">
            </el-table-column>
            <el-table-column
              prop="type"
              label="业务类型">
            </el-table-column>
            <el-table-column
              label="当前业务环节">
            </el-table-column>
            <el-table-column
              label="接收时间">
            </el-table-column>
            <el-table-column
              width = "140"
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <div style="display: flex; justify-content: space-around;">
                  <el-link :underline="false"  type="primary" @click="handlerDetail(scope.row)">处理</el-link>
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
    </div>
  </basic-container>
</template>

<script>
  import TagSelect from "../../../components/min/tag_select";
  export default {
    name: "accountApprove",
    components: {TagSelect},
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
        activeTag: 0,
        tagData: [
          {label: "待办", value: 0,},
          {label: "已办", value: 1,},
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
    methods: {
      handlerSwitchTag(tag) {
        this.activeTag = tag.value;
        this.query.tagFlag = tag.value;
      },
    }
  }
</script>

<style>
  .account-approve .tag-select > div {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
  }
</style>
