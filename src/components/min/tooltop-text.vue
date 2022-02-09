<template>
  <el-tooltip style="width: 100%;" class="item" effect="dark" :content="text" placement="top">
    <div style="width: 100px; overflow: hidden;">
      {{text.length > limit ? `${text.substring(0, limit)}...` : text}}
    </div>
  </el-tooltip>
</template>

<script>
  export default {
    name: "tooltopText",
    props: {
      text: {
        type: String,
      },
      limit: {
        type: Number,
        default: 5,
      }
    }
  }
</script>

<style scoped>

</style>
