<template>
  <div class="upload-btn" @click="handleClickOpenSelectedPanel">
    <slot>
      <div class="g2-upload-btn-def">
        <i></i>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    handleClickOpenSelectedPanel() {
      this.$parent.openSelectedPanel();
    }
  }
};
</script>

<style scoped lang="scss">
</style>
