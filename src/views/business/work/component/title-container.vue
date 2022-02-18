<template>
  <div>
    <fix-tag-title>
      <div slot="tag">
        <i :class="tagClass" style="font-size: 16px; color: red;"/>
      </div>
      {{title}}
    </fix-tag-title>
    <el-divider v-if="isExistDivider"></el-divider>
    <slot></slot>
  </div>
</template>

<script>
  import FixTagTitle from "../../../../components/min/fix_tag_title";
  export default {
    name: "title-container",
    components: {FixTagTitle},
    props: {
      isExistDivider: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
      },
      tagClass: {
        type: String,
      }
    }
  }
</script>

<style scoped>

</style>
