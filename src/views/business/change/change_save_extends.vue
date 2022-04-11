<template>
  <change-save :submit="handlerSubmit" id="1509376193493913602"/>
</template>

<script>
  import ChangeSave from "./component/change_save";
  import {saveChange} from "../../../api/business/change/change";
  export default {
    name: "changeSaveExtends",
    components: {ChangeSave},
    methods: {
      handlerSubmit(form) {
        saveChange(form).then(() =>{
          this.$message({type: "success", message: "提交成功"});
        })
      }
    }
  }
</script>

<style scoped>

</style>
