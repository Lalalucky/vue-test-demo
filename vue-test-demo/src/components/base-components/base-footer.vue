<template>
	<div class="base-footer">
		<div class="footer-link">
			<router-link to tag="div">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-shouyexuanzhong"></use>
				</svg>
				<span>首页</span>
			</router-link>
			<router-link to tag="div">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-jiashicang"></use>
				</svg>
				<span>驾驶舱</span>
			</router-link>
			<router-link to tag="div">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-tonghangzhengguanli"></use>
				</svg>
				<span>通行证</span>
			</router-link>
		</div>
	</div>
</template>

<script>
import '@public/lib/iconfont/iconfont.js';
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
@import '@/scss/base/_base.scss';
@import '@/scss/base/_reset.scss';
@import '@/scss/themes/default.scss';
.base-footer {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 1.6rem;
	.footer-link {
		display: flex;
		padding: 0.2rem 0;
		& > div {
			text-align: center;
			width: 33.333333%;
			.icon {
				display: block;
				margin: 0 auto;
				width: 0.64rem;
				height: 0.64rem;
				fill: currentColor;
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
