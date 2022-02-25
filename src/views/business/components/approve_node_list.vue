<template>
  <div class="approve-node-list-container" style="padding: 10px;">
    <div style="position:relative; background: #FFFFFF">
      <div style="display: flex; justify-content: space-between;" :class="{'approve-node-list-open': !isHide}" class="approve-node-list">
        <div style="width: 20%;">
          <div class="code" style="position:absolute; top: 0; width: 200px;">不良编号: {{code}}</div>
          <div style="font-size: 12px; margin:  40px 20px">
            <table class="current-message-table">
              <tr>
                <td>当前业务环节: </td>
                <td>{{node}}</td>
              </tr>
              <tr>
                <td style="text-align: right;">业务表单: </td>
                <td>{{form}}</td>
              </tr>
              <tr>
                <td>当前业务环节: </td>
                <td> <span style="color: #2d8cf0; font-size: 14px;" :style="{'color': (bpmStatus === 1 || bpmStatus === 0 ? '#2d8cf0' : 'red')}">●</span>{{bpmStatusRemark}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div style="width: 60%;  display: flex; justify-content: center;">
          <div style=" width: 90%; overflow: auto; padding: 10px 20px;">
            <el-steps :key="stepKey" align-center :active="defaultActive" :process-status="isExistBack ? 'error': 'finish'" :style="{minWidth: 200 * data.length + 'px'}" finish-status="success">
              <el-step v-for="item in data"
                       :key="item"
              >
                <div slot="title">
                  {{item.bpmRemark}}
                </div>
                <div slot="description">
                  <div style="padding: 5px;">
                    <div v-if="!validatenull(item.operatorTime)">
                      {{item.operatorTime}}
                    </div>
                    <div v-if="!validatenull(item.backCause)" style="display: flex; justify-content: center;">
                      <tooltop-text :text="'退回原因:' + item.backCause" :limit="10"/>
                    </div>
                    <div v-if="!validatenull(item.operatorUserName)">
                      操作人: {{item.operatorUserName}}
                    </div>
                  </div>
                </div>
              </el-step>
            </el-steps>
          </div>
        </div>
        <div style="width: 20%;  display: flex; justify-content: flex-end;">
          <div style="display: flex; width: 200px; justify-content: flex-end;">
            <div
              @click="handlerClickDetail"
              class="operator-button">
              查看审批详情
            </div>
            <el-tag v-if="isCancel" type="warning" style="border-radius: unset" class="operator-button" @click="$emit('close')"><< 返回</el-tag>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center; padding: 20px;">
        <div style="cursor: pointer; color: #2d8cf0; font-size: 12px;" @click="handlerSwitch">
          <span v-if="!isHide">收起 </span>
          <span v-if="isHide">展开 </span>
          <i class="el-icon-arrow-up" v-if="!isHide"/>
          <i class="el-icon-arrow-down" v-if="isHide"/>
        </div>
        <div style=" position:absolute; right: 10px; top: -8px;"  v-if="isShowHideDetail">
          <div style="display: flex;">
            <div
              @click="handlerClickDetail"
              class="operator-button">
              查看审批详情
            </div>
            <el-tag v-if="isCancel" type="warning" style="border-radius: unset" class="operator-button" @click="$emit('close')"><< 返回</el-tag>
          </div>
        </div>
      </div>
      <el-dialog title="详情"
                 :visible.sync="showDetailDialog"
                 width="50%"
                 append-to-body>
        <approve-detail :bus-id="busId" v-if="showDetailDialog"/>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="showDetailDialog = false">关 闭</el-button>
      </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import {approveList} from "../../../api/business/process/process";
  import ApproveDetail from "./approve_detail";
  import TooltopText from "../../../components/min/tooltop-text";

  export default {
    name: "approveNodeList",
    components: {TooltopText, ApproveDetail},
    props: {
      code: {
        type: String,
      },
      node: {
        type: String,
      },
      form: {
        type: String
      },
      bpmStatus: {
        type: String,
      },
      busId: {
        type: String,
      },
      bpmStatusRemark: {
        type: String,
      },
      isCancel: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        showDetailDialog: false,
        stepKey: 0,
        defaultActive: 1,
        data: [],
        isHide: false,
        isShowHideDetail: false,
        isExistBack: false,
      }
    },
    methods: {
      handlerClickDetail() {
        this.showDetailDialog = true;

      },
      handlerSwitch() {
        this.isHide = !this.isHide;
        this.isShowHideDetail = false;
        if (this.isHide) {
          setTimeout(() => {
            this.isShowHideDetail = true;
          }, 300)
        }
        this.$emit("switch", !this.isHide);
      },
      onLoad() {
        approveList(this.busId).then(res => {
          this.data = res.data.data;
          this.loadActive();
          this.$emit("afterInit", this.data);
        }).then(() => {
          this.stepKey++;
        })
      },
      loadActive() {
        for(let key in this.data) {
          if (this.data[key].bpmStatus === 2) {
            this.$set(this, 'defaultActive', parseInt(key));
            return;
          }

          if (this.data[key].bpmStatus === 0 || this.data[key].bpmStatus === 1) {
            this.$set(this, 'defaultActive', parseInt(key - 1));
            return;
          }

          if (this.data[key].bpmStatus === 4) {
            this.$set(this, 'defaultActive', parseInt(key));
            this.isExistBack = true;
            return;
          }
        }
        this.defaultActive = parseInt(this.data.length);
      },
    },
    created() {
      this.onLoad();
    }
  }
</script>

<style scoped>
.approve-node-list {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
}
.approve-node-list-open {
  overflow: unset;
  max-height: 300px;
}
.approve-node-list .current-message-table > tr > td {
  padding: 3px;
}
.approve-node-list .current-message-table > tr > td:first-child {
  color: #828080;
}
.approve-node-list .code {
  padding: 5px 20px;
  font-size: 14px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #2d8cf0;
  font-weight: 700; color: #FFFFFF;
}
  .approve-node-list-container .operator-button {
    margin: 20px 20px 0 0;
    border: 1px solid #007AD9;
    font-size: 12px;
    cursor:pointer;
    background-color: #EFF5FF;
    color: #007AD9;
    text-align: center;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
  }
</style>
