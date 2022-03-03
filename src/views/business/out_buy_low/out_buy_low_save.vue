<template>
  <basic-container>
    <out-buy-low-save-content :is-use-out="isUseOut" :save="save" :close="close"/>
  </basic-container>
</template>

<script>
  import FixColorTitle from "../../../components/min/fix_color_title";
  import FileImageUpload from "../../../components/file/file-image-upload";
  import {qprSave} from "../../../api/business/out_buy_low/qpr";
  import OutBuyLowSaveContent from "./component/out_buy_low_save_content";
  export default {
    name: "outBuyLowSave",
    components: {OutBuyLowSaveContent, FileImageUpload, FixColorTitle},
    data() {
      return {
      }
    },
    props: {
      isUseOut: {
        type: Boolean,
        default: false,
      },
      save:{
        type: Function,
      },
      close: {
        type: Function,
      }
    },
  }
</script>

<style scoped>

</style>
