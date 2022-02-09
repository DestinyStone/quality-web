<template>
  <div>
    <basic-container>
      <fix-tag-title>
        <div slot="tag">
          <i class="el-icon-time" style="font-size: 18px; color: red;"/>
        </div>
        事项
      </fix-tag-title>
      <el-divider></el-divider>
      <div>
        <await-card style="width: 180px"/>
      </div>
    </basic-container>
  </div>
</template>

<script>
  import FixTagTitle from "../../../components/min/fix_tag_title";
  import AwaitCard from "./component/await-card";
  export default {
    name: "index",
    components: {AwaitCard, FixTagTitle}
  }
</script>

<style scoped>

</style>
