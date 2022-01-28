<template>
  <basic-container class="process-low-me-approve-detail">
    <fix-color-title>不良联络书</fix-color-title>
    <el-divider></el-divider>
    <extensible-container title="不良信息" :default-status="true">
      <div>
        <div class="title-item">不良现状</div>
        <div style="margin-top: 10px;">
          <table
            class="message-table"
            style="width: 100%;"
          >
            <tr>
              <td>不良编号</td>
              <td>222222</td>
              <td>标题</td>
              <td>3333</td>
            </tr>
          </table>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <div class="title-item">临时处理</div>
        <div style="margin-top: 10px;">

        </div>
      </div>
      <div style="margin-top: 20px;">
        <div class="title-item">附件</div>
        <div style="margin-top: 10px;">

        </div>
      </div>
    </extensible-container>
    <extensible-container title="原因调查, 对策实施填写">

    </extensible-container>
  </basic-container>
</template>

<script>
  import ExtensibleContainer from "../../../components/min/extensible_container";
  import FixColorTitle from "../../../components/min/fix_color_title";
  export default {
    name: "processLowMeApproveDetail",
    components: {FixColorTitle, ExtensibleContainer}
  }
</script>

<style scoped>
.process-low-me-approve-detail .title-item{
  font-weight: 700;
}
.process-low-me-approve-detail .message-table {

}
.process-low-me-approve-detail .message-table td {
  border: 1px solid rgb(227, 237, 255);
}
</style>
