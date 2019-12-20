<template>
  <div class="home app-view">
    <base-header></base-header>
    <Beyond></Beyond>
    <base-footer></base-footer>
  </div>
</template>

<script>
import Beyond from "./Beyond/index.vue";
import baseHeader from "@/components/base-components/base-header.vue";
import baseFooter from "@/components/base-components/base-footer.vue";
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {
    Beyond,
    baseHeader,
    baseFooter
  }
};
</script>

<style scoped lang="scss"></style>
