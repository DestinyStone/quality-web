<template>
  <div class="check-basic-message">
    <div>
      <div style="margin-top: 10px;">
        <table
          class="message-table"
          style="width: 100%;"
        >
          <col width="15%" />
          <col width="35%" />
          <col width="15%" />
          <col width="35%" />
          <tr>
            <td class="message-title">发生原因</td>
            <td class="message-value">{{userData.analyseTriggerCause}}</td>
            <td class="message-title">流出原因</td>
            <td class="message-value">{{userData.analyseOutCause}}</td>
          </tr>
          <tr>
            <td class="message-title">发生对策</td>
            <td class="message-value">{{userData.analyseTriggerStrategy}}</td>
            <td class="message-title">流出对策</td>
            <td class="message-value">{{userData.analyseOutStrategy}}</td>
          </tr>
          <tr>
            <td class="message-title">其他</td>
            <td class="message-value">{{userData.analyseOther}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="title-item">相关附件</div>
      <div>
        <el-table
          :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
          :cell-style="{'textAlign': 'center'}"
          :data="userData.analyseExtendsFileList"
          border
          height="250"
          style="width: 100%; margin-top: 10px;">
          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="附件名称">
          </el-table-column>
          <el-table-column
            prop="createUserName"
            label="操作人">
          </el-table-column>
          <el-table-column
            prop="createDeptName"
            label="所属部门">
          </el-table-column>
          <el-table-column
            prop="createTime"
            width="180"
            label="操作时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div  style="cursor: pointer; color: #F56C6C;" @click="handlerDownload(scope.row.id)">下载</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {downloadFile} from "../../../../api/business/file/file";
  import {downloadResFile} from "../../../../util/util";
  import {qprDetail} from "../../../../api/business/out_buy_low/qpr";

  export default {
    name: "check-basic-message",
    props: {
      id: {
        type: String
      },
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        initData: {}
      }
    },
    methods: {
      handlerDownload(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      },
      init() {
        if (this.validatenull(this.id)) {
          return;
        }
        qprDetail(this.id).then(res => {
          this.initData = res.data.data;
        })
      }
    },
    computed: {
      userData() {
        if (this.validatenull(this.id)) {
          return this.data;
        }
        return this.initData;
      },
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .check-basic-message .title-item{
    font-weight: 700;
  }
  .check-basic-message .message-table {

  }
  .check-basic-message .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
  }
  .check-basic-message .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
  .check-basic-message .message-table .message-content {

  }
</style>
