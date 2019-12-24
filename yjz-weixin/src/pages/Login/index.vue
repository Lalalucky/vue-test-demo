<template>
  <!-- <div class="g2-login">
    <div class="login-wrapper">
      <div class="login-bg">
        <img src="~@public/image/login/bg.png" alt="易之">
      </div>
      <div class="login-form-wrapper">
        <form class="login-form" novalidate>
          <div class="login-form-field is-borderbottom">
            <div class="login-input">
              <div class="input-icon">
                <img src="~@public/image/login/user.png" alt>
              </div>
              <input type="text" ref="userName" v-model="form.userName" placeholder="请输入账号">
            </div>
          </div>
          <div class="login-form-field is-borderbottom is-mini">
            <div class="login-input">
              <div class="input-icon">
                <img src="~@public/image/login/password.png" alt>
              </div>
              <input type="password" ref="userPasw" v-model="form.userPasw" placeholder="请输入密码">
            </div>
          </div>

          <div class="login-form-field is-large">
            <p class="login-tips">忘记密码？</p>
          </div>
          <div class="login-form-field">
            <x-button
              type="default"
              id="btn"
              action-type="button"
              class="login-btn"
              @click.native="handleClickSubmit()"
              :show-loading="isShowLoading"
            >登录</x-button>
          </div>
        </form>
      </div>
    </div>
  </div> -->
</template>
<script>
import { XButton, querystring } from "@ui/index.js";

import url from "@/utils/url.js"

export default {
  name: "LoginPage",
  components: { XButton },
  data() {
    return {
      form: {
        userName: "",
        userPasw: "",
        isVIP: ""
      },
      isShowLoading: false,
      test: "",
      openId : ''
    };
  },
  created() {
    //获取微信的openId
    let openId = url("?openId");
    this.openId = openId;

    // this.openId = "wx256755a52d5bb9a3";
  },
  mounted() {},
  methods: {
    validateIsEmpty() {
      if (this.form.userName.trim().length === 0) {
        this.$refs.userName.focus();
        return true;
      }
      if (this.form.userPasw.trim().length === 0) {
        this.$refs.userPasw.focus();
        return true;
      }
      debugger;
      if (!this.openId) {
        this.$vux.toast.show({
          text: "代理商openId获取失败，请重新进入。",
          type: "warn",
          time: 1000,
          onHide() {}
        });
        return true;
      }
      return false;
    },
    handleClickSubmit() {
      let _self = this;
      if (this.validateIsEmpty()) return;
      this.isShowLoading = true;
      this.$store
        .dispatch("base/account/LoginByUser", {
          openId: this.openId,
          userName: this.form.userName,
          userPass: this.form.userPasw,
          vm: this,
          router: this.$router
        })
        .then(menu => {
          document.onkeyup = null;
          this.isShowLoading = false;
          this.$router.push({ path: "/home" });
        })
        .catch(e => {
          this.isShowLoading = false;
          this.$vux.toast.show({
            text: `${e.respMsg}`,
            type: "warn",
            time: 1000,
            onHide() {}
          });
        });
    }
  }
};
</script>
<style lang="scss" src="./login.scss"></style>

