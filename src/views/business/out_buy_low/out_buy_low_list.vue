<template>
  <div>
    <basic-container  v-show="showMain">
      <div>
        <div style="display: flex; justify-content: space-between;">
          <tag-select :data="tagData" :active="activeTag" @click="handlerSwitchTag"/>
          <div style="display: flex; flex-flow: column; justify-content: center; margin-left: 20px;">
            <div style="display: flex; justify-content: flex-end;">
              <el-input size="small" style="max-width: 180px" v-model="query.searchKey" placeholder="请输入标题"/>
              <el-select size="small" style="width: 130px; margin-left: 15px;" v-model="query.type" placeholder="不良分类">
                <el-option
                  v-for="item in typeDict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select style="width: 130px; margin-left: 15px;" size="small" v-model="query.apparatusType" placeholder="机型">
                <el-option
                  v-for="item in apparatusTypeDict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select  style="width: 130px; margin-left: 15px;" size="small" v-model="query.triggerAddress" placeholder="发生地点">
                <el-option
                  v-for="item in triggerAddressDict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div style="display: flex; margin-left: 20px;">
                <el-button type="primary" size="small" @click="onLoad">查询</el-button>
                <el-button size="small" @click="handlerQueryReset">重置</el-button>
              </div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
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
            show-overflow-tooltip
            prop="title"
            label="标题"
            width="200">
          </el-table-column>
          <el-table-column
            prop="code"
            label="不良编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="不良分类">
            <template slot-scope="scope">
              {{typeMap[scope.row.type]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="designation"
            label="品番号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="品名">
          </el-table-column>
          <el-table-column
            label="发生地点">
            <template slot-scope="scope">
              {{triggerAddressMap[scope.row.triggerAddress]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="apparatusType"
            label="机型">
            <template slot-scope="scope">
              {{apparatusTypeMap[scope.row.apparatusType]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="findQuantity"
            label="不良数量">
          </el-table-column>
          <el-table-column
            prop="level"
            label="不良等级">
            <template slot-scope="scope">
              {{levelMap[scope.row.level]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="eventRemark"
            label="事件概要">
          </el-table-column>
          <el-table-column
            prop="dutyDeptName"
            min-width="240"
            show-overflow-tooltip
            label="供应商名称">
          </el-table-column>
          <el-table-column
            prop="bpmStatus"
            label="状态">
            <template slot-scope="scope">
              {{approveMap[scope.row.bpmStatus]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="bpmNode"
            min-width="200"
            label="当前业务环节">
            <template slot-scope="scope">
              {{bpmNodeMap[scope.row.bpmNode]}}
            </template>
          </el-table-column>
          <el-table-column
            prop="createUserName"
            min-width="200"
            label="提交人">
          </el-table-column>
          <el-table-column
            prop="createTime"
            min-width="200"
            label="提交时间">
          </el-table-column>
          <el-table-column
            width = "140"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div style="display: flex; justify-content: space-around;">
                <el-link :underline="false" v-if="scope.row.bpmStatus === 0"  type="primary" @click="handlerSelfBack(scope.row)">撤回</el-link>
                <el-link :underline="false"  type="primary" @click="handlerDetail(scope.row)">详情</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex; justify-content: flex-end; padding: 15px;">
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
    </basic-container>
    <out-buy-low-detail v-if="showDetail"
                        :bpm-node="currentSelect.bpmNode"
                        :bpm-status="currentSelect.bpmStatus"
                        :bus-id="currentSelect.id"
                        @refresh="onLoad"
                        @close="handlerClose"/>
  </div>

</template>

<script>
  import TagSelect from "../../../components/min/tag_select";
  import {outBuySelf, qprPage, qprQuality} from "../../../api/business/out_buy_low/qpr";
  import OutBuyLowDetail from "./out_buy_low_detail";
  export default {
    name: "outBuyLowList",
    components: {OutBuyLowDetail, TagSelect},
    data() {
      return {
        showMain: true,
        showDetail: false,
        currentSelect: {},
        loading: true,
        windowHeight: 0,
        activeTag: -1,
        tagData: [
          {label: "全部", value: -1},
          {label: "自撤回", value: 0},
          {label: "已驳回", value: 1},
          {label: "进行中", value: 2},
          {label: "已办结", value: 3},
        ],
        query: {},
        typeDict: [
          {label: "外购件", value: 0},
          {label: "内购件", value: 1},
          {label: "其他", value: 2},
        ],
        triggerAddressDict: [
          {value: 0, label: "TNGA#1"},
          {value: 1, label: "TNGA#2"},
          {value: 2, label: "TNGA#3"},
          {value: 3, label: "TNGA#4"},
          {value: 4, label: "TNGA#5"},
          {value: 5, label: "TNGA#6"},
        ],
        apparatusTypeDict: [
          {value: 0, label: "TNGA2.0"},
        ],
        data: [],
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        typeMap: {0: "外购件", 1: "内购价", 2: "其他"},
        triggerAddressMap: {0: "TNGA#1", 1: "TNGA#2", 2: "TNGA#3", 3: "TNGA#4", 4: "TNGA#5", 5: "TNGA#6"},
        triggerProcessMap: {0: "铸造钢体", 1: "铸造缸盖", 2: "缸盖加工", 3: "缸体加工", 4: "曲轴加工", 5: "连杆加工", 6: "凸轮轴加工"},
        levelMap: {0: "R", 1: "S", 2: "A", 3: "B", 4: "C", 5: "批量", 6: "停线"},
        approveMap: {0: "待审批", 1: "审批中", 2: "已结案", 3: "退回", 4: "自撤回"},
        apparatusTypeMap: {0: "TNGA2.0"},
        bpmNodeMap: {0: "不良联络书发行确认", 1: "不良联络书发行审批", 2: "不良调查", 3: "调查结果确认",  4: "调查结果审批"},
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    methods: {
      handlerClose() {
        this.showMain = true;
        this.showDetail = false;
      },
      handlerDetail(detail) {
        this.currentSelect = detail;
        this.showMain = false;
        this.showDetail = true;
      },
      onLoadQuality() {
        qprQuality().then(res => {
          let data = res.data.data;
          this.$set(this.tagData[1], 'count', data.selfBack);
          this.$set(this.tagData[2], 'count', data.back);
          this.$set(this.tagData[3], 'count', data.process);
          this.$set(this.tagData[4], 'count', data.finish);
        })
      },
      onLoad() {
        this.loading = true;
        qprPage(this.page.current, this.page.size, this.query).then(res => {
          let data = res.data.data;
          this.data.splice(0, this.data.length);
          this.data = data.records;
          this.page.total = data.total;
          this.loading = false;
        });
        this.onLoadQuality();
      },
      handlerQueryReset() {
        this.query = {};
        this.activeTag = -1;
        this.$forceUpdate();
        this.onLoad();
      },
      handlerSwitchTag(tag) {
        this.activeTag = tag.value;
        this.query.bpmStatusFilter = tag.value;
        this.onLoad();
      },
      handlerSelfBack(row) {
        this.$confirm("是否确定撤回?", "提示", {confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"}).then(() => {
          outBuySelf(row.id).then(() => {
            this.$message({type: "success", message: "撤回成功"});
            this.onLoad();
          })
        });
      }
    },
    computed: {
      tableHeight() {
        return (this.windowHeight - 260) + "px";
      }
    },
    created() {
      if (!this.validatenull(this.$route.query)) {
        this.$set(this.query, 'searchKey', this.$route.query.title);
      }
      this.onLoad();
    }
  }
</script>

<style scoped>

</style>
