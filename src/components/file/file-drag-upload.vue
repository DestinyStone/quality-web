<template>
  <div style="display: flex;">
    <el-upload
      :http-request="handlerUpload"
      :on-remove="handlerRemove"
      :show-file-list="false"
      drag
      :file-list="fileList"
      :limit="limit">
      <div>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">请粘贴图片显示区</div>
        <div class="el-upload__tip" slot="tip"></div>
      </div>
<!--      <div style="display: flex;">-->
<!--        <i><el-button size="mini" type="primary">点击上传</el-button></i>-->
<!--        <div @click.stop style="margin-left: 20px;">-->
<!--          <div v-if="file.name !== null && file.name !== undefined">-->
<!--            {{file.name}}-->
<!--            <i @click="handlerRemove" class="el-icon-close"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </el-upload>
    <div v-if="!validatenull(file)" >
      <el-image
        :src="file.url"
        style="height: 180px; margin-left: 40px; border-radius: 10px"
        :preview-src-list="[file.url]"
        fit="contain"></el-image>
    </div>
  </div>
</template>

<script>
  import {uploadFile} from "../../api/business/file/file";

  export default {
    name: "fileDragUpload",
    props: {
      file: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    data() {
      return {
        fileCount: 0,
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
      fileValidate(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式 !');
          this.reload++;
          return;
        }
        return isJPG;
      },
      handlerUpload(request) {
        if (!this.fileValidate(request.file)) {
          return;
        }

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
