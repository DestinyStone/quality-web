<template>
  <basic-container>
    <process-low-save-content/>
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
        form: {},
        rules: {
          title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
          type: [{ required: true, message: '请输入不良分类', trigger: 'blur' },],
          level: [{ required: true, message: '请选择不良等级', trigger: 'blur' },],
          designation: [{ required: true, message: '请输入品番号', trigger: 'blur' },],
          name: [{ required: true, message: '请输入品名', trigger: 'blur' },],
          dutyDept: [{ required: true, message: '请输入责任部门/厂家', trigger: 'blur' },],
          apparatusType: [{ required: true, message: '请选择机型', trigger: 'blur' },],
          findQuantity: [{ required: true, message: '请输入发现数量', trigger: 'blur' },],
          findTime: [{ required: true, message: '请选择发现时间', trigger: 'blur' },],
          content: [{ required: true, message: '请输入不良内容', trigger: 'blur' },],
          pleaseContent: [{ required: true, message: '请输入拜托事项', trigger: 'blur' },],
          testResult: [{ required: true, message: '请输入测量结果', trigger: 'blur' },],
          correlationConfirm: [{ required: true, message: '请输入关联部件确认', trigger: 'blur' },],
          banOutflowRemark: [{ required: true, message: '请输入流出防止', trigger: 'blur' },],
          formRemark: [{ required: true, message: '请输入不良追溯', trigger: 'blur' },],
          productRemark: [{ required: true, message: '请输入生产对应', trigger: 'blur' },],
          separateFileId: [{ required: true, message: '请上传不良排查及隔离文件', trigger: 'blur' },],
          changeRemark: [{ required: true, message: '请输入变化点', trigger: 'blur' },],
          imgReportIds: [{ required: true, message: '请上传不良图示/测定报告(', trigger: 'blur' },],
          triggerAddress: [{ required: true, message: '请选择发生地点', trigger: 'blur' },],
          triggerProcess: [{ required: true, message: '请选择发生工序', trigger: 'blur' },],
        },
        levelDict: [
          {value: 0, label: "R"},
          {value: 1, label: "S"},
          {value: 2, label: "A"},
          {value: 3, label: "B"},
          {value: 4, label: "C"},
          {value: 5, label: "批量"},
          {value: 6, label: "停线"},
        ],
        apparatusTypeDict: [
          {value: 0, label: "TNGA2.0"},
        ],
        triggerAddressDict: [
          {value: 0, label: "TNGA#1"},
          {value: 1, label: "TNGA#2"},
          {value: 2, label: "TNGA#3"},
          {value: 3, label: "TNGA#4"},
          {value: 4, label: "TNGA#5"},
          {value: 5, label: "TNGA#6"},
        ],
        triggerProcessDict: [
          {value: 0, label: "铸造钢体"},
          {value: 1, label: "铸造缸盖"},
          {value: 2, label: "缸盖加工"},
          {value: 3, label: "缸体加工"},
          {value: 4, label: "曲轴加工"},
          {value: 5, label: "连杆加工"},
          {value: 6, label: "凸轮轴加工"},
        ],
        tableUpdate: 0
      }
    },
    props: {
      isPublic: {
        type: Boolean,
        default: false,
      },
      isExistBorder: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      'form.busincessIdFiles'() {
        this.$forceUpdate();
      }
    },
    methods: {
      handlerClose() {
        if (this.isPublic) {
          this.$emit("close");
          return
        }
        this.$router.push({path: "/business/process_low/process_low_list"})
      },
      removeBusincessIdFiles(row) {
        this.$confirm("是否删除改文件?", "提示", {confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"}).then(() => {
          for(let key in this.form.busincessIdFiles) {
            let item = this.form.busincessIdFiles[key];
            if (item.id === row.id) {
              this.form.busincessIdFiles.splice(key, 1);
              break;
            }
          }

          this.handlerBusincessUpload();
        });
      },
      handlerBusincessUpload() {
        this.tableUpdate++;
      },
      init() {
        this.loadInitProperties();
      },
      loadInitProperties() {
        this.$set(this.form, "type", 0);
        this.$set(this.form, "isBusinessFile", 1);
      },
      handlerSubmit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return;
          }
          let formCopy = JSON.parse(JSON.stringify(this.form));

          if (!this.validatenull(this.form.imgReportIds)) {
            formCopy.imgReportIds = this.form.imgReportIds.map(item => item.id).join(",");
          }

          if (!this.validatenull(this.form.testReportFileId)) {
            formCopy.testReportFileId = this.form.testReportFileId.id;
            formCopy.testReportFileName = this.form.testReportFileId.name;
          }
          if (!this.validatenull(this.form.separateFileId)) {
            formCopy.separateFileId = this.form.separateFileId.id;
            formCopy.separateFileName = this.form.separateFileId.name;
          }

          if (!this.validatenull(this.form.separateFileDependId)) {
            formCopy.separateFileDependId = this.form.separateFileDependId.id;
            formCopy.separateFileDependName = this.form.separateFileDependId.name;
          }


          if (this.validatenull(formCopy.busincessIdFiles)) {
            formCopy.busincessIdFiles = [];
          }

          if (formCopy.busincessIdFiles.length === 0) {
            formCopy.busincessIdFiles = null;
          }

          if (formCopy.isBusinessFile === 1 && formCopy.busincessIdFiles === null) {
            this.$message({type: "warning", message: "请至少提交一个相关附件"});
            return;
          }
          if (formCopy.isBusinessFile === 1) {
            formCopy.busincessIdFiles = this.form.busincessIdFiles.map(item => item.id).join(",");
          }

          this.save(formCopy);
        });
      },
      save(data) {
        processLowSave(data).then(() => {
          this.$message({type: "success", message: "新增成功"});
          this.$router.push({path: "/business/process_low/process_low_list"})
        })
      },
  },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
