<template>
  <basic-container>
    <process-low-save-content :id="id"/>
  </basic-container>
</template>

<script>
  import FileImageUpload from "../../../components/file/file-image-upload";
  import FileUpload from "../../../components/file/file-upload";
  import {processLowSave} from "../../../api/business/process_low/process_low";
  import FileMultUpload from "../../../components/file/file-mult-upload";
  import FixColorTitle from "../../../components/min/fix_color_title";
  import FileDragUpload from "../../../components/file/file-drag-upload";
  import ProcessLowSaveContent from "./component/process_low_save_content";
  export default {
    name: "processLowSave",
    components: {ProcessLowSaveContent, FileDragUpload, FixColorTitle, FileMultUpload, FileUpload, FileImageUpload},
    data() {
      return {
        id: null,
      }
    },
    props: {
    },
    watch: {
    },
    methods: {

    },
    created() {
      if (this.$route.query.auto === null) {
        this.id = "1513767343956361218";
      }
      if (this.$route.query.auto) {
        this.id = this.$route.query.auto;
      }
    }
  }
</script>

<style scoped>

</style>
