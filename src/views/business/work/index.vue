<template>
  <div class="work">
    <basic-container>
      <title-container
        title="事项"
        tag-class="el-icon-time"
      >
        <await-card style="width: 180px"/>
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
              :header-cell-style="{ 'textAlign': 'center'}"
              :cell-style="{'textAlign': 'center'}"
              border
              :data="data"
              :height="itemHeight - 60"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="标题">
              </el-table-column>
              <el-table-column
                prop="name"
                label="业务类型">
              </el-table-column>
              <el-table-column
                prop="name"
                label="办结时间">
              </el-table-column>
              <el-table-column
                prop="name"
                width="120"
                label="状态">
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
                :header-cell-style="{ 'textAlign': 'center'}"
                :cell-style="{'textAlign': 'center'}"
                border
                :data="data"
                :height="itemHeight - 60"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="标题">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="接收时间">
                </el-table-column>
                <el-table-column
                  width="120"
                  label="">
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
  </div>
</template>

<script>
  import FixTagTitle from "../../../components/min/fix_tag_title";
  import AwaitCard from "./component/await-card";
  import TitleContainer from "./component/title-container";
  export default {
    name: "index",
    components: {TitleContainer, AwaitCard, FixTagTitle},
    data() {
      return {
        windowHeight: 0,
        fastMenu: [
          {title: "不良录入", router: "/business/process_low/process_low_save"},
          {title: "不良列表", router: "/business/process_low/process_low_list"},
          {title: "QPR录入", router: "/business/out_buy_low/out_buy_low_save"},
          {title: "QPR列表", router: "/business/out_buy_low/out_buy_low_list"},
          {title: "不良待办", router: "/business/out_buy_low_approve/out_buy_low_approve"},
        ],
        data: [],
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    created() {

    },
    methods: {
      handlerClickFastMenu(item) {
        this.$router.push({path: item.router});
      }
    },
    computed: {
      itemHeight() {
        return (this.windowHeight - 440) / 2;
      },
      height() {
        return this.windowHeight - 410 + "px";
      }
    }
  }
</script>

<style>
.work .el-card__body {
  padding: 10px 20px 10px 10px;
}
</style>
