<template>
  <div>
    <ViewBox class="g2-page-view yjz-home">
      <div class="class-top">
        <div class="g2-header-fixed g2-search">
          <div class="search-header">
            <div class="header-actions header-actions2" @click="handelClickSearch">
              <img src="~@public/image/home_law/logo.png" alt="">
            </div>
            <div class="search-header-input">
              <i class="iconfont icon-search"></i>
              <input
                class="search-header__input"
                placeholder="搜索课程、老师、关键词"
                ref="input"
                v-model="serLessonName"
                @blur="onblur()"
                @click="handleChangeFocus"
              >
            </div>
          </div>
        </div>
        <div class="topImage">
          <swiper :options="swiperOption3 " ref="mySwiper3">
            <swiper-slide>
              <div>
                <img src="~@public/image/home_law/banner.png" alt="">
              </div>
            </swiper-slide>
            <swiper-slide>
              <div>
                <img src="~@public/image/home_law/banner1.png" alt="">
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <!-- <swiper :list="newsList"></swiper> -->
        <div class="three-theme">
          <div class="theme-box">
            <div class="theme-item">
              <img src="~@public/image/home_law/zhibo.png" alt="">
              <div>直播课</div>
            </div>
            <div class="theme-item">
              <img src="~@public/image/home_law/huodong.png" alt="">
              <div>活动行</div>
            </div>
            <div class="theme-item">
              <img src="~@public/image/home_law/paihang.png" alt="">
              <div>排行榜</div>
            </div>
          </div>
        </div>
      </div>
      <div class="home-container">
        <!-- 最新课程 -->
        <div class="newClass sizing">
          <div class="classType">最新课程</div>
          <div class="classList">
            <div
              class="class-item"
              v-for="(item,index) in newList"
              :key="index"
              @click="handleClickLink(item)"
            >
              <div class="class-item-img">
                <img :src="item.lessonPicPath" alt="">
              </div>
              <div class="class-desc">{{item.lessonName}}</div>
              <div class="renshu">
                <span class="time">{{item.createTime| date_format('YYYY-MM-DD HH:MM')}}</span>
                <span>
                  <img src="~@public/image/home_law/renshu.png" alt="">
                  <span>{{item.clickNum}}</span>
                </span>
              </div>
              <div class="class-count">￥{{item.lessonPrice}}</div>
            </div>
          </div>
          <div class="lookMore">
            <span @click="handleClickMoreLessons">查看更多课程</span>
            <span class="lookMoreTip" @click="handleChangePageNew">
              <img
                src="~@public/image/home_law/huanyipi.png"
                alt=""
                style="vertical-align: bottom;"
              >
              换一批
            </span>
          </div>
        </div>
        <!-- 最近直播 -->
        <div class="lastLive newClass sizing">
          <div class="classType">最近直播</div>
          <div class="box1-item">
            <swiper :options="swiperOption2 " ref="mySwiper2">
              <swiper-slide v-for="(item,index) in liveList" :key="index">
                <div class="ul-box" :style="listWidth">
                  <div style="display:inline-block;width: 100%;">
                    <div class="lastLive-box">
                      <div class="liveBiaoji">还未直播</div>
                      <div class="liveDetail">
                        <div class="detailbox">
                          <div class="live-desc">{{item.title}}</div>
                          <div class="live-baoming">{{item.num}}人报名</div>
                          <div class="live-baoming">开播时间：{{item.time}}</div>
                        </div>
                        <div class="live-teacher">
                          <img src="~@public/image/home_law/techer.jpg" alt="">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <!-- <div class="lastLive-box">
          <div class="liveBiaoji">还未直播</div>
          <div class="liveDetail">
            <div>
              <div class="live-desc">开讲啦！公证系列微视频上线培训</div>
              <div class="live-baoming">4526人报名</div>
              <div class="live-baoming">开播时间：2019年9月04日  18:00</div>
            </div>
            <div class="live-teacher">
              <img src alt />
            </div>
          </div>
          </div>-->
        </div>
        <!-- 推荐课程 -->
        <div class="newClass recommended sizing">
          <div class="classType">推荐课程</div>
          <div class="recommended-box">
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
                        <img src="~@public/image/home_law/techer.jpg" alt="">
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
          <div class="lookMore">
            <span @click="handleClickMoreLessons">查看更多课程</span>
            <span class="lookMoreTip" @click="handleChangePage">
              <img
                src="~@public/image/home_law/huanyipi.png"
                alt=""
                style="vertical-align: bottom;"
              >
              换一批
            </span>
          </div>
        </div>
        <!-- 专家推荐 -->
        <div class="newClass sizing proficient">
          <div class="classType">专家推荐</div>
          <div class="proficient-item">
            <div class="swiper-box">
              <div class="swiper-wrapper">
                <swiper
                  :options="proficientSwiperOption"
                  ref="proficientSwiper"
                  v-if="proficientList.length"
                >
                  <swiper-slide v-for="item in proficientList" :key="item.recommendId">
                    <div class="swiper-slide">
                      <div class="swiper-image">
                        <img :src="item.professorPic" alt="">
                      </div>
                      <div class="swiper-name">{{item.professorName}}</div>
                      <div class="swiper-appellation">{{item.appellation}}</div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
            <div class="proficient-play" v-if="proficientList.length">
              <div class="proficient-up">
                <div class="proficient-image">
                  <img :src="proficientList[activeIndex].lessonResps[0].lessonPicPath" alt="">
                </div>
                <div class="recommend-name">
                  <div
                    class="recommend-desc"
                  >{{proficientList[activeIndex].lessonResps[0].lessonName}}</div>
                  <div class="recommend-teacher">
                    <div class="teacher-image">
                      <div>
                        <img :src="proficientList[activeIndex].lessonResps[0].lecturePic" alt="">
                      </div>
                      <span>{{proficientList[activeIndex].lessonResps[0].lecturerName}}</span>
                    </div>
                    <div class="jieshu">{{proficientList[activeIndex].lessonResps[0].subNum}}节</div>
                  </div>
                </div>
              </div>
              <div class="recommended-down">
                <div class="xuexi">{{proficientList[activeIndex].lessonResps[0].clickNum}}人已学习</div>
                <div class="count">￥{{proficientList[activeIndex].lessonResps[0].lessonPrice}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新活动 -->
        <div class="newClass activity sizing">
          <div class="classType">新闻活动
            <div class="news-more" @click="handleClickMoreNews">查看更多</div>
          </div>
          <swiper :options="swiperOption " ref="mySwiper">
            <swiper-slide v-for="(v1,i1) in 3" :key="i1">
              <div class="activity-box">
                <div class="activity-item" v-for="(item,i2) in splitActivityList[i1]" :key="i2">
                  <div class="activity-image">
                    <img :src="item.activityPic" alt="">
                  </div>
                  <div class="activity-desc">
                    <div class="name">{{item.activityName}}</div>
                    <div class="date">
                      <span>{{item.createTime| date_format('MM月DD日 HH:MM')}}</span>
                      <span>{{item.activityAddress}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" style="bottom: 0px;"></div>
          </swiper>
        </div>
      </div>
    </ViewBox>
  </div>
</template>
<script>
import { Card, ViewBox, querystring, Scroller } from "vux";
import { mapState, mapGetters } from "vuex";
import url from "@/utils/url.js";
import * as api from "@/api/project/lesson_home.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  name: "LoginPage",
  components: {
    Card,
    ViewBox,
    Scroller,
    // Swiper,
    swiper,
    swiperSlide
  },
  data() {
    const slidesPerView = 3;
    return {
      url: "http://www.yjzgo.com/lt-page/weixin/temp-img/", // 临时图片url
      serLessonName: "",
      liveList: [
        {
          title: "开讲啦！公证系列微视频上线培训",
          num: "125",
          time: "2019年8月12日 19：30",
          image: "~@public/image/home_law/techer.jpg"
        },
        {
          title: "公开课：公证合法空间动态",
          num: "135",
          time: "2019年8月18日 19：30",
          image: "~@public/image/home_law/techer2.jpg"
        },
        {
          title: "公开课：公证合法上线培训",
          num: "25",
          time: "2019年8月18日 19：30",
          image: "~@public/image/home_law/techer.jpg"
        }
      ],
      proficientList: [],
      activityList: [],
      splitActivityList: [],
      swiperOption: {
        // autoplay: 3000,
        autoplayDisableOnInteraction: false,
        // pagination: ".swiper-pagination",
        pagination: {
          el: ".swiper-pagination"
        }, //分页器挂载到swiper-pagination类对应的元素上
        loop: true,
        paginationClickable: true
      },
      swiperOption2: {
        // autoplay: 3000,
        autoplayDisableOnInteraction: false,
        loop: true
      },
      proficientSwiperOption: {
        slidesPerView,
        loop: true,
        spaceBetween: 30,
        initialSlide: 0,
        centeredSlides: true
      },
      swiperOption3: {
        // autoplay: 3000,
        autoplayDisableOnInteraction: false,
        pagination: {
          el: ".swiper-pagination"
        }, //分页器挂载到swiper-pagination类对应的元素上
        loop: true
      },
      listWidth: "",
      page: {
        currentPage: 1,
        pageNumber: 10,
        totalNumber: 0,
        totalPage: 1
      },
      avtivityPage: {
        currentPage: 1,
        pageNumber: 12,
        totalNumber: 0,
        totalPage: 1
      },
      newList: [],
      recommendedList: [],
      lessonId: "",
      mySwiper: null,
      activeIndex: 0
    };
  },
  mounted() {
    setTimeout(() => {
      this.asyncCount = 5;
    }, 5000);
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
      return this.$refs.mySwiper2.swiper;
      return this.$refs.mySwiper3.swiper;
    }
  },
  created() {
    // // 处理微信端登录过的直接获取sid数据
    // ;
    // // 获取sid数据
    // const sid = url("?sid");
    // // 第一步保存用户的sid数据
    // if (sid) {
    //   this.$store.commit("base/user/s_sid", sid);
    // }
    this.loadAllActivities();
    this.loadNewlLesson();
    this.loadRecommended();
    this.loadProfessors();
  },

  methods: {
    onblur() {
      if (this.serLessonName == "") {
      }
    },
    handleChangeFocus() {
      this.$router.push({
        path: `search`
      });
    },
    handelClickSearch() {},
    //查询专家
    loadProfessors() {
      var self = this;
      api.selectProfessorLessons().then(data => {
        if (data.respCode !== "0") {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
        self.proficientList = data.result;
        self.$nextTick(() => {
          let swiperObj = this.$refs.proficientSwiper.swiper;
          swiperObj.on("slideChangeTransitionEnd", () => {
            this.activeIndex = swiperObj.realIndex;
          });
        });
      });
    },
    // 最新课程查询
    loadNewlLesson() {
      var params = {
        page: this.page,
        newFlag: "Y"
      };
      var self = this;
      if (this.page.currentPage > this.page.totalPage) {
        this.$vux.loading.show({
          text: "没有更多数据",
          time: 200
        });
        return;
      }
      api.selectLessonByName(params).then(data => {
        if (data.respCode !== "0") {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
        if (data.result.list && data.result.list.length > 6) {
          self.newList = data.result.list.slice(0, 6);
          self.page = data.result.page;
        } else {
          self.newList = data.result.list;
          self.page = data.result.page;
        }
      });
    },
    // 推荐课程查询
    loadRecommended() {
      var params = {
        page: this.page,
        newmainlyFlag: "Y"
      };
      var self = this;
      if (this.page.currentPage > this.page.totalPage) {
        this.$vux.loading.show({
          text: "没有更多数据",
          time: 200
        });
        return;
      }
      api.selectLessonByName(params).then(data => {
        if (data.respCode !== "0") {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
        if (data.result.list && data.result.list.length > 8) {
          self.page = data.result.page;
          self.recommendedList = data.result.list.slice(0, 8);
        } else {
          self.page = data.result.page;
          self.recommendedList = data.result.list;
        }
      });
    },
    //查询活动
    loadAllActivities() {
      // ;
      var params = {
        currentPage: this.avtivityPage.currentPage,
        pageNumber: this.avtivityPage.pageNumber
      };
      var self = this;
      api.selectActivityByPage(params).then(data => {
        if (data.respCode !== "0") {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
        self.activityList = data.result.list;
        for (let i = 0; i < 3; i++) {
          self.splitActivityList.push(data.result.list.slice(4 * i, 4 * i + 4));
        }
        self.avtivityPage = data.result.page;
      });
    },
    // 跳转最近详情页
    handleClickLink(item) {
      this.lessonId = item.lessonId;
      this.$router.push({
        path: `/lesson/detail`,
        query: { lessonId: this.lessonId }
      });
    },
    //查看更多课程
    handleClickMoreLessons() {
      this.$router.push({
        path: `/type`
      });
    },

    // 推荐课程换一批
    handleChangePage() {
      this.$vux.loading.show({
        text: "换一批"
      });
      this.page.currentPage = this.page.currentPage + 1;
      this.loadRecommended();
      setTimeout(() => {
        this.$vux.loading.hide();
        this.lessonIndex = index;
      }, 500);
    },
    // 最新课程换一批
    handleChangePageNew() {
      this.$vux.loading.show({
        text: "换一批"
      });
      this.page.currentPage = this.page.currentPage + 1;
      this.loadNewlLesson();
      setTimeout(() => {
        this.$vux.loading.hide();
        this.lessonIndex = index;
      }, 500);
    }
  },
  watch: {}
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