<template>
  <div style="position:fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 888; background-color: rgba(0, 0, 0, 0.6)" v-if="show">
    <div style="display: flex; justify-content: center; flex-flow: column; height: 100%;">
      <div :style="{height: height + 'px'}" style="display: flex; justify-content: center;">
        <el-card style="background-color: rgba(255, 255, 255, 1); width: 60%; overflow: auto; ">
          <div v-html="content"></div>
        </el-card>
      </div>
    </div>
    <div>
      <span class="el-image-viewer__btn el-image-viewer__close" @click="show = false"><i class="el-icon-close"></i></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "emailTemplatePrefix",
    props: {
      content: {
        type: String
      },
      show: {
        type: Boolean,
        default: false,
      }
    },
    watch: {
      show() {
        this.$emit("update:show", this.show);
      }
    },
    data() {
      return {
        windowHeight: 0,
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      height() {
        return this.windowHeight - 200;
      }
    }
  }
</script>

<style scoped>

</style>
