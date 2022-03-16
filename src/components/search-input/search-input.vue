<template>
  <div class="search-input">
    <el-popover
      popper-class="select-input-container"
      placement="bottom-start"
      v-model="popover"
      :width="width"
      trigger="click">
      <div style="height: 300px; overflow: auto;" v-loadmore="loadmore">
        <div v-if="options.length === 0" style="display: flex; justify-content: center; flex-flow: column; height: 100%;">
          <avue-empty></avue-empty>
        </div>
        <div class="select-input-item"
             @click="handlerClick(item)"
             v-for="item in options"
             style="cursor: pointer; padding: 10px 0 10px 10px;">{{item}}</div>
        <div style="padding: 10px 0 10px 10px; text-align: center;" v-if="loading">加载中...</div>
      </div>
      <el-input slot="reference" @input="popover = true;" v-model="value" :placeholder="placeholder"/>
    </el-popover>
  </div>
</template>
<script>
  export default {
    name: "searchInput",
    data() {
      return {
        options: [],
        value: "",
        valueTemp: "",
        loading: false,
        page: {
          current: 1,
          size: 10,
        },
        isBanLoad: false,
        searchKey: "",
        reload: 0,
        width: 0,
        popover: false,
      };
    },
    props: {
      placeholder: {
        type: String,
      },
      loadOption: {
        type: Function,
        default: () => {}
      }
    },
    watch: {
      value() {
        this.reSetQuery();
        this.$emit("change", this.value);
      }
    },
    mounted(){
      let searchInput = document.getElementsByClassName("search-input")[0];
      this.width = searchInput.clientWidth;
    },
    methods: {
      handlerClick(item) {
        this.value = item;
        this.popover = false;
      },
      reSetQuery() {
        this.page.current = 1;
        this.isBanLoad = false;
        this.options.splice(0, this.options.length);
        this.search();
      },
      search() {
        if (this.isBanLoad) {
          return;
        }
        this.loading = true;
        this.loadOption(this.value, this.page).then(data => {
          this.loading = false;
          if (this.validatenull(data)) {
            this.isBanLoad = true;
            return;
          }
          this.page.current = this.page.current + 1;
          let newData = this.options.concat(data);
          this.$set(this, 'options', newData);
        })
      },
      loadmore() {
        this.search();
      },
      // 当用户输入内容开始远程搜索模糊查询的时候，会触发remoteMethod方法
      // remoteMethod(query) {
      //   this.search();
      // }
    },
    created() {
      this.search();
    }
  };
</script>
<style>
  .search-input {
    width: 100%;
  }
  .select-input-container .select-input-item {
    color: #606266;
  }
  .select-input-container .select-input-item:hover {
    background-color: #F5F7FA;
  }
  .select-input-container {
    padding: unset !important;
  }
</style>
