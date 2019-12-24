<template>
  <div class="my-cell">
    <slot name="link"></slot>
    <slot name="besides"></slot>
  </div>
</template>

<script>
export default {
  name: "myCell",
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="scss">
.my-cell {
  background-color: #ffffff;
  border-radius: 18px;
  .cover {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0.52rem 0.373333rem;
    .yi-icon {
      width: 0.413333rem;
      margin-right: 0.266667rem;
      text-align: center;
      img {
        max-width: 100%;
      }
    }
    & > span {
      font-size: 0.426667rem;
      color: #2c2c35;
    }
    &:after {
      content: "";
      position: absolute;
      right: 0.373333rem;
      top: .563333rem;
      width: 0.146667rem;
      height: 0.253333rem;
      background: url("~@public/image/home_law/profile/icon-right.png");
      background-size: 100% 100%;
    }
    &:not(:last-child):before {
      content: "";
      position: absolute;
      left: 0.373333rem;
      bottom: 0px;
      width: 8.56rem;
      height: 1px;
      background: #e7e7f0;
    }
  }
  .slide-box {
    overflow-x: scroll;
    ul {
      display: flex;
      padding: 0 0.373333rem 0.48rem 0.373333rem;

      li {
        width: 2.4rem;
        img {
          width: 2.4rem;
          height: 1.6rem;
          border-radius: 8px;
        }
        .title {
          width: 2.4rem;
          font-size: 0.32rem;
          color: #2c2c35;
          line-clamp: 1;
          box-orient: vertical;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:not(:last-child) {
          margin-right: 0.266667rem;
        }
      }
    }
  }
}
</style>
