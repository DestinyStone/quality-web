<template>
  <div>
    <basic-container class="check-detail" v-show="showMain">
      <div :style="{height: height + 'px'}" style="overflow: auto">
        <div style="display: flex; justify-content: space-between;">
          <fix-color-title>
            <div style="display: flex; justify-content: space-between;">
              <div>检查法确认书</div>
            </div>
          </fix-color-title>
          <div style="display: flex;" v-if="isOperator">
            <div style="color: #25a5f7; cursor: pointer;" v-if="data.bpmStatus === 3" @click="handlerUpdate">修改</div>
            <div style="color: #25a5f7; cursor: pointer; margin-left: 10px;" @click="handlerOpenApproveDetail">审批过程</div>
            <div style="color: #25a5f7; cursor: pointer; margin-left: 10px;" @click="handlerReback">返回</div>
          </div>
        </div>
        <el-divider></el-divider>
        <title-container title="基本信息" :isExistDivider="false">
          <div style="padding: 10px;">
            <table
              class="message-table"
              style="width: 100%;"
            >
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
              <tr>
                <td class="message-title">管理编号</td>
                <td class="message-value">{{data.code}}</td>
                <td class="message-title">种类</td>
                <td class="message-value">{{typeDict[data.type]}}</td>
              </tr>
              <tr>
                <td class="message-title">公司名称/部门名称</td>
                <td class="message-value" colspan="3">{{data.createDeptName}}</td>
              </tr>
              <tr>
                <td class="message-title">产品编号或车种类</td>
                <td class="message-value">{{data.designation}}</td>
                <td class="message-title">品名或车辆型号</td>
                <td class="message-value">{{data.name}}</td>
              </tr>
              <tr>
                <td class="message-title">要求确认的主要内容</td>
                <td class="message-value" colspan="3">{{data.confirmContent}}</td>
              </tr>
              <tr>
                <td class="message-title">新规格及变更内容</td>
                <td class="message-value">{{data.changeContent}}</td>
                <td class="message-title">图片</td>
                <td class="message-value">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="data.changeImageUrl"
                    fit="contain"></el-image>
                </td>
              </tr>
              <tr>
                <td class="message-title">相关部门意见</td>
                <td class="message-value">{{data.deptIdea}}</td>
                <td class="message-title">检查管理部门意见</td>
                <td class="message-value">{{data.checkDeptIdea}}</td>
              </tr>
            </table>
          </div>
        </title-container>
        <!--      <title-container style="margin-top: 30px;" title="确认回答信息" :isExistDivider="false">-->
        <!--        <div style="padding: 10px;">-->
        <!--          <table-->
        <!--            class="message-table"-->
        <!--            style="width: 100%;"-->
        <!--          >-->
        <!--            <col width="15%" />-->
        <!--            <col width="85%" />-->
        <!--            <tr>-->
        <!--              <td class="message-title">回答结果</td>-->
        <!--              <td class="message-value"></td>-->
        <!--            </tr>-->
        <!--            <tr>-->
        <!--              <td class="message-title">回答说明</td>-->
        <!--              <td class="message-value"></td>-->
        <!--            </tr>-->
        <!--          </table>-->
        <!--        </div>-->
        <!--      </title-container>-->
        <title-container  style="margin-top: 30px;" title="附件" :isExistDivider="false">
          <el-table
            :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
            :cell-style="{'textAlign': 'center'}"
            :data="data.extendFile"
            border
            height="250"
            style="width: 100%; margin-top: 10px;">
            <el-table-column
              show-overflow-tooltip
              prop="providerExcelFileName"
              label="供应商承认零件检查法Excel文件">
              <template slot-scope="scope">
                <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.providerExcelFileId)">
                  {{scope.row.providerExcelFileName}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="providerSignatureName"
              label="供应商承认零件检查法签字文件">
              <template slot-scope="scope">
                <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.providerSignatureId)">
                  {{scope.row.providerSignatureName}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              v-if="isShowToyotaExcelFileColumn"
              prop="toyotaExcelFileName"
              label="丰田承认零件检查法Excel文件">
              <template slot-scope="scope">
                <div style="cursor: pointer; color: #25a5f7;" @click="handlerDownload(scope.row.toyotaExcelFileId)">
                  {{scope.row.toyotaExcelFileName}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="isAccessUploadExcelFile"
              label="丰田承认零件检查法Excel文件">
              <template slot-scope="scope">
                <file-upload @upload="handlerUpload" @remove="$emit('upload')"/>
              </template>
            </el-table-column>
            <!--          <el-table-column-->
            <!--            label="丰田承认零件检查法签字文件">-->
            <!--          </el-table-column>-->
          </el-table>
        </title-container>
      </div>
      <el-dialog title="详情"
                 :visible.sync="showApproveDetailDialog"
                 width="50%"
                 append-to-body>
        <approve-detail :bus-id="id" v-if="showApproveDetailDialog"/>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="showApproveDetailDialog = false">关 闭</el-button>
      </span>
      </el-dialog>
    </basic-container>
    <check-submit v-if="showUpdate" @cancel="handlerCancel" :update="update" :is-update="true" :id="id"/>
  </div>
</template>

<script>
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import TitleContainer from "../../work/component/title-container";
  import {detailCheck, updateCheck} from "../../../../api/check/check";
  import FileUpload from "../../../../components/file/file-upload";
  import ApproveDetail from "../../components/approve_detail";
  import CheckSaveList from "../check_save_list";
  import CheckSubmit from "./check_submit";
  import {downloadFile} from "../../../../api/business/file/file";
  import {downloadResFile} from "../../../../util/util";
  export default {
    name: "checkDetail",
    components: {CheckSubmit, CheckSaveList, ApproveDetail, FileUpload, TitleContainer, FixColorTitle},
    props: {
      id: {
        type: String,
      },
      isOperator: {
        type: Boolean,
        default: true,
      },
      isAccessUploadExcelFile: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        data: {},
        windowHeight: 0,
        typeDict: {0: "新规格",1: "工变", 2: "设变", 3: "写误订正", 4: "只变更检查法方法"},
        isShowToyotaExcelFileColumn: false,
        showApproveDetailDialog: false,
        showMain: true,
        showUpdate: false,
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      height() {
        return this.windowHeight - 170;
      }
    },
    methods: {
      handlerDownload(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      },
      update(form) {
        updateCheck(this.id, form).then(() => {
          this.$message({type: "success", message: "修订成功"});
          this.$emit("reback");
        })
      },
      handlerCancel() {
        this.showMain = true;
        this.showUpdate = false;
      },
      handlerUpdate() {
        this.showMain = false;
        this.showUpdate = true;
      },
      handlerOpenApproveDetail() {
        this.showApproveDetailDialog = true;
      },
      handlerUpload(data) {
        this.$emit('upload', data);
      },
      handlerReback() {
        this.$emit("reback");
      },
      init() {
        detailCheck(this.id).then(res => {
          this.data = res.data.data;
          this.data.extendFile = [{
            providerExcelFileId: this.data.providerExcelFileId,
            providerExcelFileName: this.data.providerExcelFileName,
            providerSignatureId: this.data.providerSignatureId,
            providerSignatureName: this.data.providerSignatureName,
            toyotaExcelFileId: this.data.toyotaExcelFileId,
            toyotaExcelFileName: this.data.toyotaExcelFileName,
          }];
          if (!this.validatenull(this.data.toyotaExcelFileName)) {
            this.isShowToyotaExcelFileColumn = true;
          }
        })
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .check-detail .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
  }
  .check-detail .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
  .check-detail .message-table .message-content {

  }
</style>
