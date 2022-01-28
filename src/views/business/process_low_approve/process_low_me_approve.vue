<template>
  <process-low-me-approve-detail/>
<!--  <basic-container class="process-low-me-approve">-->
<!--    <div style="border-bottom: 1px solid  #DCDFE6;">-->
<!--      <tag-select style="" :data="tagData" :active="activeTag" @click="handlerSwitchTag"/>-->
<!--    </div>-->
<!--    <div>-->
<!--      <div style="display: flex; width: 20%; min-width: 300px; margin-top: 20px;">-->
<!--        <el-input placeholder="请输入事项编号/标题" size="small"></el-input>-->
<!--        <el-button type="primary" style="margin-left: 20px;" size="small">查询</el-button>-->
<!--      </div>-->
<!--      <div style="margin-top: 20px;">-->
<!--        <el-table-->
<!--          v-loading="loading"-->
<!--          element-loading-text="拼命加载中"-->
<!--          :header-cell-style="{background: '#fafafa', 'textAlign': 'center', fontWeight: 700, color: 'rgba(0,0,0,.85)',fontSize: '12px'}"-->
<!--          :cell-style="{'textAlign': 'center'}"-->
<!--          :data="data"-->
<!--          border-->
<!--          :height="tableHeight"-->
<!--          style="width: 100%">-->
<!--          <el-table-column-->
<!--            label="序号"-->
<!--            width="80">-->
<!--            <template slot-scope="scope">-->
<!--              {{scope.$index + 1}}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="code"-->
<!--            label="不良编号"-->
<!--            width="180">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="type"-->
<!--            label="不良分类">-->
<!--            <template slot-scope="scope">-->
<!--              {{typeMap[scope.row.type]}}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="designation"-->
<!--            label="品番号">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="name"-->
<!--            label="品名">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            label="发生地点">-->
<!--            <template slot-scope="scope">-->
<!--              {{triggerAddressMap[scope.row.triggerAddress]}}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            label="发生工序">-->
<!--            <template slot-scope="scope">-->
<!--              {{triggerProcessMap[scope.row.triggerProcess]}}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="findQuantity"-->
<!--            label="发现数量">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="level"-->
<!--            label="不良等级">-->
<!--            <template slot-scope="scope">-->
<!--              {{levelMap[scope.row.level]}}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="content"-->
<!--            label="不良内容">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="dutyDept"-->
<!--            min-width="200"-->
<!--            label="责任部门/厂家">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="bpmStatus"-->
<!--            label="状态">-->
<!--            <template slot-scope="scope">-->
<!--              {{approveMap[scope.row.bpmStatus]}}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="bpmNode"-->
<!--            min-width="200"-->
<!--            label="当前业务环节">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="createUserName"-->
<!--            label="提交人">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="createTime"-->
<!--            min-width="200"-->
<!--            label="提交时间">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            width = "140"-->
<!--            label="操作">-->
<!--            <template slot-scope="scope">-->
<!--              <div style="display: flex; justify-content: space-around;">-->
<!--                <el-link :underline="false" v-if="scope.row.bpmStatus === 0"  type="primary" @click="handlerSelfBack(scope.row)">撤回</el-link>-->
<!--                <el-link :underline="false"  type="primary">详情</el-link>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </div>-->
<!--      <div style="display: flex; justify-content: flex-end; padding: 30px;">-->
<!--        <div style="display: flex; justify-content: center; flex-flow: column">共 {{page.total}} 条</div>-->
<!--        <el-pagination-->
<!--          style="margin-left: 30px;"-->
<!--          background-->
<!--          layout="sizes, prev, pager, next"-->
<!--          @current-change="onLoad"-->
<!--          @size-change="onLoad"-->
<!--          :page-sizes="[10, 20, 30]"-->
<!--          :current-page.sync="page.current"-->
<!--          :page-size.sync="page.size"-->
<!--          :total="page.total">-->
<!--        </el-pagination>-->
<!--      </div>-->
<!--    </div>-->
<!--  </basic-container>-->
</template>

<script>
  import TagSelect from "../../../components/min/tag_select";
  import ExtensibleContainer from "../../../components/min/extensible_container";
  import ProcessLowMeApproveDetail from "./process_low_me_approve-detail";
  export default {
    name: "processLowMeApprove",
    components: {ProcessLowMeApproveDetail, ExtensibleContainer, TagSelect},
    data() {
      return{
        loading: false,
        windowHeight: 0,
        activeTag: 0,
        tagData: [
          {label: "待办", value: 0, count: 100},
          {label: "已办", value: 1, count: 100},
          {label: "待阅", value: 2, count: 100},
        ],
        query: {},
        page: {
          current: 1,
          size: 10,
          total: 0,
        },
        data: [],
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      tableHeight() {
        return (this.windowHeight - 350) + "px";
      }
    },
    methods: {
      handlerSwitchTag(tag) {
        this.activeTag = tag.value;
      },
      onLoad() {

      }
    }
  }
</script>

<style>
.process-low-me-approve .tag-select > div {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
}
</style>
