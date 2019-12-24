<template>
  <ViewBox class="g2-page-view yjz-home">
    <div class="class-search">
      <div class="g2-header-fixed g2-search">
        <div class="search-header">
          <div @click="handelClickBack">
            <i class="iconfont icon-fanhui"></i>
          </div>
          <div class="search-header-input">
            <i class="iconfont icon-search"></i>
            <input
              class="search-header__input"
              placeholder="搜索课程、老师、关键词"
              ref="input"
              v-model="lessonName"
              @blur="onblur()"
            >
            <i class="iconfont icon-iconsearchdelete cancel" @click="handelClickCancel"></i>
          </div>
          <span class="header-actions header-actions1" @click="handelClickSearch">搜索</span>
        </div>
      </div>
      <div class="lesson-teacher-tab">
        <tab v-model="typeIndex" prevent-default @on-before-index-change="switchTabItem">
          <tab-item selected>课程</tab-item>
          <tab-item>老师</tab-item>
        </tab>
      </div>
      <!-- <div style="position:absolute;top:120px;"> -->
      <scroller
        use-pullup
        :pullup-config="pullupDefaultConfig"
        @on-pullup-loading="loadMore"
        use-pulldown
        :pulldown-config="pulldownDefaultConfig"
        @on-pulldown-loading="refresh"
        lock-x
        ref="scrollerBottom"
        height="-80"
      >
        <div class="search-coursesBox">
          <div class="newClass recommended sizing" v-if="showlist">
            <div class="recommended-box" v-if="recommendedList.length>0">
              <div
                class="box-item"
                v-for="(item,index) in recommendedList"
                :key="index"
                @click="handleClickLink(item)"
              >
                <div class="recommended-up">
                  <div class="recommend-image">
                    <img :src="item.lessonPicPath" alt="">
                  </div>
                  <div class="recommend-name">
                    <div class="recommend-desc">{{item.lessonName}}</div>
                    <div class="recommend-teacher">
                      <div class="teacher-image">
                        <div>
                          <img :src="item.lecturePic" alt="">
                        </div>
                        <span>{{item.lecturerName}}</span>
                      </div>
                      <div class="jieshu">{{item.subNum}}节</div>
                    </div>
                  </div>
                </div>
                <div class="recommended-down">
                  <div class="xuexi">{{item.clickNum}}人已学习</div>
                  <div class="count">￥{{item.lessonPrice}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroller>
      <!-- </div> -->
      <div v-if="noneOfTeacher" class="tupian">
        <img src="~@public/image/home_law/biao.png" alt="">
        <div>没有找到相关数据</div>
      </div>
    </div>
  </ViewBox>
</template>
<script>
import {
  Swiper,
  Card,
  ViewBox,
  querystring,
  Scroller,
  Tab,
  TabItem
} from "vux";
import url from "@/utils/url.js";
import * as api from "@/api/project/lesson_home.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

const pulldownDefaultConfig = {
  content: "下拉刷新",
  height: 40,
  autoRefresh: false,
  downContent: "下拉刷新",
  upContent: "释放后刷新",
  loadingContent: "正在刷新...",
  clsPrefix: "xs-plugin-pulldown-"
};
const pullupDefaultConfig = {
  content: "",
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  downContent: "释放后加载",
  upContent: "上拉加载更多",
  loadingContent: "加载中...",
  clsPrefix: "xs-plugin-pullup-"
};
export default {
  name: "LoginPage",
  components: {
    Card,
    ViewBox,
    Scroller,
    Swiper,
    swiper,
    swiperSlide,
    Tab,
    TabItem
  },
  data() {
    return {
      noneOfTeacher: false,
      lessonName: "",
      recommendedList: [],
      page: {
        currentPage: 1,
        pageNumber: 10,
        totalNumber: 0,
        totalPage: 0
      },
      typeIndex: 0,
      showlist: true,
      pullupDefaultConfig: pullupDefaultConfig,
      pulldownDefaultConfig: pulldownDefaultConfig
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({ top: 0 });
    });
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
      return this.$refs.mySwiper2.swiper;
    }
  },
  created() {
    this.fnLoadLessonAndTeacher();
  },
  mounted() {},
  methods: {
    onblur() {
      if (this.lessonName == "") {
        // this.handelClickSearch();
      }
    },
    switchTabItem(index) {
      console.log("on-before-index-change", index);
      switch (index) {
        case 0:
          this.typeIndex = index;
          this.fnLoadLessonAndTeacher();
          break;
        case 1:
          this.typeIndex = index;
          this.fnLoadLessonAndTeacher();
          break;
        default:
          return;
      }
      this.$vux.loading.show({
        text: "正在加载中..."
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.typeIndex = index;
      }, 500);
    },
    handelClickSearch() {
      this.fnLoadLessonAndTeacher();
    },
    handleClickLink(item) {
      this.lessonId = item.lessonId;
      this.$router.push({
        path: `/lesson/detail`,
        query: { lessonId: this.lessonId }
      });
    },
    fnLoadLessonAndTeacher(isConcat = false) {
      // if (!this.lessonName) {
      //   return;
      // }
      var params = {
        page: this.page,
        lessonName: this.lessonName?this.lessonName:this.$route.query.message,
        type: this.typeIndex + 1
      };
      var _this = this;
      api.selectLessonByName(params).then(data => {
        if (data.respCode == "0") {
          if (data.result.list.length == 0) {
            _this.showlist = false;
            _this.noneOfTeacher = true;
          } else {
            _this.showlist = true;
            _this.noneOfTeacher = false;
            if (isConcat) {
              _this.recommendedList = _this.recommendedList.concat(
                data.result.list
              );
            } else {
              _this.recommendedList = data.result.list;
            }

            _this.page = data.result.page;
            if (_this.page.currentPage === 1) {
              _this.$nextTick(() => {
                _this.$refs.scrollerBottom &&
                  _this.$refs.scrollerBottom.donePulldown();
              });
            }
            if (_this.page.currentPage >= _this.page.totalPage) {
              _this.$nextTick(() => {
                _this.$refs.scrollerBottom &&
                  _this.$refs.scrollerBottom.disablePullup();
              });
            } else {
              // 没有更多数据了
              _this.$nextTick(() => {
                _this.$refs.scrollerBottom &&
                  _this.$refs.scrollerBottom.enablePullup();
              });
            }
          }
        } else {
          _this.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
      });
    },
    // 下拉加载更多
    loadMore() {
      this.fnLoadMore();
    },
    fnLoadMore() {
      if (this.page.currentPage >= this.page.totalPage) {
        return;
      }
      this.page.currentPage += 1;
      this.fnLoadLessonAndTeacher(true);
    },
    //刷新
    refresh() {
      this.page.currentPage = 1;
      this.fnLoadLessonAndTeacher(false);
    },
    // 点击返回
    handelClickBack() {
      // debugger;
      this.$router.push({
        path: `home`
      });
    },
    handelClickCancel() {
      console.log("cancel");
      this.lessonName = "";
    }
  }
};
</script>
<style lang="scss" src="./index.scss">
</style>
