<template>
  <div style="display: flex;">
    <div style="width: 3px; background: #25a5f7;"></div>
    <div style="font-size: 20px; font-weight: 700; margin-left: 10px;">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "fixColorTitle",
  }
</script>

<style scoped>

</style>
