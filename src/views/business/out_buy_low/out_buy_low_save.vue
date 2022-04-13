<template>
  <basic-container>
    <out-buy-low-save-content :id="id" :is-use-out="isUseOut" :save="save" :close="close"/>
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
        id: null,
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
    created() {
      if (this.$route.query.auto === null) {
        this.id = "1514123290813833217";
      }
      if (this.$route.query.auto) {
        this.id = this.$route.query.auto;
      }
    }
  }
</script>

<style scoped>

</style>
