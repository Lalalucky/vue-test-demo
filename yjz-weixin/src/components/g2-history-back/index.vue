<template>
  <div id="history-back" ref="historyBack" @click="historyBack">
    <img src="~@public/image/home_law/history-back.png" alt />
    <span>返回</span>
  </div>
</template>

<script>
export default {
  name:'g2HistoryBack',
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    historyBack() {
      window.history.go(-1);
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
#history-back {
  position: fixed;
  bottom: 1.506667rem;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.173333rem;
  height: 0.973333rem;
  background-color: #f54305;
  border-radius: 0 0.493333rem 0.493333rem 0;
  opacity: 0.68;
  img {
    width: 0.413333rem;
    height: 0.413333rem;
  }
  span {
    margin-left: 0.16rem;
    font-size: 0.373333rem;
    color: #fff;
  }
}
</style>
