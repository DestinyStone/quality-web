<template>
  <div class="work">
    <basic-container>
      <title-container
        title="事项"
        tag-class="el-icon-time"
      >
        <div style="display: flex;">
          <await-card
            @handler="handlerAwait(item)"
            :data="item"
            v-for="(item, index) in awaitData" :key="'await' + index"
            style="width: 180px; margin-right: 20px;"/>
        </div>
      </title-container>
    </basic-container>
    <el-row>
      <el-col :span="18">
        <basic-container>
          <title-container
            title="最近30天已办结"
            tag-class="el-icon-time"
          >
            <el-table
              id="settleLog"
              v-loading="settleLogLoading"
              class="no-el-table"
              :header-cell-style="{ 'textAlign': 'center', 'border-top': '1px solid red;'}"
              :cell-style="{'textAlign': 'center'}"
              :data="settleLogData"
              :height="itemHeight - 60"
              style="width: 100%">
              <el-table-column
                prop="title"
                min-width="120"
                label="标题">
                <template slot-scope="scope">
                  <div style="color: #2d8cf0; cursor: pointer;">
                    <span @click="openSettleLog(scope.row)">{{scope.row.title}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="serviceType"
                label="业务类型">
                <template slot-scope="scope">
                  {{serviceTypeMap[scope.row.serviceType]}}
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="办结时间">
              </el-table-column>
              <el-table-column
                prop="status"
                width="120"
                label="状态">
                <template slot-scope="scope">
                  {{settleLogStatusMap[scope.row.status]}}
                </template>
              </el-table-column>
            </el-table>
          </title-container>
        </basic-container>
        <basic-container>

          <div :style="{height: itemHeight + 'px'}">
            <title-container
              title="站内消息"
              tag-class="el-icon-time"
            >
              <el-table
                v-loading="messageLoading"
                id="message"
                class="no-el-table"
                :header-cell-style="{ 'textAlign': 'center', 'border-top': '1px solid red;'}"
                :cell-style="{'textAlign': 'center'}"
                :data="messageData"
                :height="itemHeight - 60"
                style="width: 100%">
                <el-table-column
                  prop="title"
                  label="标题">
                  <template slot-scope="scope">
                    <div style="text-align: left; color: #25a5f7;">
                      <span style="cursor: pointer;">{{scope.row.title}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="接收时间">
                </el-table-column>
                <el-table-column
                  width="120"
                  prop="type">
                  <template slot-scope="scope">
                    站内消息
                  </template>
                </el-table-column>
              </el-table>
            </title-container>
          </div>
        </basic-container>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div :style="{height: height}" style="overflow: auto;">
            <title-container
              title="快捷菜单"
              tag-class="el-icon-time"
            >
              <el-row v-for="item in fastMenu" :key="item">
                <el-col :span="18" style="text-align: right; background: #EFF5FF; font-weight: 700; color: #0075DB; font-size: 14px; line-height: 40px; height: 40px; padding-right: 15px;">
                  {{item.title}}
                </el-col>
                <el-col @click.native="handlerClickFastMenu(item)" :span="6" style="background-color: #78A9EE;line-height: 40px; height: 40px; border: 1px solid #EFF5FF; border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                  <div style="text-align: center; color: #FFFFFF; cursor: pointer;">
                    <i class="el-icon-arrow-right" style="border-radius: 50%; border: 1px solid #FFFFFF"/>
                  </div>
                </el-col>
              </el-row>
            </title-container>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="height: 25px;">

    </div>
  </div>
</template>

<script>
  import FixTagTitle from "../../../components/min/fix_tag_title";
  import AwaitCard from "./component/await-card";
  import TitleContainer from "./component/title-container";
  import {eventCount, messagePage, settleLogPage} from "../../../api/business/work/message";
  export default {
    name: "index",
    components: {TitleContainer, AwaitCard, FixTagTitle},
    data() {
      return {
        awaitData: [
          {title: "不良待办", quality: 0, urgeQuality: 0, router: "/business/out_buy_low_approve/out_buy_low_approve"},
          {title: "检查法待办", quality: 0, urgeQuality: 0, router: "/business/check/check_approve"},
          {title: "DI数据待办", quality: 0, urgeQuality: 0, router: "/business/di/account_approve"},
        ],
        windowHeight: 0,
        fastMenu: [
          {title: "不良录入", router: "/business/process_low/process_low_save"},
          {title: "不良列表", router: "/business/process_low/process_low_list"},
          {title: "QPR录入", router: "/business/out_buy_low/out_buy_low_save"},
          {title: "QPR列表", router: "/business/out_buy_low/out_buy_low_list"},
          {title: "不良待办", router: "/business/out_buy_low_approve/out_buy_low_approve"},
        ],
        settleLogData: [],
        settleLogPage: {
          pageSize: 5,
          currentPage: 1,
          total: 0
        },
        messageData: [],
        messagePage: {
          pageSize: 5,
          currentPage: 1,
          total: 0
        },
        messageLoading: false,
        isAccessLoadMessage: true,
        settleLogLoading: false,
        isAccessLoadSettleLog: true,
        serviceTypeMap: {0: "工序内不良", 1: "外购件不良", 2: "检查法", 3: "DI数据"},
        settleLogStatusMap: {0: "已发布", 1: "已完成", 2: "已结案", 3: "已拒绝"},
        settleLogApproveRouterMap: {
          0: "/business/out_buy_low_approve/out_buy_low_approve",
          1: "/business/out_buy_low_approve/out_buy_low_approve",
          2: "/business/check/check_approve",
          3: "/business/di/account_approve",
        },
        settleLogRouterMap: {
          0: "/business/process_low/process_low_list",
          1: "/business/out_buy_low/out_buy_low_list",
          2: "/business/check/check_list",
          3: "/business/di/report_account_list",
        }
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight < 1000 ? 1000 : document.body.clientHeight;
      this.eventScrollMessage();
    },
    created() {
      this.loadEvent();
      this.loadMessageData();
      this.loadSettleLog();
    },
    methods: {
      openSettleLog(row) {
        if (row.status === 0 || row.status === 2) {
          this.$router.push({path: this.settleLogRouterMap[row.serviceType], query: {title: row.title}});
        }
        if (row.status === 1 || row.status === 3) {
          this.$router.push({path: this.settleLogApproveRouterMap[row.serviceType], query: {title: row.title, tag: 1}});
        }
      },
      handlerAwait(item) {
        this.$router.push({path: item.router});
      },
      loadEvent() {
        eventCount().then(res => {
          let data = res.data.data;
          this.$set(this.awaitData[0], 'quality', data['low'].quality);
          this.$set(this.awaitData[0], 'urgeQuality', data['low'].urgeQuality);
          this.$set(this.awaitData[1], 'quality', data['check'].quality);
          this.$set(this.awaitData[1], 'urgeQuality', data['check'].urgeQuality);
          this.$set(this.awaitData[2], 'quality', data['di'].quality);
          this.$set(this.awaitData[2], 'urgeQuality', data['di'].urgeQuality);
        })
      },
      loadSettleLog() {
        if (!this.isAccessLoadSettleLog) {
          return;
        }
        this.settleLogLoading = true;
        settleLogPage(this.messagePage.currentPage, this.messagePage.pageSize, {}).then(res => {
          let data = res.data.data;
          this.settleLogLoading = false;
          if (data.records.length === 0) {
            this.isAccessLoadSettleLog = false;
            return;
          }
          this.settleLogData = this.settleLogData.concat(data.records);
          this.messagePage.currentPage++;
        }).then(() => {
          if (!this.contentIsOverflow(document.getElementById("settleLog"))) {
            this.loadMessageData();
          }
        })
      },
      loadMessageData() {
        if (!this.isAccessLoadMessage) {
          return;
        }
        this.messageLoading = true;
        messagePage(this.settleLogPage.currentPage, this.settleLogPage.pageSize, {}).then(res => {
          let data = res.data.data;
          this.messageLoading = false;
          if (data.records.length === 0) {
            this.isAccessLoadMessage = false;
            return;
          }
          this.messageData = this.messageData.concat(data.records);
          this.settleLogPage.currentPage++;
        }).then(() => {
          if (!this.contentIsOverflow(document.getElementById("message"))) {
            this.loadMessageData();
          }
        })
      },
      handlerClickFastMenu(item) {
        this.$router.push({path: item.router});
      },
      eventScrollMessage() {
        let message = document.getElementById("message");
        this.eventScrollBottom(message, () => {
          this.loadMessageData();
        })
      },
      eventScrollBottom(tableDom, back) {
        let dom = tableDom.querySelector(".el-table__body-wrapper");
        dom.addEventListener("scroll", function() {
          const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight;
          if (scrollDistance > 0) {
            return;
          }
          back();
        });
      },
      contentIsOverflow(tableDom) {
        let dom = tableDom.querySelector(".el-table__body-wrapper");
        let trs = dom.getElementsByClassName("el-table__row");
        if (this.validatenull(trs)) {
          return false;
        }
        let trOne = trs.item(0);
        return trOne.clientHeight * trs.length > dom.clientHeight;
      }
    },
    computed: {
      itemHeight() {
        return (this.windowHeight - 440) / 2;
      },
      height() {
        return this.windowHeight - 410 + "px";
      },
    }
  }
</script>

<style>
.work .el-card__body {
  padding: 10px 20px 10px 10px;
}
  .work .no-el-table td .is-leaf {
    border-bottom: unset;
  }
.work .no-el-table tr {
  border-top: 1px solid #EBEEF5;
}
</style>
