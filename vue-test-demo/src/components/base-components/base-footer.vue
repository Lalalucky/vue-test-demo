<template>
  <div class="base-footer">
    <div class="footer-link">
      <router-link to="/home" tag="div">
        <span class="iconfont icon-shouyexuanzhong"></span>
        <span>首页</span>
      </router-link>
      <router-link to="/driver" tag="div">
        <span class="iconfont icon-jiashicang"></span>
        <span>驾驶舱</span>
      </router-link>
      <router-link to="/my" tag="div">
        <span class="iconfont icon-tonghangzhengguanli"></span>
        <span>通行证</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import "@public/lib/iconfont/iconfont.css";
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
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/scss/base/_base.scss";
@import "@/scss/base/_reset.scss";
@import "@/scss/themes/default.scss";
.base-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1.6rem;
  .footer-link {
    display: flex;
    padding: 0.2rem 0;
    border-top: 1px solid #ececec;
    box-shadow: 0 3px 3px 3px rgba($color: #000000, $alpha: .2);
    & > div {
      text-align: center;
			width: 33.333333%;
			box-sizing: border-box;
      &.router-link-active {
        .iconfont {
          color: $base--color-primary;
        }
        span {
          color: $base--color-primary;
        }
			}
			&:not(:last-child){
				border-right: 1px solid #ececec;
			}
      .iconfont {
        display: block;
        margin: 0 auto;
        width: 0.64rem;
        height: 0.64rem;
        overflow: hidden;
      }
      span {
        display: inline-block;
        line-height: 0.56rem;
      }
    }
  }
}
</style>
