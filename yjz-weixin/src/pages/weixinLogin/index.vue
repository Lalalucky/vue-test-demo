<template>
  <ViewBox class="g2-page-view weixin-login">
    <div class="beijing-top">
      <img src="~@public/image/home_law/bg.png" alt="">
    </div>
    <div class="we-login">
      <div class="logo-img">
        <img src="~@public/image/home_law/logo.png" alt="">
      </div>
      <div class="tishi">
        <span>绑定手机号</span>
        <div>通过绑定手机号提高账号安全</div>
        <img :src="headerAvatar" alt="">
      </div>
      <div class="shoujihao">
        <!-- <span>+86</span> -->
        <input placeholder="请输入手机号码" type="text" v-model.trim="userPhone">
      </div>
      <div class="yanzhengma">
        <input placeholder="请输入验证码" type="text" v-model.trim="verifyNum">
        <div class="click-huoqu" :disabled="disabled" @click="getCaptcha">{{captcha}}</div>
      </div>
      <div class="denglu" @click="handleClickLogin">登录</div>
    </div>
  </ViewBox>
</template>
<script>
import {
  Swiper,
  Card,
  ViewBox,
  querystring,
  Scroller,
  Tab,
  TabItem
} from "vux";
import url from "@/utils/url.js";
import * as api from "@/api/project/login.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
let timer;
export default {
  props: {
    waitTime: {
      type: Number,
      default: 0
    }
  },
  name: "LoginPage",
  components: {
    Card,
    ViewBox,
    Scroller,
    Swiper,
    swiper,
    swiperSlide,
    Tab,
    TabItem
  },
  data() {
    return {
      verifyNum: "", //验证码
      captcha: "获取验证码", //获取验证码按钮内文字
      time: 0, //发送验证码间隔时间
      disabled: false, //按钮状态
      wait: this.waitTime,
      userPhone: "", //手机号
      openId: "",
      headerAvatar:''
    };
  },
  computed: {},
  destroyed() {
    this.captcha = "获取验证码";
    clearTimeout(timer);
  },
  beforeMount() {
    // 倒计时大于一分钟 或者是默认值 60 可以发送验证码
    if (this.wait < 0 || this.wait === 60) {
      this.captcha = "获取验证码";
      clearTimeout(timer);
      this.wait = 60;
      this.getCaptcha();
    } else {
      clearTimeout(timer);
      this.timeDown();
    }
  },
  created() {
    this.openId = "wx256755a52d5bb9a3";
    let sid = this.$route.query.sid;
    if (sid) {
      store.set("sid", sid);
    } else {
      sid = store.get("sid");
    }
    this.sid = sid;
    console.log(this.sid)
    this.loadgetHeadImg();
  },
  methods: {
    loadgetHeadImg() {
      var _this=this;
      api.getHeadImg().then(data => {
        if (data.respCode == "0") {
          _this.headerAvatar = data.result;
        } else if (data.respCode !== "0") {
          this.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
      });
    },
    getCaptcha() {
      var isPhoneNum = /^1[3|4|5|6|7|8][0-9]{9}$/.test(this.userPhone);
      if (!isPhoneNum) {
        this.$vux.toast.show({
          text: "请输入11位手机号",
          type: "warn"
        });
        return;
      }
      if (this.wait === 60 && this.userPhone != "") {
        this.timeDown();
        this.$emit("getCaptcha");
        var _this = this;
        var params = {
          phone: this.userPhone
        };
        api.getPhoneCodeByPhone(params).then(data => {
          if (data.respCode == "0") {
            _this.verifyNum = data.result;
          } else if (data.respCode !== "0") {
            this.$vux.toast.show({
              text: data.respMsg,
              type: "warn"
            });
          }
        });
      }
    },
    timeDown() {
      if (this.wait <= 0) {
        this.disabled = false;
        this.captcha = "获取验证码";
        this.wait = 60;
        clearTimeout(timer);
        return;
      } else {
        this.disabled = true;
        this.captcha = `获取验证码（${this.wait}s）`;
        this.wait--;
      }
      timer = setTimeout(() => {
        this.timeDown();
      }, 1000);
    },
    handleClickLogin() {
      var isPhoneNum = /^1[3|4|5|6|7|8][0-9]{9}$/.test(this.userPhone);
      if (!isPhoneNum) {
        this.$vux.toast.show({
          text: "请输入11位手机号",
          type: "warn"
        });
        return;
      } else if (this.verifyNum == "") {
        this.$vux.toast.show({
          text: "请输入6位验证码",
          type: "warn"
        });
        return;
      }
      var _this = this;
      var params = {
        phone: this.userPhone,
        phoneCode: this.verifyNum,
        openId: this.openId
      };
      api.loginByCode(params).then(data => {
        if (data.respCode == "0") {
          let sid = data.result;
          //   store.set("sid", sid);
          //   this.$store.commit("s_sid", sid);
          this.$router.push({
            path: `/home`,
            query: { sid: data.result }
          });
        } else {
          _this.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" src="./index.scss">
</style>
