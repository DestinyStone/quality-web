<template>
  <div style="min-height: 400px;">
    <el-row>
      <el-col :span="11">
        <div style="display: flex;">
          <el-input placeholder="请输入用户名称" style="width: 200px"/>
          <el-button style="margin-left: 10px;" type="primary">查询</el-button>
        </div>
        <div style="min-height: 400px;">
          <el-table
            v-loading="loading"
            :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
            :cell-style="{'textAlign': 'center'}"
            :data="data"
            @selection-change="handlerSelect"
            border
            style="width: 100%; margin-top: 10px;">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="部门名称">
            </el-table-column>
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="角色">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="1">
        <div style="display: flex; justify-content: center;">
          <div  style="min-height: 400px;display: flex; justify-content: center; flex-flow: column; margin-top: 50px;">
            <el-button @click="handlerMove">
              <i class="el-icon-caret-right"/>
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="display: flex;">
          <el-input placeholder="请输入用户名称" style="width: 200px"/>
          <el-button style="margin-left: 10px;" type="primary">查询</el-button>
        </div>
        <div style="min-height: 400px;">
          <el-table
            :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
            :cell-style="{'textAlign': 'center'}"
            :data="selectData"
            border
            height="400"
            style="width: 100%; margin-top: 10px;">
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="部门名称">
            </el-table-column>
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="角色">
            </el-table-column>
            <el-table-column
              prop="name"
              width="100"
              show-overflow-tooltip
              label="操作">
              <template slot-scope="scope">
                <el-link type="primary" :underline="false" @click="handlerDelete(scope.row)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getList} from "@/api/system/user"
  export default {
    name: "changeSaveUserForm",
    props: {
      defaultValue:{
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        data: [],
        page: {
          current: 1,
          size: 9,
          total: 0,
        },
        selectList: [],
        selectData: [],
        loading: false,
      }
    },
    methods: {
      getSelect() {
        return this.selectData;
      },
      handlerDelete(row){
        for(let key in this.selectData) {
          let item = this.selectData[key];
          if (item.id === row.id) {
            this.selectData.splice(key, 1);
            this.onload();
          }
        }
      },
      handlerMove() {
        if (this.selectList.length === 0) {
          this.$message({type: "warning", message: "请至少选择一个用户"});
          return;
        }
        if (this.loading) {
          return;
        }
        this.selectData = this.selectData.concat(JSON.parse(JSON.stringify(this.selectList)));
        this.onload();
      },
      handlerSelect(selectList) {
        this.selectList = selectList;
      },
      onload() {
        this.loading = true;
        getList(this.page.current, this.page.size).then(res => {
          this.loading = false;
          let data = res.data.data;
          this.data = data.records;
          this.page.total = data.total;
        })
      },
      init() {
        console.log(this.defaultValue);
        this.$set(this, 'selectData', this.defaultValue);
        this.onload();
      }
    },
    created() {
      setTimeout(() => {
        this.init();
      }, 50)
    }
  }
</script>

<style scoped>

</style>
