<template>
  <div style="white-space: nowrap; font-size: 12px;" class="tag-select">
    <div v-for="item in data" @click="handlerClick(item)" :key="item" :class="{active: item.value === active}">
      {{item.label}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "tagSelectColumn",
    props: {
      data: {
        type: Object,
        default() {
          return []
        }
      },
      active: {
        type: Number,
      }
    },
    data() {
      return {
      }
    },
    methods: {
      handlerClick(item) {
        this.$emit("click", item);
      },
      reset() {
        this.active = 0
      }
    }
  }
</script>

<style scoped>
  .tag-select > div{
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    color: #2d8cf0;
    cursor: pointer;
  }
  .tag-select .active {
    background: rgb(239, 245, 255);
    color: rgb(0, 122, 217);  ;
  }
</style>
