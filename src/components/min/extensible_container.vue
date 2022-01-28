<template>
  <div class="extensible-container">
    <div class="title" @click="handlerSwitch">
      <div>{{title}}</div>
      <div>
        <i class="el-icon-arrow-down" v-if="!status"/>
        <i class="el-icon-arrow-up" v-if="status"/>
      </div>
    </div>
    <div class="content" :class="{'content-open': status}">
      <div style="padding: 10px;">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "extensibleContainer",
    props: {
      title: {
        type: String,
      },
      defaultStatus: {
        type: Boolean
      }
    },
    data() {
      return {
        status: false,
      }
    },
    methods: {
      handlerSwitch() {
        this.status = !this.status;
      }
    },
    created() {
      if (!this.validatenull(this.defaultStatus)) {
        this.status = this.defaultStatus;
      }
    }
  }
</script>

<style scoped>
.extensible-container * {
  margin: unset;
}
.extensible-container .title{
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  background-color: rgb(244, 244, 244);
  padding: 10px;
}
.extensible-container .title:hover {
  color: #25a5f7;
}
.extensible-container .content {
  border: 1px solid #F2F6FC;
  overflow: hidden;
  transition: max-height 0.3s;
  max-height: 0;
}
.extensible-container .content-open {
  overflow: auto;
  max-height: 900px;
  padding-bottom: 50px;
}
</style>
