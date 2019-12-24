<template>
  <group :title="groupTitle" class="g2-group">
    <slot></slot>
    <g2CollapseTransition>
      <span
        class="weui-group-spread-cell"
        style=" display: block;overflow: hidden;"
        v-show="isSpread"
      >
        <slot name="hidden"></slot>
      </span>
    </g2CollapseTransition>

    <div class="weui-cell weui-group-spread" style @click="isSpread = !isSpread;">
      {{isSpread ? fewerText : spreadText }}
      <i
        class="iconfont"
        :class="[isSpread ? 'icon-shouqi' : 'icon-zhankai']"
      ></i>
    </div>
  </group>
</template>

<script>
import { Group } from "vux";
import g2CollapseTransition from "@/plugins/transitions/collapse-transition.js";
export default {
  name: "g2GroupSpread",
  props: {
    spreadText: {
      type: String,
      default: "展开"
    },
    fewerText: {
      type: String,
      default: "收起"
    },
    groupTitle: {
      type: String,
      default: "单位信息"
    }
  },
  mixins: [],
  components: {
    Group,
    g2CollapseTransition
  },
  data() {
    return {
      isSpread: false
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
</style>
