<template>
  <div>
    <check-approve-download-resource
      v-if="flag === 'downloadResourceFile'"
      @cancel="handlerCancel"
      :bus-id="busId"
      @refresh="handlerRefresh"/>
    <check-approve-pass
      v-if="flag === 'boosProcess'"
      @cancel="handlerCancel"
      :bus-id="busId"
      @refresh="handlerRefresh"/>
  </div>
</template>

<script>
  import CheckApproveDownloadResource from "./check_approve_download_resource";
  import CheckApprovePass from "./check_approve_pass";
  export default {
    name: "checkApproveConvert",
    components: {CheckApprovePass, CheckApproveDownloadResource},
    props: {
      busId: {
        type: String,
      },
      flag: {
        type: String
      },
    },
    methods: {
      handlerCancel() {
        this.$emit("cancel");
      },
      handlerRefresh() {
        this.$emit("refresh");
      }
    }
  }
</script>

<style scoped>

</style>
