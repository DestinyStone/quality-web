<template>
  <div style="display: flex;">
    <div>
      <slot name="tag"/>
    </div>
    <div style="font-weight: 700; margin-left: 10px;" :style="{'fontSize': size + 'px'}">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "fixTagTitle",
    props: {
      size: {
        type: Number,
      }
    }
  }
</script>

<style scoped>

</style>
