<template>
  <div class="out-buy-basic-message" style="padding-bottom: 80px;">
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
            <td class="message-value">{{userData.code}}</td>
            <td class="message-title">标题</td>
            <td class="message-value">{{userData.title}}</td>
          </tr>
          <tr>
            <td class="message-title">不良分类</td>
            <td class="message-value">{{typeMap[userData.type]}}</td>
            <td class="message-title">不良等级</td>
            <td class="message-value">{{levelMap[userData.level]}}</td>
          </tr>
          <tr>
            <td class="message-title">发生地点</td>
            <td class="message-value">{{triggerAddressMap[userData.triggerAddress]}}</td>
            <td class="message-title">不良处理品</td>
            <td class="message-value">{{dispostRemark}}</td>
          </tr>
          <tr>
            <td class="message-title">品名</td>
            <td class="message-value">{{userData.name}}</td>
            <td class="message-title">品番号</td>
            <td class="message-value">{{userData.designation}}</td>
          </tr>
          <tr>
            <td class="message-title">责任部门/厂家</td>
            <td class="message-value">{{userData.dutyDept}}</td>
            <td class="message-title">机型</td>
            <td class="message-value">{{apparatusMap[userData.apparatusType]}}</td>
          </tr>
          <tr>
            <td class="message-title">发现数量</td>
            <td class="message-value">{{userData.findQuantity}}</td>
            <td class="message-title">发现时间</td>
            <td class="message-value">{{userData.findTime}}</td>
          </tr>
          <tr>
            <td class="message-title">事件概要</td>
            <td class="message-value" colspan="3">{{userData.eventRemark}}</td>
          </tr>
          <tr>
            <td class="message-title">拜托事项</td>
            <td class="message-value" colspan="3">{{userData.pleaseContent}}</td>
          </tr>
          <tr>
            <td class="message-title">不良图片</td>
            <td class="message-value" colspan="3">
              <div >
                <el-image
                  v-for="item in (userData.imgReportFiles || [])"
                  :key="item"
                  style="width: 100px; height: 100px; margin-right: 20px;"
                  :src="item.url"
                  fit="contain"></el-image>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {qprDetail} from "../../../../api/business/out_buy_low/qpr";

  export default {
    name: "outBuyLowBasicMessage",
    data() {
      return {
        typeMap: {0: "外购件", 1: "内制件", 2: "其他"},
        triggerAddressMap: {0: "TNGA#1", 1: "TNGA#2", 2: "TNGA#3", 3: "TNGA#4", 4: "TNGA#5", 5: "TNGA#6"},
        triggerProcessMap: {0: "铸造钢体", 1: "铸造缸盖", 2: "缸盖加工", 3: "缸体加工", 4: "曲轴加工", 5: "连杆加工", 6: "凸轮轴加工"},
        levelMap: {0: "R", 1: "S", 2: "A", 3: "B", 4: "C", 5: "批量", 6: "停线"},
        apparatusMap: {0: "TNAG2.0"},
        dispostTypeMap:  {0: "返还", 1: "保留", 2: "废弃", 3: "其他"},
        initData: {},
      }
    },
    props: {
      id: {
        type: Object,
        default() {
          return {}
        }
      },
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      init() {
        if (this.validatenull(this.id)) {
          return;
        }
        qprDetail(this.id).then(res => {
          this.initData = res.data.data;
        })
      }
    },
    created() {
      this.init();
    },
    computed: {
      userData() {
        if (this.validatenull(this.id)) {
          return this.data;
        }
        return this.initData;
      },
      dispostRemark() {
        if (this.userData.dispostType === 3) {
          return this.userData.dispost;
        }
        let remark = this.dispostTypeMap[this.userData.dispostType];
        if (this.userData.dispostType === 0) {
          remark += this.userData.dispost + "个";
        }
        return remark;
      }
    }
  }
</script>

<style scoped>
  .out-buy-basic-message .title-item{
    font-weight: 700;
  }
  .out-buy-basic-message .message-table {

  }
  .out-buy-basic-message .message-table td {
    border: 1px solid rgb(227, 237, 255);
    padding: 10px;
  }
  .out-buy-basic-message .message-table .message-title {
    text-align: right;
    background: rgb(239, 245, 255);
  }
  .out-buy-basic-message .message-table .message-content {

  }
</style>
