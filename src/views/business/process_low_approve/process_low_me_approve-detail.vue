<template>
  <basic-container class="process-low-me-approve-detail">
    <fix-color-title>不良联络书</fix-color-title>
    <el-divider></el-divider>
    <div :style="{height: tableHeight}" style="overflow: auto;">
      <extensible-container title="不良信息" :default-status="false">
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
                <td class="message-value">222222</td>
                <td class="message-title">标题</td>
                <td class="message-value">3333</td>
              </tr>
              <tr>
                <td class="message-title">不良分类</td>
                <td class="message-value">222222</td>
                <td class="message-title">品番号</td>
                <td class="message-value">3333</td>
              </tr>
              <tr>
                <td class="message-title">发生地点</td>
                <td class="message-value">222222</td>
                <td class="message-title">发生工序</td>
                <td class="message-value">3333</td>
              </tr>
              <tr>
                <td class="message-title">发现数量</td>
                <td class="message-value">发现数量</td>
                <td class="message-title">发现时间</td>
                <td class="message-value">3333</td>
              </tr>
              <tr>
                <td class="message-title">责任部门/厂家</td>
                <td class="message-value">222222</td>
                <td class="message-title">不良内容</td>
                <td class="message-value">3333</td>
              </tr>
              <tr>
                <td class="message-title">测量结果</td>
                <td class="message-value">222222</td>
                <td class="message-title">关联部件确认(性能, 作业等影响)</td>
                <td class="message-value">3333</td>
              </tr>
              <tr>
                <td class="message-title">不良图片</td>
                <td class="message-value">222222</td>
                <td class="message-title">不良图片说明</td>
                <td class="message-value">3333</td>
              </tr>
              <tr>
                <td class="message-title">不良测定报告</td>
                <td class="message-value">222222</td>
              </tr>
            </table>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <div class="title-item">临时处理</div>
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
                <td class="message-value">222222</td>
                <td class="message-title">不良追溯</td>
                <td class="message-value">3333</td>
              </tr>
              <tr>
                <td class="message-title">生成对应</td>
                <td class="message-value">222222</td>
                <td class="message-title">异常件的返修方法, 关联部品的更换， 返修完毕的确认</td>
                <td class="message-value">3333</td>
              </tr>
              <tr>
                <td class="message-title">不良排查及隔离(外购品, 毛坯, 在制品, 完成品, 分总成, 发动机)</td>
                <td class="message-value">222222</td>
                <td class="message-title">变化点(与不良内容有因果关系的变化点)</td>
                <td class="message-value">3333</td>
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
              :data="accessoryData"
              border
              height="100px"
              style="width: 100%">
              <el-table-column
                label="附件分类">
              </el-table-column>
              <el-table-column
                label="附件名称">
              </el-table-column>
              <el-table-column
                label="上传时间">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </extensible-container>
      <extensible-container title="原因调查, 对策实施填写" :default-status="false">
        <el-form :model="causeForm" :rules="causeRules" ref="causeForm" label-width="150px">
          <div >
            <div style="font-weight: 700;"><span style="color: red; margin-right: 3px;">*</span>不良分析调查</div>
            <div style="position:relative; top: -20px;">
              <el-form-item label="" prop="banOutflowRemark">
                <el-input v-model="causeForm.rebackFixConfirm"
                          type="textarea"
                          :rows="4"
                          resize="none" placeholder="请输入不良分析调查"></el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div style="font-weight: 700;"><span style="color: red; margin-right: 3px;">*</span>不良分析调查图片</div>
            <div style="position:relative; top: -20px;">
              <el-form-item label="" prop="banOutflowRemark">
                <file-drag-upload/>
              </el-form-item>
            </div>
          </div>
          <div style=" font-weight: 700;"><span style="color: red; margin-right: 3px;">*</span>再发生对策防止</div>
          <el-form-item label="发生原因类型" prop="caseType" style="margin-top: 30px;">
            <el-select v-model="causeForm.caseType" placeholder="请选择发生原因类型" style="width: 100%;">
              <el-option
                v-for="item in caseTypeDict"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发生对策" prop="caseType">
            <el-input v-model="causeForm.rebackFixConfirm"
                      type="textarea"
                      :rows="4"
                      resize="none" placeholder="请输入发生对策"></el-input>
          </el-form-item>
          <el-form-item label="流出原因" prop="caseType">
            <el-input v-model="causeForm.rebackFixConfirm"
                      type="textarea"
                      :rows="4"
                      resize="none" placeholder="请输入流出原因"></el-input>
          </el-form-item>
          <el-form-item label="流出对策" prop="caseType">
            <el-input v-model="causeForm.rebackFixConfirm"
                      type="textarea"
                      :rows="4"
                      resize="none" placeholder="请输入流出对策"></el-input>
          </el-form-item>
          <el-form-item label="是否上传标准类更新" prop="isStandardUpdate">
            <el-radio :label="1" v-model="causeForm.isStandardUpdate">是</el-radio>
            <el-radio :label="0" v-model="causeForm.isStandardUpdate">否</el-radio>
          </el-form-item>
          <el-form-item label="是否上传放行通知书" prop="caseType">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-form-item>
          <div style=" font-weight: 700;">附件上次</div>
          <el-form-item label="发生对策附件" prop="caseType">
            <file-upload/>
          </el-form-item>
          <el-form-item label="流程对策附件" prop="caseType">
            <file-upload/>
          </el-form-item>
          <el-form-item label="标准类文件附件" prop="caseType" v-if="causeForm.isStandardUpdate === 1">
            <file-upload/>
          </el-form-item>
        </el-form>
      </extensible-container>
      <extensible-container title="原因调查, 对策实施填写" :default-status="true">
        <table
          class="message-table"
          style="width: 100%;"
        >
          <col width="15%" />
          <col width="35%" />
          <col width="15%" />
          <col width="35%" />
          <tr>
            <td class="message-title">不良分析调查</td>
            <td class="message-value">222222</td>
            <td class="message-title">不良分析图片</td>
            <td class="message-value">3333</td>
          </tr>
          <tr>
            <td class="message-title">发生原因类型</td>
            <td class="message-value">222222</td>
            <td class="message-title">发生原因</td>
            <td class="message-value">3333</td>
          </tr>
          <tr>
            <td class="message-title">发生对策</td>
            <td class="message-value">222222</td>
            <td class="message-title">流程原因</td>
            <td class="message-value">3333</td>
          </tr>
          <tr>
            <td class="message-title">流出对策</td>
            <td class="message-value">222222</td>
            <td class="message-title">是否上次标准类型更新</td>
            <td class="message-value">3333</td>
          </tr>
        </table>
        <div style=" font-weight: 700; margin-top: 40px;">附件</div>
        <div>
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
              <td class="message-value">222222</td>
              <td class="message-title">不良追溯</td>
              <td class="message-value">3333</td>
            </tr>
            <tr>
              <td class="message-title">生成对应</td>
              <td class="message-value">222222</td>
              <td class="message-title">异常件的返修方法, 关联部品的更换， 返修完毕的确认</td>
              <td class="message-value">3333</td>
            </tr>
            <tr>
              <td class="message-title">不良排查及隔离(外购品, 毛坯, 在制品, 完成品, 分总成, 发动机)</td>
              <td class="message-value">222222</td>
              <td class="message-title">变化点(与不良内容有因果关系的变化点)</td>
              <td class="message-value">3333</td>
            </tr>
          </table>
        </div>
        <el-form :model="causeForm" :rules="causeRules" ref="causeForm" label-width="150px">
          <div style=" font-weight: 700; margin-top: 40px;">附件上传</div>
          <el-form-item label="放行通知书附件" prop="caseType" style="margin-top: 20px;">
            <file-upload/>
          </el-form-item>
          <el-form-item label="业务通知书附件" prop="caseType">
            <file-upload/>
          </el-form-item>
        </el-form>
      </extensible-container>
    </div>
    <div>
      <el-divider></el-divider>
      <div style="display: flex; justify-content: center;">
        <el-button>返回</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </div>

  </basic-container>
