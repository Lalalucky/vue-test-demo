<template>
  <div @click="handleClickAddContact" class="g2-transition-add">
    <transition name="page-add" mode="out-in">
      <div class="g2-page-action g2-action action__add" v-if="isShow" key="addbtn">
        <i class="g2-icon is-large iconfont icon-plus"></i>
      </div>

      <div class="g2-page-view" v-else key="page">
        <slot name="page"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "g2TransitionAdd",
  props: {},
  components: {},
  data() {
    return {
      isShow: true
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    handleClickAddContact() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style lang="scss">
.g2-transition-add{
  z-index: 100;
}
.g2-transition-add.page-add-enter-active {
  .g2-page-view {
    height: 2.666667rem;
  }
}
.page-add-enter-active {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 0px 10px 4px #ccc;
  border-radius: 0.266667rem;
  overflow: hidden;
  transition: transform .4s ease-in, opacity .4s ease-in;
  transform-origin: calc(100% - 1.333333rem) calc(100% - 1.066667rem);
  transform: scale(0.2);
  width: 100%;
  height: 100%;
  background-color: transparent;
  opacity: 0;
}
.page-add-enter-to {
  transform: scale(1);
  margin-right: 0;
  margin-bottom: 0;
  opacity: 1;
}

.g2-action.page-add-leave-active {
  // transition: all 20s cubic-bezier(1, 0.5, 0.8, 1);
  height: 1.333333rem;
  width: 1.333333rem;
  background-color: transparent;
  animation: 0.1s morph cubic-bezier(0.5, 1, 0.5, 0);
}

.page-add-leave-to {
  // border-radius: 0rem;
  // transform: translateY(100px);

  // width: 1.333333rem;
  // opacity: 0;
}

// .page-add-leave {
//   // border-radius: 0;
//   transform: scaleY(1.5);
//   // width: 1.333333rem;
//   // opacity: 0;
// }

@keyframes morph {
  0% {
    border-radius: 0.266667rem;
    height: 1.333333rem;
    width: 1.333333rem;
  }

  100% {
    border-radius: 0.266667rem;
    height: 2.666667rem;
    width: 1.866667rem;
  }
}
</style>
