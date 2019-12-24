<template>
  <div class="yjz-login">
    <div class="login-wrapper">
      <div class="login-img">
        <img src="~@static/img/logo.jpg" alt="蚂蚁金油">
      </div>
      <form class="login-form" novalidate>
        <div class="login-form-field is-borderbottom">
          <div class="login-input">
            <div class="input-icon">
              <img src="~@static/img/user.png" alt>
            </div>
            <input type="text" ref="userName" v-model="form.userName" placeholder="请输入用户名">
          </div>
        </div>
        <div class="login-form-field is-borderbottom is-mini">
          <div class="login-input">
            <div class="input-icon">
              <img src="~@static/img/password.png" alt>
            </div>
            <input type="password" ref="userPasw" v-model="form.userPasw" placeholder="请输入密码">
          </div>
        </div>

        <div class="login-form-field is-large">
          <p class="login-tips">
            <span class>*</span>&nbsp;请输入用户名与密码
          </p>
        </div>
        <div class="login-form-field">
          <x-button
            type="default"
            id="btn"
            action-type="button"
            class="login-btn"
            @click.native="handleClickSubmit()"
            :show-loading="isShowLoading"
          >确&nbsp;认</x-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { XButton, querystring } from "vuex";

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
      test: ""
    };
  },
  created() {
    //获取微信的openId
    // let search = querystring.parse();
    // let openId = search.openId;

    this.openId = '123123';
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
      // if (!this.openId) {
      //     this.$vux.toast.show({
      //         text: '代理商openId获取失败，请重新进入。',
      //         type: "text",
      //         time: 1000,
      //         onHide() {

      //         }
      //     })
      //     return true
      // }
      return false;
    },
    handleClickSubmit() {
      let _self = this;
      if (this.validateIsEmpty()) return;
      this.isShowLoading = true;
      // this.$store.dispatch('login', {
      //     openId: this.openId,
      //     userName: this.form.userName,
      //     password: this.form.userPasw
      // }).then(res => {
      //     debugger
      //     this.isShowLoading = false;
      //     // _self.$router.push({ path: "/mine", query: { sid: res.result.sid } })
      //     _self.$router.push({ path: "/welcome", query: { sid: res.result.sid } })
      // }).catch(res => {
      //     this.isShowLoading = false;
      //     this.$vux.toast.show({
      //         text: res,
      //         type: "text",
      //         time: 2000,
      //         onHide() {
      //             console.log('hide--------------')
      //             // _self.$router.push("/mine")
      //         }
      //     })
      // })
    }
  }
};
</script>
<style lang="scss" src="@scss/pages/login.scss"></style>

