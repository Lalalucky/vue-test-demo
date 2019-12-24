<template>
  <div class="g2-container-component" :style="containerStyle">
    <div class="g2-container__full" v-if="type === 'full'">
      <header class="container-full-header">
        <slot name="header"></slot>
      </header>
      <main class="container-full-main">
        <slot></slot>
      </main>
      <footer class="container-full-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
    <slot v-if="type === 'default'"></slot>
  </div>
</template>

<script>
export default {
  name: "g2Container",
  props: {
    type: {
      type: String,
      default: "default"
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    containerStyle() {
      let style = {
        padding : '20px'
      };
      if (this.full) {
        style.padding = "0";
      }
      return style;
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss" src="./index.scss">
</style>
