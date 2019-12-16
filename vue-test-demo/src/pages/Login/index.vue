<template>
	<div class="login-from">
		<div class="from-item">
			<div class="ipt">
				<span>手机：</span>
				<input type="text" v-model="userForm.phone" v-validate="'phone|required'" name="phone" />
			</div>
			<span :class="{ input: true, 'is-danger': errors.has('phone') }" v-show="errors.has('phone')">
				{{ errors.first('phone') }}
			</span>
		</div>
		<div class="from-item">
			<div class="ipt">
				<span>几个：</span>
				<input type="text" v-model="userForm.No" v-validate="'required|between: 1,10'" />
			</div>
			<span :class="{ input: true, 'is-danger': errors.has('between') }" v-show="errors.has('between')">
				{{ errors.first('between') }}
			</span>
		</div>
    <!-- 提交 -->
    <Button>提交</Button>
	</div>
</template>

<script>
import Button from 'vant/lib/button';
import 'vant/lib/button/style';
export default {
	props: {},
	data() {
		return {
			userForm: {
        phone: '',
        No:'',
				nickName: '',
				mail: '',
				password: '',
				role: ''
			}
		};
	},
	computed: {},
	mounted() {},
	methods: {},
	components: {
    Button
  }
};
</script>

<style scoped lang="scss">

</style>
