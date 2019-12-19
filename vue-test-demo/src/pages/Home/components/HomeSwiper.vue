<template>
	<!-- 首页上面的swiper -->
	<div class="banner-swiper">
		<swiper :options="swiperOption">
			<swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
				<img :src="slide.pic" />
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
	name: 'banner-swiper',
	props: {},
	data() {
		return {
			swiperOption: {},
			swiperSlides: [
				{ pic: require('@public/img/banner01.jpg'), tetx: 'banner01' },
				{ pic: require('@public/img/banner02.jpg'), tetx: 'banner02' },
				{ pic: require('@public/img/banner03.jpg'), tetx: 'banner03' }
			]
		};
	},
	computed: {},
	created() {},
	mounted() {},
	watch: {},
	methods: {},
	components: {
		swiper,
		swiperSlide
	}
};
</script>

<style scoped lang="scss">
.banner-swiper {
	height: 4.5rem;
	overflow: hidden;
	& >>> .swiper-slide {
		display: flex;
		justify-content: center;
		align-items: center;
		img {
		}
	}
}
</style>
