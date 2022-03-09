<template>
  <div>
    <div style="display: flex;">
      <div style="font-size: 16px; font-weight: 700; width: 60px;" >当前: </div>
      <table class="check-file-table" style="width: 100%; text-align: center; border-collapse:collapse;">
        <tr>
          <td style="padding: 10px;">标准类更新附件</td>
        </tr>
        <tr>
          <td style="width: 50%; height: 40px;">
            <div v-if="validatenull(data.standardFileName)">
              暂无文件
            </div>
            <div v-else style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(data.standardFileId)">
              <tooltop-text :text="data.standardFileName" :limit="20"/>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div style="display: flex; margin-top: 30px;" >
      <div style="font-size: 16px; font-weight: 700; width: 60px;" >更新: </div>
      <table class="check-file-table" style="width: 100%; text-align: center; border-collapse:collapse;">
        <tr>
          <td style="padding: 10px;">标准类更新附件</td>
        </tr>
        <tr>
          <td style="width: 50%; height: 40px;">
            <file-upload :file-name-limit="20" :font-top="3" :file.sync="form.standardFileId"/>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import FileUpload from "../../../../components/file/file-upload";
  import TooltopText from "../../../../components/min/tooltop-text";
  import {downloadFile} from "../../../../api/business/file/file";
  import {downloadResFile} from "../../../../util/util";
  import {processLowDetail} from "../../../../api/business/process_low/process_low";
  export default {
    name: "standardUploadForm",
    components: {TooltopText, FileUpload},
    props: {
      id: {
        type: String,
      },
      trigger: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        form: {},
        data: {},
      }
    },
    methods: {
      handlerDownload(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      },
      init() {
        processLowDetail(this.id).then(res => {
          this.data = res.data.data;
        })
      },
      submit() {
        if (this.validatenull(this.form.standardFileId)) {
          this.$message({type: "warning", message: "请上传标准类更新附件"});
          return;
        }

        let copy = {};
        copy.standardFileId = this.form.standardFileId.id;
        copy.standardFileName = this.form.standardFileId.name;
        this.trigger(copy);
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .check-file-table td {
    border: 1px solid #EBEEF5;
  }
</style>
