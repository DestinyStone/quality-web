<template>
  <div>
    <fix-tag-title>
      <div slot="tag">
        <i :class="tagClass" style="font-size: 16px; color: red;"/>
      </div>
      {{title}}
    </fix-tag-title>
    <el-divider></el-divider>
    <slot></slot>
  </div>
</template>

<script>
  import FixTagTitle from "../../../../components/min/fix_tag_title";
  export default {
    name: "title-container",
    components: {FixTagTitle},
    props: {
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
