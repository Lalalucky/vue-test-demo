<template>
  <div class="weui-cell g2-cell-column g2-user-selected">
    <div class="weui-cell__hd">
      <div class="weui-label">日志接收人</div>
      <g2UserSelectedBtn>
        <div class="g2-icon is-large">
          <!-- <img src="~@public/image/report/img.png" alt> -->
        </div>
      </g2UserSelectedBtn>
    </div>
    <div class="weui-cell__bd">
      <slot>
        <div class="g2-upload-def clear-fix"></div>
      </slot>
    </div>

    <div v-transfer-dom>
      <popup v-model="isShowPoppup" height="100%" class="user-selected__wrapper">
        <div class="user-selected__content">
          <div class="user-selected-header">
            <span class="user-selected-header__result g2-text-info">
              已选择
              <span>0</span>项
            </span>
            <span>这是选择的结果</span>
          </div>
          <div class="user-selected-search">
            <input class="g2-input" type="text" placeholder="请输入">
          </div>
          <div>
            <tab bar-position="bottom">
              <tab-item
                selected
                :selected="activeTabIndex === item.key"
                v-for="(item, index) in tabList"
                @click.native="activeTabIndex = item.key"
                :key="item.key"
              >{{item.label}}</tab-item>
            </tab>
            <swiper v-model="activeTabIndex" :show-dots="false">
              <swiper-item v-for="(item, index) in tabList" :key="item.key">
                <component v-bind:is="item.componentName"></component>
              </swiper-item>
            </swiper>
          </div>
        </div>
        <div class="user-selected__footer">去人</div>
      </popup>
    </div>
  </div>
</template>

<script>
import g2UserSelectedBtn from "./user-selected-btn.vue";
import g2Colleague from "./components/colleague/index";
import g2Department from "./components/department/index";
import g2Frequently from "./components/frequently/index";
import {
  Popup,
  Group,
  TransferDom,
  Tab,
  TabItem,
  Swiper,
  SwiperItem
} from "vux";
export default {
  name: "g2UserSelected",
  props: {},
  components: {
    g2UserSelectedBtn,
    g2Colleague,
    g2Department,
    g2Frequently,
    Popup,
    Group,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      isShowPoppup: true,

      tabList: [
        {
          label: "常用",
          key: 1,
          componentName: "g2Frequently"
        },
        {
          label: "同事",
          key: 2,
          componentName: "g2Colleague"
        },
        {
          label: "部门",
          key: 3,
          componentName: "g2Department"
        }
      ],
      activeTabIndex: 1
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    openSelectedPanel() {
      this.isShowPoppup = true;
    }
  }
};
</script>

<style  lang="scss" src="./index.scss">
</style>