</template>

<script>
  import ExtensibleContainer from "../../../components/min/extensible_container";
  import FixColorTitle from "../../../components/min/fix_color_title";
  import FileDragUpload from "../../../components/file/file-drag-upload";
  import FileUpload from "../../../components/file/file-upload";
  export default {
    name: "processLowMeApproveDetail",
    components: {FileUpload, FileDragUpload, FixColorTitle, ExtensibleContainer},
    data() {
      return {
        windowHeight: 0,
        accessoryData: [],
        causeForm: {},
        causeRules: {},
        caseTypeDict: [
          {label: "异常处理", value: 0},
          {label: "变化点管理", value: 1},
          {label: "良品条件设定", value: 2},
          {label: "维持管理", value: 3},
          {label: "标准作业", value: 4},
          {label: "其他", value: 5},
        ]
      }
    },
    methods: {

    },
    computed: {
      tableHeight() {
        return (this.windowHeight - 280) + "px";
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
  }
</script>

<style scoped>
.process-low-me-approve-detail .title-item{
  font-weight: 700;
}
.process-low-me-approve-detail .message-table {

}
.process-low-me-approve-detail .message-table td {
  border: 1px solid rgb(227, 237, 255);
  padding: 10px;
}
.process-low-me-approve-detail .message-table .message-title {
  text-align: right;
  background: rgb(239, 245, 255);
}
.process-low-me-approve-detail .message-table .message-content {

}
</style>
