<template>
  <div class="user-selected--user">
    <ul class="g2-list">
      <li class="list-item">
        <div class="g2-avator">
          <!-- <img class="avator-image" src="~@public/image/all_default.png" alt> -->
        </div>
        <div class="g2-text g2-ellipsis">asdasdasdasasdasdasdasasdasdasdasasdasdasdasasdasdasdas</div>
        <div class="g2-check">
          <input type="text">
        </div>
      </li>
    </ul>
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
  methods: {}
};
</script>

<style scoped lang="scss">
@import "~@scss/helpers/_mixins.scss";
@import "~@scss/helpers/_utils.scss";
@import "~@scss/helpers/_text.scss";
@import "~@scss/helpers/_border.scss";
@import "~@scss/themes/index.scss";
.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: .133333rem .266667rem;
}
</style>
