<template>
  <div>
    <basic-container>
      <div style="display: flex; justify-content: center;">
        <avue-form :option="option"
                   v-model="form"
                   @tab-click="handleTabClick"
                   @submit="handleSubmit">
          <template slot="avatar">
            <div style="display: flex;">
              <el-upload
                :http-request="handlerUpload"
                :show-file-list="false"
                drag
                :file-list="fileList">
                <div>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">请粘贴图片显示区</div>
                  <div class="el-upload__tip" slot="tip"></div>
                </div>
              </el-upload>
              <div v-if="form.avatar">
                <el-image
                  :src="form.avatar"
                  style="height: 180px; margin-left: 40px; border-radius: 10px"
                  :preview-src-list="[form.avatar]"
                  fit="contain"></el-image>
              </div>
            </div>
          </template>
        </avue-form>
      </div>
    </basic-container>
  </div>
</template>

<script>
  import option from "@/option/user/info";
  import {getUserInfo, updateInfo, updatePassword} from "@/api/system/user";
  import md5 from 'js-md5';
  import func from "@/util/func";
  import EmailTemplate from "../business/email/email_template";
  import FileDragUpload from "../../components/file/file-drag-upload";
  import {uploadFile} from "../../api/business/file/file";


  export default {
    components: {FileDragUpload, EmailTemplate},
    data() {
      return {
        index: 0,
        option: option,
        form: {},
        fileList: [],
      };
    },
    created() {
      this.handleWitch();
    },
    methods: {
      fileValidate(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式 !');
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
          this.$set(this.form, 'avatar', res.data.data.url);
          return res;
        });
      },
      handleSubmit(form, done) {
        if (this.index === 0) {
          updateInfo(form).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "修改信息成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
            done();
          }, error => {
            window.console.log(error);
            done();
          })
        } else {
          updatePassword(md5(form.oldPassword), md5(form.newPassword), md5(form.newPassword1),  Base64.encode(form.newPassword.slice(0, 3))).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "修改密码成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
            done();
          }, error => {
            window.console.log(error);
            done();
          })
        }
      },
      handleWitch() {
        if (this.index === 0) {
          getUserInfo().then(res => {
            const user = res.data.data;
            this.form = {
              id: user.id,
              avatar: user.avatar,
              name: user.name,
              realName: user.realName,
              phone: user.phone,
              email: user.email,
            }
          });
        }
      },
      handleTabClick(tabs) {
        this.index = func.toInt(tabs.index);
        this.handleWitch();
      }
    }
  };
</script>

<style>
</style>
