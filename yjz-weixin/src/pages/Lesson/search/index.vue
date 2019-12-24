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
              v-model="message"
            >
            <i class="iconfont icon-iconsearchdelete cancel"></i>
          </div>
          <span class="header-actions header-actions1" @click="handelClickSearch()">搜索</span>
        </div>
      </div>
      <div class="search-courses">
        <div class="hot-search">
          <div class="name">热门搜索</div>
          <div class="content">
            <div
              class="conten-item"
              v-for="hotLabel in hotSearch"
              :key="hotLabel.id"
              @click="handelClickHot(hotLabel)"
            >{{hotLabel.title}}</div>
          </div>
        </div>
        <div class="search-history" v-if="historyWord.length>0">
          <div class="name">
            搜索历史
            <i class="iconfont icon-shanchu" @click="handleClickDeleteAll()"></i>
          </div>
          <div class="content">
            <div
              class="conten-item"
              v-for="(item,index) in historyWord"
              :key="index"
              @click="handelClickHistory(item)"
            >{{item}}</div>
          </div>
        </div>
      </div>
    </div>
  </ViewBox>
</template>
<script>
import { Swiper, Card, ViewBox, querystring, Scroller } from "vux";
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
      message: "",
      searchWord: "",
      hotSearch: [
        {
          title: "法律",
          id: "1"
        },
        {
          title: "语言",
          id: "2"
        },
        {
          title: "公证",
          id: "3"
        }
      ],
      historyWord: []
    };
  },

  created() {
    let oldWord = localStorage.getItem("searchWord");
    oldWord = oldWord ? JSON.parse(oldWord) : [];
    this.historyWord = Object.assign([], oldWord);
  },
  methods: {
    handelClickSearch() {
      let oldWord = localStorage.getItem("searchWord");
      oldWord = oldWord ? JSON.parse(oldWord) : [];
      if (!oldWord.includes(this.message)) {
        oldWord.push(this.message);
      }
      localStorage.setItem("searchWord", JSON.stringify(oldWord));
      //查询方法
      this.$router.push({
        path: "/searchOver",
        query: { message: this.message }
      });
    },
    handleClickDeleteAll() {
      localStorage.removeItem("searchWord");
      this.historyWord = [];
    },
    handelClickHot(hotLabel) {
      this.$router.push({
        path: "/searchOver",
        query: { message: hotLabel.title }
      });
    },
    handelClickHistory(item) {
      this.$router.push({
        path: "/searchOver",
        query: { message: item }
      });
    }
  }
};
</script>
<style lang="scss" src="./index.scss">
