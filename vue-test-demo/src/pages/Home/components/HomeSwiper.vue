<template>
  <!-- 首页上面的swiper -->
  <div class="banner-swiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <img class="inner-img" :src="slide.pic" />
      </swiper-slide>
      <!-- 分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- 左右箭头 -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>-->
    </swiper>
  </div>
</template>

<script>
const swiperOption = {
  //显示分页
  pagination: {
    el: ".swiper-pagination"
  },
  //设置点击箭头
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  //自动轮播
  autoplay: {
    delay: 4500,
    //当用户滑动图片后继续自动轮播
    disableOnInteraction: false
  },
  //开启循环模式
  loop: true
};
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "banner-swiper",
  props: {},
  data() {
    return {
      swiperOption: swiperOption,
      swiperSlides: [
        { pic: require("@public/img/banner01.jpg"), tetx: "banner01" },
        { pic: require("@public/img/banner02.jpg"), tetx: "banner02" },
        { pic: require("@public/img/banner03.jpg"), tetx: "banner03" }
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
@import "@/scss/themes/default.scss";
.banner-swiper {
  height: 4rem;
  overflow: hidden;
  border-radius: 3px;
  .swiper-container {
    height: 4rem;
    /deep/ .swiper-pagination-bullet {
			background-color: $primary-2 ;
			opacity: .5;
    }
    /deep/ .swiper-pagination-bullet-active {
      background-color: $base--color-primary ;
    }
    .inner-img {
      position: absolute;
    }
  }
}
</style>
