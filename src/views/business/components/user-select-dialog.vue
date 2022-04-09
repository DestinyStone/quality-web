<template>
  <el-dialog title="选择用户"
             :visible.sync="show"
             width="50%"
             top="5%"
             @close="show = false"
             append-to-body>
    <div>
      <div style="display: flex; justify-content: end;">
        <el-input style="width: 200px;"  size="small" v-model="query.name" placeholder="请输入用户名"/>
        <el-button type="primary" style="margin-left: 10px;" size="small" @click="onload">查 询</el-button>
      </div>
      <div>
        <el-table
          :header-cell-style="{background: 'rgb(239, 245, 255)', 'textAlign': 'center'}"
          :cell-style="{'textAlign': 'center'}"
          :data="data"
          border
          height="300"
          @selection-change="handlerSelect"
          style="width: 100%; margin-top: 10px;">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="deptName"
            show-overflow-tooltip
            label="部门名称">
          </el-table-column>
          <el-table-column
            prop="email"
            show-overflow-tooltip
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="phone"
            show-overflow-tooltip
            label="手机号">
          </el-table-column>
        </el-table>
        <div style="display: flex; justify-content: flex-end; padding: 10px;">
          <div style="display: flex; justify-content: center; flex-flow: column">共 {{page.total}} 条</div>
          <el-pagination
            style="margin-left: 30px;"
            background
            layout="sizes, prev, pager, next"
            @current-change="onload"
            @size-change="onLoad"
            :page-sizes="[10, 20, 30]"
            :current-page.sync="page.current"
            :page-size.sync="page.size"
            :total="page.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submit">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import {getList} from "../../../api/system/user";

  export default {
    name: "userSelectDialog",
    props: {
      show: {
        type: Boolean,
        default: false,
      }
    },
    watch: {
      show() {
        this.$emit("update:show", this.show);
      }
    },
    data() {
      return {
        data: [],
        selectData: [],
        query: {},
        page: {
          current: 1,
          size: 5,
          total: 0,
        },
      }
    },
    methods: {
      handlerSelect(select) {
        this.selectData = select;
      },
      init() {
        this.onload();
      },
      onload() {
        getList(this.page.current, this.page.size, this.query).then(res => {
          let data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
        })
      },
      submit() {
        if (this.selectData.length === 0) {
          this.$message({type: "warning", message: "请至少选择一条数据"});
          return;
        }
        if (this.selectData.length > 1) {
          this.$message({type: "warning", message: "请选择一条数据"});
          return;
        }
        this.$emit("select", this.selectData[0]);
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
