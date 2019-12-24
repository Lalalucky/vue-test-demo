<template>
  <ViewBox class="g2-page-view yjz-home">
    <div class="lesson-typeAll">
      <div class="g2-header-fixed g2-search">
        <div class="search-header">
          <div @click="handleClickBack">
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
              @click="handleChangeFocus"
            >
            <i class="iconfont icon-iconsearchdelete cancel" @click="handelClickCancel"></i>
          </div>
          <span class="header-actions header-actions1" @click="handelClickSearch">搜索</span>
        </div>
      </div>
      <div class="lessonBar">
        <sidebar v-model="activeKey" @change="switchSliderItem">
          <sidebar-item title="公证培训"/>
          <sidebar-item title="诉讼培训"/>
          <sidebar-item title="语言培训"/>
          <sidebar-item title="涉外法务"/>
        </sidebar>
        <div class="container cc">
          <div class="topImage">
            <img src="~@public/image/home_law/banner2.png" alt="">
          </div>
          <!-- 推荐课程 -->
          <scroller
            use-pullup
            :pullup-config="pullupDefaultConfig"
            @on-pullup-loading="loadMore"
            use-pulldown
            :pulldown-config="pulldownDefaultConfig"
            @on-pulldown-loading="refresh"
            lock-x
            ref="scrollerBottom"
            :height="scrollHeight"
          >
            <div class="newClass recommended sizing">
              <!-- <div class="recommended-box"> -->
              <div
                class="box-item"
                v-for="(item,index) in contentList"
                :key="index"
                @click="handleClickLink(item)"
              >
                <div class="recommended-up">
                  <div class="recommend-image">
                    <!-- <img src="~@public/image/home_law/4.png" alt /> -->
                    <img :src="item.lessonPicPath" alt="">
                  </div>
                  <div class="recommend-name">
                    <div class="recommend-desc">{{item.lessonName}}</div>
                    <div class="recommend-teacher">
                      <div class="teacher-image">
                        <div>
                          <!-- <img src="~@public/image/home_law/5-8.jpg" alt /> -->
                          <img :src="item.lecturePic" alt="">
                        </div>
                        <span>{{item.lecturerName}}</span>
                      </div>
                      <div class="jieshu">{{item.subNum}}节</div>
                    </div>
                    <div class="recommended-down">
                      <div class="xuexi">{{item.clickNum}}人已学习</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- </div> -->
            </div>
          </scroller>
        </div>
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
import { mapState, mapGetters } from "vuex";
import url from "@/utils/url.js";
import * as api from "@/api/project/lesson_home.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Sidebar, SidebarItem } from "vant";
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
    TabItem,
    Sidebar,
    SidebarItem
  },
  data() {
    return {
      page: {
        currentPage: 1,
        pageNumber: 6,
        totalNumber: 0,
        totalPage: 0
      },
      contentList: [],
      menuList: [],
      lessonName: "",
      activeKey: 0,
      pullupDefaultConfig: pullupDefaultConfig,
      pulldownDefaultConfig: pulldownDefaultConfig
    };
  },
  created() {
    this.lessonId = this.$route.query.lessonId;
    this.loadLessonByNamePage();
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset();
    });
  },
  computed: {
    // scrollHeight() {
    //   this.$nextTick(() => {
        
    //   });
    // }
  },
  methods: {
    onblur() {
      if (this.lessonName == "") {
        // this.handelClickSearch();
      }
    },
    handelClickSearch() {},
    handleChangeFocus() {
      this.$router.push({
        path: `search`
      });
    },
    // 切换slider
    switchSliderItem(index) {
      switch (index) {
        case 0:
          this.activeKey = index;
          this.loadLessonByNamePage();
          break;
        case 1:
          this.activeKey = index;
          this.loadLessonByNamePage();
          break;
        case 2:
          this.activeKey = index;
          this.loadLessonByNamePage();
          break;
        case 3:
          this.activeKey = index;
          this.loadLessonByNamePage();
          break;
        default:
          return;
      }
      this.$vux.loading.show({
        text: "正在加载中..."
      });
      setTimeout(() => {
        this.$vux.loading.hide();
        this.activeKey = index;
      }, 500);
    },
    // 课程页
    loadLessonByNamePage(isConcat = false) {
      var params = {
        page: this.page,
        lessonClass: this.activeKey + 1
      };
      var _this = this;
      api.selectLessonByName(params).then(data => {
        if (data.respCode == "0") {
          if (isConcat) {
            _this.contentList = _this.contentList.concat(data.result.list);
          } else {
            _this.contentList = data.result.list;
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
            _this.$nextTick(() => {
              _this.$refs.scrollerBottom &&
                _this.$refs.scrollerBottom.enablePullup();
            });
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
      this.loadLessonByNamePage(true);
    },
    //刷新
    refresh() {
      this.page.currentPage = 1;
      this.loadLessonByNamePage(false);
    },
    // 跳转最近详情页
    handleClickLink(item) {
      this.lessonId = item.lessonId;
      this.$router.push({
        path: `/lesson/detail`,
        query: { lessonId: this.lessonId }
      });
    },
    handleClickBack() {
      this.$router.push({
        path: `/home`
      });
    },
    handelClickCancel() {
      console.log("cancel");
      this.lessonName = "";
    }
  },
  mounted(){
    let domH = document.getElementsByClassName("cc")[0].offsetHeight;
        let domH2 = document.getElementsByClassName("topImage")[0].offsetHeight;
        console.log(domH-domH2)
        this.scrollHeight = domH-domH2+'px';
  }
};
</script>
<style lang="scss" src="./index.scss">
</style>