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
             @click.stop="handlerClick(item)"
             v-for="item in options"
             style="cursor: pointer; padding: 10px 0 10px 10px;">{{item.label}}</div>
        <div style="padding: 10px 0 10px 10px; text-align: center;" v-if="loading">加载中...</div>
      </div>
      <div slot="reference">
<!--        用来显示-->
        <el-input v-model="showValue" v-show="!isGetFocus" @focus="handlerFocus" :placeholder="placeholder"/>
<!--        获取焦点后触发-->
        <el-input v-model="value" v-show="isGetFocus"  @blur="handlerBlur" :placeholder="placeholder"/>
      </div>
    </el-popover>
  </div>
</template>
<script>

  export default {
    name: "searchSelect",
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
        showValue: "",
        reload: 0,
        width: 0,
        popover: false,
        selectObject: {},
        isAccessTriggerBlur: false,
        isGetFocus: false,
        focusPlaceHolder: "",
      };
    },
    props: {
      defaultValue: {
        type: String,
      },
      placeholder: {
        type: String,
      },
      loadOption: {
        type: Function,
        default: () => {}
      }
    },
    watch: {
      defaultValue() {
        this.value = this.defaultValue;
        this.showValue = this.defaultValue;
      },
      value() {
        this.reSetQuery();
      }
    },
    mounted(){
      let searchInput = document.getElementsByClassName("search-input")[0];
      this.width = searchInput.clientWidth;
    },
    methods: {
      handlerFocus() {
        this.value = this.showValue;
        this.isGetFocus = true;
      },
      handlerBlur() {
        if (this.validatenull(this.value) && this.isAccessTriggerBlur) {
          this.showValue = null;
          this.$emit("change", {});
        }
        this.isGetFocus = false;
        this.isAccessTriggerBlur = true;
      },
      handlerClick(item) {
        this.selectObject = item;
        this.isAccessTriggerBlur = false;
        this.value = item.label;
        this.showValue = item.label;
        this.popover = false;
        this.$emit("change", item);
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
      if (!this.validatenull(this.defaultValue)) {
        this.value = this.defaultValue;
        this.showValue = this.defaultValue;
      }else {
        this.search();
      }
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
