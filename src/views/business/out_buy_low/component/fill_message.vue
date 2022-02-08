<template>
  <div class="fill-message">
    <div>
      <div style="margin-top: 10px;">
        <table
          class="message-table"
          style="width: 100%;"
        >
          <col width="15%" />
          <col width="35%" />
          <col width="15%" />
          <col width="35%" />
          <tr>
            <td class="message-title">不良属性</td>
            <td class="message-value">{{fillPropertiesTypeMap[data.fillPropertiesType]}}</td>
            <td class="message-title">不良类型</td>
            <td class="message-value">{{fillTypeMap[data.fillType]}}</td>
          </tr>
          <tr>
            <td class="message-title">发生原因分类</td>
            <td class="message-value">{{fillOutCauseTypeMap[data.fillOutCauseType]}}</td>
            <td class="message-title">流程原因分类</td>
            <td class="message-value">{{fillTriggerCauseTypeMap[data.fillTriggerCauseType]}}</td>
          </tr>
          <tr>
            <td class="message-title">判断结果</td>
            <td class="message-value">{{fillJudgeResultMap[data.fillJudgeResult]}}</td>
          </tr>
          <tr>
            <td class="message-title">备注</td>
            <td class="message-value">{{data.fillRemark}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "fillMessage",
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        fillPropertiesTypeMap: {0: "单发", 1: "散发", 2: "批量"},
        fillTypeMap: {0: "漏工序", 1: "欠品误品", 2: "异音", 3: "异物", 4: "外观", 5 : "测漏NG", 6: "尺寸", 7: "其他"},
        fillOutCauseTypeMap: {0: "检出力低", 1: "防错失效", 2: "标准作业不足", 3: "异常处置不当", 4: "其他"},
        fillTriggerCauseTypeMap: {0: "夹装异常", 1: "加功条件管理不足", 2: "标准作业不足", 3: "异常处置不当",4: "变化点管理不足", 5: "其他"},
        fillJudgeResultMap: {0: "供应商责任", 1: "责任不明结案", 2: "生管责任", 3: "其他直接结案", 4: "是否其他结案"},
      }
    }
  }
</script>

<style scoped>
  .fill-message .title-item{
    font-weight: 700;
  }
  .fill-message .message-table {

  }
  .fill-message .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
  }
  .fill-message .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
  .fill-message .message-table .message-content {

  }
</style>
