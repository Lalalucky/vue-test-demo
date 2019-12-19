<template>
	<div :class="['btn', popClass]">
		<slot name="text"></slot>
		<slot name="dom"></slot>
	</div>
</template>

<script>
export default {
	name: 'base-button',
	props: ['type'],
	data() {
		return {};
	},
	computed: {
		popClass() {
			return this.type ? this.type : 'primary';
		}
	},
	created() {},
	mounted() {
		// console.log(this.type);
	},
	watch: {},
	methods: {},
	components: {}
};
</script>

<style scoped lang="scss">
@import '@/scss/themes/default.scss';
.btn {
	display: flex;
	justify-content: center;
	width: 100%;
	height: 1.2rem;
	line-height: 1.2rem;
	border: 1px solid #ececec;
	border-radius: 3px;
	background-color: $base--color-primary;
	&:hover {
		opacity: 0.88; // 移动端模式下并不生效的
	}
	&.primary {
		background-color: $base--color-primary;
	}
	&.sucess {
		background-color: $base--color-success;
	}
	span.btn-text {
		line-height: 1.2rem;
		color: #666;
	}
}
</style>
