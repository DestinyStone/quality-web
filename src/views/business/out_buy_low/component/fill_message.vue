<template>
  <div>
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
            <td class="message-title">发生原因</td>
            <td class="message-value">{{data.analyseTriggerCause}}</td>
            <td class="message-title">流出原因</td>
            <td class="message-value">{{data.analyseOutCause}}</td>
          </tr>
          <tr>
            <td class="message-title">发生对策</td>
            <td class="message-value">{{data.analyseTriggerStrategy}}</td>
            <td class="message-title">流出对策</td>
            <td class="message-value">{{data.analyseOutStrategy}}</td>
          </tr>
          <tr>
            <td class="message-title">其他</td>
            <td class="message-value">{{data.analyseOther}}</td>
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
    }
  }
</script>

<style scoped>

</style>
