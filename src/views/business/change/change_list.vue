<template>
  <div>
    <basic-container v-show="showMain">
      <div>
        <div style="display: flex; justify-content: space-between;">
          <tag-select :data="tagData" :active="activeTag" @click="handlerSwitchTag"/>
          <div style="display: flex; flex-flow: column; justify-content: center; margin-left: 20px;">
            <div style="display: flex; justify-content: flex-end;">
              <el-select size="small" style="width: 200px; margin-left: 15px;" v-model="query.apparatusType" placeholder="机型">
                <el-option
                  v-for="item in apparatusTypeDict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select style="width: 200px; margin-left: 15px;" size="small" v-model="query.productLine" placeholder="生产线">
                <el-option
                  v-for="item in productLineDict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select  style="width: 200px; margin-left: 15px;" size="small" v-model="query.type" placeholder="工变类型">
                <el-option
                  v-for="item in typeDict"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input style="width: 200px; margin-left: 15px;" v-model="query.searchKey" size="small" placeholder="背景/变更内容"/>
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
            prop="code"
            label="工变编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="apparatusTypeName"
            min-width="120"
            label="机型">
          </el-table-column>
          <el-table-column
            min-width="200"
            show-overflow-tooltip
            prop="productLineName"
            label="生产线">
          </el-table-column>
          <el-table-column
            prop="processName"
            min-width="120"
            label="工序号">
          </el-table-column>
          <el-table-column
            prop="utilName"
            min-width="120"
            label="设备/刀具">
          </el-table-column>
          <el-table-column
            prop="utilContent"
            min-width="180"
            label="设备/刀具号">
          </el-table-column>
          <el-table-column
            prop="typeName"
            min-width="250"
            show-overflow-tooltip
            label="工变类型">
          </el-table-column>
          <el-table-column
            prop="mainChangeTypeName"
            min-width="250"
            show-overflow-tooltip
            label="主要变化点">
          </el-table-column>
          <el-table-column
            prop="background"
            min-width="250"
            show-overflow-tooltip
            label="背景">
          </el-table-column>
          <el-table-column
            prop="changeContent"
            min-width="250"
            show-overflow-tooltip
            label="变更内容">
          </el-table-column>
          <el-table-column
            prop="changeContent"
            min-width="180"
            label="该部品功能">
          </el-table-column>
          <el-table-column
            prop="changeContent"
            min-width="180"
            label="该部品过往不良">
          </el-table-column>
          <el-table-column
            min-width="180"
            show-overflow-tooltip
            prop="createDeptName"
            label="申请部门">
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
            min-width="200"
            prop="createUserName"
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
                <el-link :underline="false"  type="primary" @click="handlerClickDetail(scope.row)">详情</el-link>
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
  </div>

</template>

<script>
  import TagSelect from "../../../components/min/tag_select";
  import {processLowPage, processLowQuality, processLowSelfBack} from "../../../api/business/process_low/process_low";
  import {lowChangePage, lowChangeQuality} from "../../../api/business/change/change";
  export default {
    name: "changeList",
    components: {TagSelect},
    data() {
      return {
        showMain: true,
        showDetail: false,
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
          {label: "品质改善", value: 0},
          {label: "成本降低", value: 1},
          {label: "生产性提高", value: 2},
          {label: "其他", value: 3},
        ],
        triggerAddressDict: [
          {value: 0, label: "TNGA#1"},
          {value: 1, label: "TNGA#2"},
          {value: 2, label: "TNGA#3"},
          {value: 3, label: "TNGA#4"},
          {value: 4, label: "TNGA#5"},
          {value: 5, label: "TNGA#6"},
        ],
        productLineDict:  [
          {label: "TNGA#1", value: 0},
          {label: "TNGA#2", value: 1},
          {label: "TNGA#3", value: 2},
          {label: "TNGA#4", value: 3},
          {label: "TNGA#5", value: 4},
        ],
        apparatusTypeDict: [
          {value: 0, label: "TNGA1.5"},
          {value: 1, label: "TNGA2.0"},
          {value: 2, label: "NR"},
          {value: 3, label: "AZ"},
        ],
        data: [],
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        approveMap: {0: "待审批", 1: "审批中", 2: "已结案", 3: "退回", 4: "自撤回"},
        currentSelect: {},
        bpmNodeMap: {0: "不良联络书发行确认", 1: "不良联络书发行审批", 2: "不良调查", 3: "调查结果确认",  4: "调查结果审批", 5: "上传业务通知书", 6: "上传放行通知书", 7: "上传放行通知书"},
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
      handlerClickDetail(detail) {
        this.currentSelect = detail;
        this.showMain = false;
        this.showDetail = true;
      },
      onLoadQuality() {
        lowChangeQuality().then(res => {
          let data = res.data.data;
          this.$set(this.tagData[1], 'count', data.selfBack);
          this.$set(this.tagData[2], 'count', data.back);
          this.$set(this.tagData[3], 'count', data.process);
          this.$set(this.tagData[4], 'count', data.finish);
        })
      },
      onLoad() {
        this.loading = true;
        lowChangePage(this.page.current, this.page.size, this.query).then(res => {
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
          processLowSelfBack(row.id).then(() => {
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
