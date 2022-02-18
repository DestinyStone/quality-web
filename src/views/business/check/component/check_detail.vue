<template>
  <basic-container class="check-detail">
    <div :style="{height: height + 'px'}">
      <div style="display: flex; justify-content: space-between;">
        <fix-color-title>
          <div style="display: flex; justify-content: space-between;">
            <div>检查法确认书</div>
          </div>
        </fix-color-title>
        <div style="display: flex;">
          <div style="color: #25a5f7; cursor: pointer;">修改</div>
          <div style="color: #25a5f7; cursor: pointer; margin-left: 10px;">打印确认书</div>
          <div style="color: #25a5f7; cursor: pointer; margin-left: 10px;">审批过程</div>
          <div style="color: #25a5f7; cursor: pointer; margin-left: 10px;" @click="handlerReback">返回</div>
        </div>
      </div>
      <el-divider></el-divider>
      <title-container title="基本信息" :isExistDivider="false">
        <div style="padding: 10px;">
          <table
            class="message-table"
            style="width: 100%;"
          >
            <col width="15%" />
            <col width="35%" />
            <col width="15%" />
            <col width="35%" />
            <tr>
              <td class="message-title">管理编号</td>
              <td class="message-value"></td>
              <td class="message-title">种类</td>
              <td class="message-value"></td>
            </tr>
            <tr>
              <td class="message-title">公司名称/部门名称</td>
              <td class="message-value"></td>
            </tr>
            <tr>
              <td class="message-title">产品编号或车种类</td>
              <td class="message-value"></td>
              <td class="message-title">品名或车辆型号</td>
              <td class="message-value"></td>
            </tr>
            <tr>
              <td class="message-title">目的(在相应项目的左侧空内确认)</td>
              <td class="message-value"></td>
            </tr>
            <tr>
              <td class="message-title">要求确认的主要内容</td>
              <td class="message-value"></td>
            </tr>
            <tr>
              <td class="message-title">新规格及变更内容</td>
              <td class="message-value"></td>
              <td class="message-title">图片</td>
              <td class="message-value"></td>
            </tr>
            <tr>
              <td class="message-title">相关部门意见</td>
              <td class="message-value"></td>
              <td class="message-title">检查管理部门意见</td>
              <td class="message-value"></td>
            </tr>
          </table>
        </div>
      </title-container>
      <title-container style="margin-top: 30px;" title="确认回答信息" :isExistDivider="false">
        <div style="padding: 10px;">
          <table
            class="message-table"
            style="width: 100%;"
          >
            <col width="15%" />
            <col width="85%" />
            <tr>
              <td class="message-title">回答结果</td>
              <td class="message-value"></td>
            </tr>
            <tr>
              <td class="message-title">回答说明</td>
              <td class="message-value"></td>
            </tr>
          </table>
        </div>
      </title-container>
      <title-container  style="margin-top: 30px;" title="附件" :isExistDivider="false">
        <el-table
          :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
          :cell-style="{'textAlign': 'center'}"
          :data="data.extendFile"
          border
          height="250"
          style="width: 100%; margin-top: 10px;">
          <el-table-column
            show-overflow-tooltip
            label="供应商承认零件检查法Excel文件">
          </el-table-column>
          <el-table-column
            label="供应商承认零件检查法签字文件">
          </el-table-column>
          <el-table-column
            label="丰田承认零件检查法Excel文件">
          </el-table-column>
          <el-table-column
            label="丰田承认零件检查法签字文件">
          </el-table-column>
        </el-table>
      </title-container>
    </div>

  </basic-container>
</template>

<script>
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import TitleContainer from "../../work/component/title-container";
  export default {
    name: "checkDetail",
    components: {TitleContainer, FixColorTitle},
    data() {
      return {
        data: {},
        windowHeight: 0,
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      height() {
        return this.windowHeight - 180;
      }
    },
    methods: {
      handlerReback() {
        this.$emit("reback");
      }
    }
  }
</script>

<style scoped>
  .check-detail .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
  }
  .check-detail .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
  .check-detail .message-table .message-content {

  }
</style>
