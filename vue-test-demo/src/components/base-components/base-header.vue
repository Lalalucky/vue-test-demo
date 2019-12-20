<template>
  <div class="base-header">
    <div class="header-container flex-box">
      <div class="head-left">
        <!-- menu--打开左边菜单栏 -->
        <div class="head-menu">
          <span class="iconfont icon-shouyexuanzhong"></span>
        </div>
      </div>
      <div class="head-center">
        <div class="h-ipt">
          <input type="text" autocomplete="off" v-model.trim="searchIpt.text" v-delayRes/>
        </div>
        <!-- 这边不用select--option -->
        <div class="h-sel"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "@public/lib/iconfont/iconfont.css";
/**
 * department:<属于某种项目>
 * columnId:<可能根据它来判断某个路由>
 */
const serverOpt = [
  { columnId: "01", tag: "备选项1", department: 1 },
  { columnId: "02", tag: "备选项2", department: 2 },
  { columnId: "03", tag: "备选项3", department: 3 }
];
export default {
  name:"base-header",
  data() {
    return {
      searchIpt: {
        text: "我是来占位的"
      }
    };
  },
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    
  },
  components: {}
};
</script>

<style scoped lang="scss">
.base-header {
  .header-container {
  }
}
</style>
