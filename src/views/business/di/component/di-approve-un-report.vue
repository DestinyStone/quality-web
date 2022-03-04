<template>
  <div class="di-approve-un-report">
    <fix-color-title>DI数据上报</fix-color-title>
    <el-divider></el-divider>
    <table
      class="message-table"
      style="width: 100%;"
    >
      <col width="15%" />
      <col width="35%" />
      <col width="15%" />
      <col width="35%" />
      <tr>
        <td class="message-title">品番号</td>
        <td class="message-value">{{data.designation}}</td>
        <td class="message-title">品名</td>
        <td class="message-value">{{data.name}}</td>
      </tr>
      <tr>
        <td class="message-title">供应商名称</td>
        <td class="message-value" colspan="3">{{data.dutyDept}}</td>
      </tr>
      <tr>
        <td class="message-title">无需上报说明</td>
        <td class="message-value" colspan="3">{{data.noReportRemark}}</td>
      </tr>
    </table>
    <div style="position: fixed; bottom: 0; width: 100%;">
      <div style="width: 100%; display: flex; justify-content: center;">
        <div style="padding-right: 20%; padding-bottom: 20px;">
          <el-button size="small" @click="$emit('cancel')">返回</el-button>
          <el-button type="danger"  size="small" @click="$emit('reject')">退回供应商</el-button>
          <el-button type="primary" size="small" @click="handlerPass">审批通过</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {reportPass} from "../../../../api/business/di/di";

  export default {
    name: "di-approve-un-report",
    props: {
      busId: {
        type: String
      },
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      handlerPass() {
        reportPass(this.busId).then(() => {
          this.$message({type: "success", message: "审批通过"})
          this.$emit("refresh");
          this.$emit("cancel");
        })
      },
    }
  }
</script>

<style scoped>
  .di-approve-un-report .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
    height: 50px
  }
  .di-approve-un-report .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
</style>
