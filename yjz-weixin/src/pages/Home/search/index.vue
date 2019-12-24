<template>
  <ViewBox class="g2-page-view yjz-home">
    <div class="class-search">
      <div class="g2-header-fixed g2-search">
        <div class="search-header">
          <div>
            <i class="iconfont icon-fanhui"></i>
          </div>
          <div class="search-header-input">
            <i class="iconfont icon-search"></i>
            <input
              class="search-header__input"
              placeholder="搜索课程、老师、关键词"
              ref="input"
              v-model="projectName"
              @blur="onblur()"
            />
            <i class="iconfont icon-iconsearchdelete cancel"></i>
          </div>
          <span class="header-actions header-actions1" @click="handelClickSearch">搜索</span>
        </div>
      </div>
      <div class="search-courses">
        <div class="hot-search">
          <div class="name">热门搜索</div>
          <div class="content">
            <div class="conten-item" v-for="i in 10">法律</div>
          </div>
        </div>
        <div class="search-history">
          <div class="name">
            搜索历史
            <i class="iconfont icon-shanchu"></i>
          </div>
          <div class="content">
            <div class="conten-item" v-for="i in 10">法律</div>
          </div>
        </div>
      </div>
    </div>
  </ViewBox>
</template>
<script>
import { Swiper, Card, ViewBox, querystring, Scroller } from "vux";
import { mapState, mapGetters } from "vuex";
import url from "@/utils/url.js";

import { swiper, swiperSlide } from "vue-awesome-swiper";

import "swiper/css/swiper.css";
export default {
  name: "LoginPage",
  components: {
    Card,
    ViewBox,
    Scroller,
    Swiper,
    swiper,
    swiperSlide
  },
  data() {
    return {
      projectName: "",
      list: [1, 2, 3, 4, 5, 6],
      newsList: [
        {
          url: "javascript:",
          img: "~@public/image/home_law/banner.png",
          title: "送你一朵fua",
          fallbackImg: "~@public/image/home_law/banner.png"
        }
      ],
      isLabel: true,
      swiperOption: {
        // autoplay: 3000,
        autoplayDisableOnInteraction: false,
        pagination: ".swiper-pagination", //分页器挂载到swiper-pagination类对应的元素上
        loop: true
      },
      swiperOption2: {
        // autoplay: 3000,
        autoplayDisableOnInteraction: false,
        pagination: ".swiper-pagination", //分页器挂载到swiper-pagination类对应的元素上
        loop: true
      }
    };
  },
  // computed: {
  //   // ...mapGetters("home/home", {
  //   //   newsList: "g_newsList"
  //   // }),
  //   ...mapState("home/home", {
  //     meetList: "meetList",
  //     noticeList: "noticeList"
  //   })
  // },
  mounted() {
    setTimeout(() => {
      this.asyncCount = 5;
    }, 5000);
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
      return this.$refs.mySwiper2.swiper;
    }
  },
  created() {
    // // 处理微信端登录过的直接获取sid数据
    // debugger;
    // // 获取sid数据
    // const sid = url("?sid");
    // // 第一步保存用户的sid数据
    // if (sid) {
    //   this.$store.commit("base/user/s_sid", sid);
    // }

    // this.fLoadClientList();
    // this.fLoadMeetList();
    // this.fLoadNoticeList();

    var length = this.list.length;
    this.sfsdggj = "width: " + length * 350 + "px";
  },
  mounted() {},
  methods: {
    onblur() {
      if (this.projectName == "") {
        this.loadAllStatistics();
      }
    },
    handleChangeFocus() {
      this.isLabel = false;
    },
    handelClickSearch() {},
    handelClickSearch() {
       this.$router.push({
        path: `home`
      });
    },
    // 点击返回
    handleClickBack() {
        // debugger;
      this.$router.push({
        path: `home`
      });
    }
  }
};
</script>
<style lang="scss" src="./index.scss">
</style>
<style lang="scss" scoped>
.activity >>> .swiper-pagination-bullet.swiper-pagination-bullet-active {
  opacity: 1;
  background: #49af4f !important;
  width: 0.24rem !important;
  height: 0.107rem !important;
  border-radius: 0.053rem;
}

.activity >>> .swiper-pagination-bullet {
  width: 0.107rem;
  height: 0.107rem;
}
.topImage >>> .swiper-pagination-bullet.swiper-pagination-bullet-active {
  opacity: 1;
  background: #f54305 !important;
  width: 0.24rem !important;
  height: 0.107rem !important;
  border-radius: 0.067rem;
}
.topImage >>> .swiper-pagination-bullet {
  width: 0.133rem;
  height: 0.133rem;
  background-color: #d9d9d9;
}
</style>