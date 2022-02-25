<template>
  <div class="process-low-basic-message">
    <div>
      <div class="title-item">不良现状</div>
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
            <td class="message-title">不良编号</td>
            <td class="message-value">{{data.code}}</td>
            <td class="message-title">标题</td>
            <td class="message-value">{{data.title}}</td>
          </tr>
          <tr>
            <td class="message-title">不良分类</td>
            <td class="message-value">{{typeMap[data.type]}}</td>
            <td class="message-title">不良等级</td>
            <td class="message-value">{{levelMap[data.level]}}</td>
          </tr>
          <tr>
            <td class="message-title">发生地点</td>
            <td class="message-value">{{triggerAddressMap[data.triggerAddress]}}</td>
            <td class="message-title">发生工序</td>
            <td class="message-value">{{triggerProcessMap[data.triggerProcess]}}</td>
          </tr>
          <tr>
            <td class="message-title">品名</td>
            <td class="message-value">{{data.name}}</td>
            <td class="message-title">品番号</td>
            <td class="message-value">{{data.designation}}</td>
          </tr>
          <tr>
            <td class="message-title">责任部门/厂家</td>
            <td class="message-value">{{data.dutyDept}}</td>
            <td class="message-title">机型</td>
            <td class="message-value">{{apparatusMap[data.apparatusType]}}</td>
          </tr>
          <tr>
            <td class="message-title">发现数量</td>
            <td class="message-value">{{data.findQuantity}}</td>
            <td class="message-title">发现时间</td>
            <td class="message-value">{{data.findTime}}</td>
          </tr>
          <tr>
            <td class="message-title">不良内容</td>
            <td class="message-value" colspan="3">{{data.content}}</td>
          </tr>
          <tr>
            <td class="message-title">拜托事项</td>
            <td class="message-value" colspan="3">{{data.pleaseContent}}</td>
          </tr>
          <tr>
            <td class="message-title">测量结果</td>
            <td class="message-value"  colspan="3">{{data.testResult}}</td>
          </tr>
          <tr>
            <td class="message-title">关联部件确认(性能, 作业等影响)</td>
            <td class="message-value" colspan="3">{{data.correlationConfirm}}</td>
          </tr>
          <tr>
            <td class="message-title">不良图片</td>
            <td class="message-value">
              <div>
                <el-image
                  v-for="item in (data.imgReportList || [])"
                  style="width: 100px; height: 100px"
                  :src="item.url"
                  fit="contain"></el-image>
              </div>
            </td>
            <td class="message-title">不良图片说明</td>
            <td class="message-value">{{data.imgRemark}}</td>
          </tr>
          <tr>
            <td class="message-title">不良测定报告</td>
            <td class="message-value">
              <div v-if="validatenull(data.testReportFileName)" style="color: #C0C4CC;">
                无文件
              </div>
              <div style="color: #2d8cf0; cursor: pointer;" @click="handlerDownLoad(data.testReportFileId)">
                {{data.testReportFileName}}
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="title-item">临时处理<span style="color: #C0C4CC; font-weight: 100; margin-left: 20px;">判断人: (xxAxxB不良临时对策方案必须经科长以上认可！其他不良必须由系长认可)</span></div>
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
            <td class="message-title">流出防止</td>
            <td class="message-value">{{data.banOutflowRemark}}</td>
            <td class="message-title">不良追溯</td>
            <td class="message-value">{{data.formRemark}}</td>
          </tr>
          <tr>
            <td class="message-title">生产对应</td>
            <td class="message-value">{{data.productRemark}}</td>
            <td class="message-title">异常件的返修方法, 关联部品的更换， 返修完毕的确认</td>
            <td class="message-value">{{data.rebackFixConfirm}}</td>
          </tr>
          <tr>
            <td class="message-title">不良排查及隔离(外购品, 毛坯, 在制品, 完成品, 分总成, 发动机)</td>
            <td class="message-value">
              <el-image
                v-if="!validatenull(data.separateFile)"
                style="width: 100px; height: 100px"
                :src="data.separateFile && data.separateFile.url"
                fit="contain"></el-image>
            </td>
            <td class="message-title">不良排查及隔离图片源文件</td>
            <td class="message-value">
              <div v-if="validatenull(data.separateFileDependName)" style="color: #C0C4CC;">
                无文件
              </div>
              <div style="color: #2d8cf0; cursor: pointer;" @click="handlerDownLoad(data.separateFileDependId)">
                {{data.separateFileDependName}}
              </div>
            </td>
          </tr>
          <tr>
            <td class="message-title">变化点(与不良内容有因果关系的变化点)</td>
            <td class="message-value">{{data.changeRemark}}</td>
            <td class="message-title">是否发行业务通知书</td>
            <td class="message-value">{{data.isBusinessFile === 1 ? "是" : "否"}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <div class="title-item">附件</div>
      <div style="margin-top: 10px;">
        <el-table
          :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center', fontWeight: 700, color: 'rgba(0,0,0,.85)',fontSize: '12px'}"
          :cell-style="{'textAlign': 'center'}"
          :data="data.busincessFiles || []"
          border
          height="200px"
          style="width: 100%">
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
              <div style="cursor: pointer; color: #F56C6C;" @click="handlerDownLoad(scope.row.id)">下载</div>
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

  export default {
    name: "processLowBasicMessage",
    data() {
      return {
        typeMap: {0: "外购件", 1: "内制件", 2: "其他"},
        triggerAddressMap: {0: "TNGA#1", 1: "TNGA#2", 2: "TNGA#3", 3: "TNGA#4", 4: "TNGA#5", 5: "TNGA#6"},
        triggerProcessMap: {0: "铸造钢体", 1: "铸造缸盖", 2: "缸盖加工", 3: "缸体加工", 4: "曲轴加工", 5: "连杆加工", 6: "凸轮轴加工"},
        levelMap: {0: "R", 1: "S", 2: "A", 3: "B", 4: "C", 5: "批量", 6: "停线"},
        apparatusMap: {0: "TNAG2.0"},
      }
    },
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      handlerDownLoad(fileId) {
        downloadFile(fileId).then(res => {
          downloadResFile(res);
        })
      }
    }
  }
</script>

<style scoped>
  .process-low-basic-message .title-item{
    font-weight: 700;
  }
  .process-low-basic-message .message-table {

  }
  .process-low-basic-message .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
  }
  .process-low-basic-message .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
  .process-low-basic-message .message-table .message-content {

  }
</style>
