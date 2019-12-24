<template>
    <div class="yjz-login">
        <div class="login-wrapper">
            <div class="login-img">
                <img src="~@static/img/logo.jpg" alt="蚂蚁金油">
            </div>
            <form class="login-form" novalidate >
                <div class="login-form-field is-borderbottom ">
                    <div class="login-input">
                        <div class="input-icon">
                            <img src="~@static/img/ioc_people.png" alt="">
                        </div>
                        <input type="text" ref="userName" v-model="form.userName" placeholder="请输入用户名">
                    </div>

                </div>
                <div class="login-form-field is-borderbottom">
                    <div class="login-input">
                        <div class="input-icon">
                            <img src="~@static/img/ioc_look_num.png" alt="">
                        </div>
                        <input type="password" ref="userPasw" v-model="form.userPasw" placeholder="请输入密码">
                    </div>
                </div>

                <div class="login-form-field">
                    <p class="login-tips">
                        <span class="">*</span>&emsp;请输入用户名与密码
                    </p>
                </div>
                <div class="login-form-field">
                    <x-button type="default" id="btn" action-type="button" class="login-btn" @click.native="handleClickSubmit()" :show-loading="isShowLoading">确&nbsp;认</x-button>
                </div>

            </form>
            
        </div>
    </div>
</template>
<script>

// 会员注册页面
import { XButton, querystring } from "@ui/index.js"


export default {
    name: "LoginPage",
    components: { XButton},
    data() {
        return {
            form: {
                userName: "",
                userPasw: "",
                isVIP: "",
            },
            isShowLoading: false,
            test:""
        }
    },
    created() {
        //获取微信的openId
        let search = querystring.parse();
        let openId = search.openId;
        this.openId = openId;
        // this.openId = "wx256755a52d5bb9a3";

       
    },
    mounted(){
         this.test = `data-dpr = ${document.getElementsByTagName('html')[0].getAttribute('data-dpr')}---
            style=${document.getElementsByTagName('html')[0].getAttribute('style')}---
            btn font = ${window.getComputedStyle(document.getElementById('btn'),null).fontSize}`
    },
    methods: {
        validateIsEmpty() {
            if (this.form.userName.trim().length === 0) {
                this.$refs.userName.focus();
                return true
            }
            if (this.form.userPasw.trim().length === 0) {
                this.$refs.userPasw.focus();
                return true
            }
            if (!this.openId) {
                this.$vux.toast.show({
                    text: '代理商openId获取失败，请重新进入。',
                    type: "text",
                    time: 1000,
                    onHide() {
                        
                    }
                })
                return true
            }
            return false;
        },
        handleClickSubmit() {
            let _self = this;
            if(this.validateIsEmpty()) return;
            this.isShowLoading = true;
            this.$store.dispatch('login', {
                openId: this.openId,
                userName: this.form.userName,
                password: this.form.userPasw
            }).then(res => {
                this.isShowLoading = false;
                _self.$router.push("/mine")
            }).catch(res => {
                this.isShowLoading = false;
                this.$vux.toast.show({
                    text: res,
                    type: "text",
                    time: 2000,
                    onHide() {
                        console.log('hide--------------')
                        // _self.$router.push("/mine")
                    }
                })
            })
        }
    }

}
</script>
<style lang="scss" src="@scss/pages/login.scss"></style>

