<template>
  <div style="display: flex;">
    <div style="width: 3px; background: #25a5f7;"></div>
    <div style="font-weight: 700; margin-left: 10px;" :style="{'fontSize': size + 'px'}">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "fixColorTitle",
    props: {
      size: {
        type: Number,
      }
    }
  }
</script>

<style scoped>

</style>
