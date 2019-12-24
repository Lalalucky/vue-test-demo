<template>
  <div style="height:100%;">
    <router-view style="height:calc(100% - 54px)"></router-view>
    <div class="g2-tabbar">
      <tabbar>
        <tabbar-item link="/home" :selected="selected === 'home'">
          <!-- <img slot="icon" src="~@public/image/tabber/home.png"> -->
          <i slot="icon" class="yjz-icon is-home"></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item link="/type" :selected="selected === 'work'">
          <!-- <img slot="icon" src="~@public/image/tabber/work.png"> -->
          <i slot="icon" class="yjz-icon is-work"></i>
          <span slot="label">课程</span>
        </tabbar-item>
        <tabbar-item link="/my" :selected="selected === 'my'">
          <!-- <img slot="icon" src="~@public/image/tabber/my.png"> -->
          <i slot="icon" class="yjz-icon is-my"></i>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from "vux";
export default {
  name: "g2OALayout",
  props: {},
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  data() {
    return {};
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      switch (this.$route.path) {
        case "/home":
          this.selected = "home";
          break;
        case "/work":
          this.selected = "work";
          break;
        case "/my":
          this.selected = "my";
          break;
        default:
          this.selected = "";
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@scss/helpers/_mixins.scss";
@import "~@scss/helpers/_utils.scss";
@import "~@scss/themes/index.scss";

.g2-tabbar {
  // position: relative;
    height: 1.306667rem;
  .weui-tabbar {
    height: 1.306667rem;
    background-color: #ffffff;
    // box-shadow: 0px -2px 4px -2px $primary-6;
    .weui-tabbar__item {
      height: 1.146667rem;
      padding: 0.186667rem 0 0;
      overflow: hidden;
      line-height: 1;
      .weui-tabbar__icon {
        width: 0.586667rem;
        height: 0.586667rem;
      }
      .weui-tabbar__label {
        color: #999999;
        @include font-dpr(12px);
        margin-bottom: 0;
      }
    }
  }

  .weui-tabbar__icon .yjz-icon {
    display: inline-block;
    width: 0.586667rem;
    height: 0.586667rem;
    text-align: center;
    &.is-home {
      background: url("~@public/image/home_law/shouye1.png") 0 0 no-repeat;
      background-size: 0.586667rem 0.586667rem;
    }
    &.is-work {
      background: url("~@public/image/home_law/kecheng.png") 0 0 no-repeat;
      background-size: 0.586667rem 0.586667rem;
    }
    &.is-my {
      background: url("~@public/image/home_law/wode.png") 0 0 no-repeat;
      background-size: 0.586667rem 0.586667rem;
    }
  }

  .weui-tabbar__item.weui-bar__item_on {
    .weui-tabbar__label {
      color: #2c2c35;
    }
    .yjz-icon {
      &.is-home {
        background: url("~@public/image/home_law/shouye.png") 0 0 no-repeat;
        background-size: 0.586667rem 0.586667rem;
      }
      &.is-work {
        background: url("~@public/image/home_law/kecheng1.png") 0 0 no-repeat;
        background-size: 0.586667rem 0.586667rem;
      }
      &.is-my {
        background: url("~@public/image/home_law/wode1.png") 0 0 no-repeat;
        background-size: 0.586667rem 0.586667rem;
      }
    }
  }
}
</style>
