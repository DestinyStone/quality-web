<template>
  <div>
    <el-select v-model="value"  style="width: 100%" type="small" @change="handlerChange" :placeholder="placeholder">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {getAllProvider} from "../../../api/system/role";

  export default {
    name: "dutySelect",
    props: {
      placeholder: {
        type: String,
      },
      defaultValue: {
        type: String,
      }
    },
    data() {
      return {
        value: null,
        options: []
      }
    },
    created() {
      this.value = this.defaultValue;
      getAllProvider().then(res => {
        let data = res.data;
        for(let key in data) {
          this.options.push({label: data[key], value:key});
        }
      })
    },
    methods: {
      handlerChange(key) {
        this.$emit('change', key);
      }
    }
  }
</script>

<style scoped>

</style>
