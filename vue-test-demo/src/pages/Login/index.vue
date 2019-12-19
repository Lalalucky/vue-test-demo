<template>
	<div class="wrapper yjz-home">
		<div class="login-form">
			<div class="form-item">
				<div class="ipt">
					<span>昵称：</span>
					<input type="text" v-model="userForm.nickName" v-validate="'nickName'" name="nickName"/>
				</div>
				<span :class="{ input: true, 'is-danger': errors.has('nickName') }" v-show="errors.has('nickName')">
					{{ errors.first('nickName') }}
				</span>
			</div>
			<div class="form-item">
				<div class="ipt">
					<span>年级：</span>
					<input type="text" v-model="userForm.No" v-validate="'No'" name="No"/>
				</div>
				<span :class="{ input: true, 'is-danger': errors.has('No') }" v-show="errors.has('No')">
					{{ errors.first('No') }}
				</span>
			</div>
			<div class="form-item">
				<div class="ipt">
					<span>手机：</span>
					<input type="text" v-model="userForm.phone" v-validate="'phone'" name="phone" />
				</div>
				<span :class="{ input: true, 'is-danger': errors.has('phone') }" v-show="errors.has('phone')">
					{{ errors.first('phone') }}
				</span>
			</div>
			<div class="form-item">
				<div class="ipt">
					<span>邮箱：</span>
					<input type="text" v-model="userForm.email" v-validate="'email'" name="email" />
				</div>
				<span :class="{ input: true, 'is-danger': errors.has('email') }" v-show="errors.has('email')">
					{{ errors.first('email') }}
				</span>
			</div>
			<!-- 提交 -->
			<div class="form-item">
				<base-button type="primary" @click.native="loginFn">
					<span slot="text" class="btn-text">确定</span>
				</base-button>
			</div>
		</div>
	</div>
</template>

<script>
import baseButton from '@/components/base-components/button.vue';
export default {
	data() {
		return {
			userForm: {
				phone: '',
				No: '',
				nickName: '',
				mail: '',
				role: ''
			}
		};
	},
	computed: {},
	mounted() {},
	methods: {
		async loginFn() {
			// let { phone, No, nickName, mail } = this;
			const success = await this.$validator.validateAll(['phone','email']); // 对所有表单项进行验证
			if(success){
				this.$router.push({
					path:'/home'
				})
			}
		}
	},
	components: {
		baseButton
	}
};
</script>

<style scoped lang="scss" src="./index.scss"></style>
