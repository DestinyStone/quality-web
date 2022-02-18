<template>
  <el-card>
    <div>
      <div>
        <div style="display: flex; justify-content: center;">
          <div style="width: 55px; height: 55px; line-height: 55px; font-size: 40px; border: 1px solid red; border-radius: 50%; text-align: center; color: red;">
            {{data.quality}}
          </div>
        </div>
        <div style="text-align: center; font-weight: 700; margin-top: 10px;">{{data.title}}</div>
      </div>
      <div style="font-size: 13px; margin-top: 10px;"><span style="color: #C0C4CC;">已超期: </span><span style="color: red; font-size: 20px;">{{data.urgeQuality}} </span>条</div>
      <el-divider></el-divider>
      <div
        @click="handlerClick"
        style="font-size: 13px; cursor: pointer; color: #25a5f7; text-align: center;">
        我要处理 >>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "await-card",
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      handlerClick() {
        this.$emit("handler");
      }
    }
  }
</script>

<style scoped>

</style>
