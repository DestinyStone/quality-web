<template>
  <div>
    <el-upload
      :http-request="handlerUpload"
      :on-remove="handlerRemove"
      :show-file-list="false"
      :file-list="fileList"
      :limit="limit">
      <div style="display: flex;">
        <i><el-button size="mini" >点击上传</el-button></i>
        <div @click.stop style="margin-left: 20px;">
          <div v-if="file.name !== null && file.name !== undefined">
            <div style="display: flex;">
              <tooltop-text :text="file.name" :limit="fileNameLimit"/>
              <div style="display: flex; justify-content: center; flex-flow: column;">
                <i @click="handlerRemove" class="el-icon-close"/>
              </div>
            </div>
          </div>
          <div style="color: #C0C4CC;" v-if="validatenull(file)">
            未选择任何文件
          </div>
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script>
  import {uploadFile} from "../../api/business/file/file";
  import TooltopText from "../min/tooltop-text";

  export default {
    name: "fileUpload",
    components: {TooltopText},
    props: {
      file: {
        type: Object,
        default() {
          return {}
        }
      },
      fileNameLimit: {
        type: Number,
        default: 100,
      }
    },
    data() {
      return {
        fileCount: 0,
        limit: 1,
        fileList: [],
      }
    },
    watch: {
      file() {
        this.$emit("update:file", this.file);
      }
    },
    methods: {
      handlerRemove() {
        this.file = {};
        this.fileList.splice(0, this.fileList.length);
        this.$forceUpdate();
        this.$emit("update:file", {});
        this.$emit("remove");
      },
      handlerUpload(request) {
        let formData = new FormData();
        formData.append("file", request.file);
        uploadFile(formData).then(res => {
          this.file = res.data.data;
          this.$set(this.file, "name",  this.file.name);
          return res;
        }).then((res) => {
          this.$emit("upload", res.data.data);
          this.$forceUpdate();
        })
      },
    }
  }
</script>

<style scoped>

</style>
