<template>
  <div style="display: flex; justify-content: space-between;">
    <div style="display: flex; white-space: nowrap; font-size: 12px;" class="tag-select">
      <div v-for="item in data" @click="handlerClick(item)" :key="item" :class="{active: item.value === active}">
        {{item.label}}<span v-if="!validatenull(item.count)">({{item.count}})</span>
      </div>
    </div>
    <div>
      <slot name="operator"/>
    </div>
  </div>

</template>

<script>
  export default {
    name: "tagSelect",
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
  padding: 0 15px;
  color: #2d8cf0;
  cursor: pointer;
}
  .tag-select .active {
    background: #2d8cf0;
    color: #FFFFFF;
  }
</style>
