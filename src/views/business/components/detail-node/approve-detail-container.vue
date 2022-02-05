<template>
  <div>
    <approve-node-list :bus-id="busId"
                       :bpm-status="bpmStatus"
                       :bpm-node="node"
                       :form="form"
                       :code="code"
                       @switch="handlerSwitch"
                       @afterInit="handlerAfterInit"
    />
    <div>
      <el-row>
        <el-col :span="4">
          <basic-container>
            <div :style="{height: height, maxHeight: height}" style="overflow: auto;">
              <fix-color-title :size="14">{{messageTitle}}</fix-color-title>
              <el-divider></el-divider>
              <div>
                <tag-select-column @click="handlerSwitchTag" :data="tagData" :active="active"/>
              </div>
            </div>
          </basic-container>

        </el-col>
        <el-col :span="20">
          <basic-container>
            <div :style="{height: height, maxHeight: height}" style="overflow: auto;">
              <div v-for="item in tagData">
                <slot :name="item.slotName" v-if="active === item.value"/>
              </div>
            </div>
          </basic-container>
        </el-col>
      </el-row>
    </div>
    <div style="position: absolute; bottom: 0; left: 0; cursor: pointer;">
      <el-tag type="warning" @click="$emit('close')"><< 返回</el-tag>
    </div>
  </div>

</template>

<script>
  import ApproveNodeList from "../approve_node_list";
  import FixColorTitle from "../../../../components/min/fix_color_title";
  import ExtensibleContainer from "../../../../components/min/extensible_container";
  import TagSelectColumn from "../../../../components/min/tag_select_column";
  export default {
    name: "approveDetailContainer",
    components: {TagSelectColumn, ExtensibleContainer, FixColorTitle, ApproveNodeList},
    props: {
      messageTitle: {
        type: String,
      },
      active: {
        type: Number
      },
      tagData: {
        type: Object,
        default() {
          return []
        }
      },
      code: {
        type: String,
      },
      node: {
        type: String,
      },
      form: {
        type: String
      },
      bpmStatus: {
        type: String,
      },
      busId: {
        type: String,
      }
    },
    data() {
      return {
        data: {},
        windowHeight: 0,
        cale: 400,
      }
    },
    mounted() {
      this.windowHeight = document.body.clientHeight;
    },
    computed: {
      currentTag() {
        for(let key in this.tagData) {
          if (this.active === this.tagData[key].value) {
            return this.tagData[key];
          }
        }
        return {};
      },
      height() {
        return this.windowHeight - this.cale + "px";
      }
    },
    methods: {
      handlerAfterInit(data) {
        this.$emit("processAfterInit", data);
      },
      handlerSwitchTag(item) {
        this.$emit("update:active", item.value);
      },
      handlerSwitch(status) {
        if (status) {
          this.cale = 400;
        }else {
          this.cale = 250;
        }
      }
    }
  }
</script>

<style scoped>

</style>
