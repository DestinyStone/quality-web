<template>
  <div>
    <basic-container v-if="showMain">
      <div>
        <div style="display: flex; justify-content: space-between;">
          <div>
            <tag-select :data="tagData" :active="activeTag" @click="handlerSwitchTag"/>
          </div>
          <div>
            <el-input size="small" v-model="query.searchKey" style="margin-left: 10px; width: 300px" placeholder="品番号/品番名/供应商"/>
            <el-button size="small" type="primary" style="margin-left: 10px;" @click="onLoad">查询</el-button>
            <el-button size="small" style="margin-left: 10px;" @click="resetQuery">重置</el-button>
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
              label="管理编号"
              prop="code"
              width="180">
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
              min-width="240"
              show-overflow-tooltip
              label="供应商名称">
            </el-table-column>
            <el-table-column
              prop="bpmNode"
              width="140"
              label="业务类型">
              <template slot-scope="scope">
                {{scope.row.bpmNode === 0 ? '新增检查法' : '修订检查法'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="bpmStatus"
              label="状态">
              <template slot-scope="scope">
                {{approveMap[scope.row.bpmStatus]}}
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              width="180"
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
    <check-detail v-if="showDetail" @reback="handlerReBack" :id="currentSelect.id"/>
  </div>

</template>

<script>
  import CheckDetail from "./component/check_detail";
  import {pageCheck, qualityCheck} from "../../../api/check/check";
  import TagSelect from "../../../components/min/tag_select";
  export default {
    name: "checkList",
    components: {TagSelect, CheckDetail},
    data() {
      return {
        windowHeight: 0,
        loading: true,
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
        approveMap: {0: "待审批", 1: "审批中", 2: "已结案", 3: "退回", 4: "自撤回"},
        showMain: true,
        showDetail: false,
        activeTag: -1,
        tagData: [
          {label: "全部", value: -1},
          {label: "进行中", value: 2},
          {label: "已驳回", value: 1},
          {label: "已办结", value: 3},
        ],
        currentSelect: {},
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
      resetQuery() {
        this.activeTag = -1;
        this.query = {};
        this.query.activeTag = -1;
        this.onLoad();
      },
      handlerSwitchTag(tag) {
        this.activeTag = tag.value;
        this.query.bpmStatusFilter = tag.value;
        this.onLoad();
      },
      handlerReBack() {
        this.showMain = true;
        this.showDetail = false;
        this.onLoad();
      },
      handlerDetail(row) {
        this.currentSelect = row;
        this.showMain = false;
        this.showDetail = true;
      },
      onLoadQuality() {
        qualityCheck().then(res => {
          let data = res.data.data;
          this.$set(this.tagData[1], 'count', data.process);
          this.$set(this.tagData[2], 'count', data.back);
          this.$set(this.tagData[3], 'count', data.finish);
        })
      },
      onLoad() {
        this.loading = true;
        pageCheck(this.page.current, this.page.size, this.query).then(res => {
          let data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
          this.loading = false;
        })
        this.onLoadQuality();
      }
    },
    created() {
      this.onLoad();
    }
  }
</script>

<style scoped>

</style>
