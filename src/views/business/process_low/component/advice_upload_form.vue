<template>
  <div>
    <div style="display: flex;">
      <div style="font-size: 16px; font-weight: 700; width: 60px;" >当前: </div>
      <table class="check-file-table" style="width: 100%; text-align: center; border-collapse:collapse;">
        <tr>
          <td style="padding: 10px;">业务通知书</td>
          <td>放行通知书</td>
        </tr>
        <tr>
          <td style="width: 50%; height: 40px;">
            <div v-if="validatenull(data.businessAdviceFileName)">
              暂无文件
            </div>
            <div v-else style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(data.businessAdviceFileId)">
              <tooltop-text :text="data.businessAdviceFileName" :limit="20"/>
            </div>
          </td>
          <td style="width: 50%">
            <div v-if="validatenull(data.passAdviceFileName)">
              暂无文件
            </div>
            <div v-else style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(data.passAdviceFileId)">
              <tooltop-text :text="data.passAdviceFileName" :limit="20"/>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div style="display: flex; margin-top: 30px;" >
      <div style="font-size: 16px; font-weight: 700; width: 60px;" >更新: </div>
      <table class="check-file-table" style="width: 100%; text-align: center; border-collapse:collapse;">
        <tr>
          <td style="padding: 10px;">业务通知书</td>
          <td>放行通知书</td>
        </tr>
        <tr>
          <td style="width: 50%; height: 40px;">
            <file-upload :file-name-limit="20" :font-top="3" :file.sync="form.businessAdviceFileId"/>
          </td>
          <td style="width: 50%">
            <file-upload :file-name-limit="20" :font-top="3" :file.sync="form.passAdviceFileId"/>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import FileUpload from "../../../../components/file/file-upload";
  import {processLowDetail} from "../../../../api/business/process_low/process_low";
  import TooltopText from "../../../../components/min/tooltop-text";
  import {downloadFile} from "../../../../api/business/file/file";
  import {downloadResFile} from "../../../../util/util";
  export default {
    name: "adviceUploadForm",
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
        if (this.validatenull(this.form.businessAdviceFileId) && this.validatenull(this.form.passAdviceFileId)) {
          this.$message({type: "warning", message: "请上传业务通知书或放行通知书"});
          return;
        }

        let copy = {};
        if (!this.validatenull(this.form.businessAdviceFileId)) {
          copy.businessAdviceFileId = this.form.businessAdviceFileId.id;
          copy.businessAdviceFileName = this.form.businessAdviceFileId.name;
        }

        if (!this.validatenull(this.form.passAdviceFileId)) {
          copy.passAdviceFileId = this.form.passAdviceFileId.id;
          copy.passAdviceFileName = this.form.passAdviceFileId.name;
        }
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
