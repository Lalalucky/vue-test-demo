<template>
  <ViewBox class="g2-page-view yjz-home">
    <div class="class-top">
      <div class="g2-header-fixed g2-search">
        <div class="search-header">
          <span class="header-actions header-actions2" @click="handelClickSearch"></span>
          <div class="search-header-input">
            <i class="iconfont icon-search"></i>
            <input
              class="search-header__input"
              placeholder="搜索课程、老师、关键词"
              ref="input"
              v-model="collectFlag"
              @blur="onblur()"
              @click="handleChangeFocus"
            >
          </div>
        </div>
      </div>
      <div class="topImage">
        <swiper :options="swiperOption2 " ref="mySwiper2">
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
          <div class="class-item" v-for="(item,index) in newList" :key="index">
            <div class="class-item-img">
              <img :src="item.lessonPic" alt="">
            </div>
            <div class="class-desc">{{item.lessonName}}</div>
            <div class="renshu">
              <span class="time">{{item.createTime| date_format('YYYY-MM-DD HH:MM')}}</span>
              <span>
                <img src="~@public/image/home_law/renshu.png" alt="">
                <span>806</span>
              </span>
            </div>
            <div class="class-count">￥{{item.lessonPrice}}</div>
          </div>
        </div>
        <div class="lookMore">
          <span>查看更多课程</span>
          <span class="lookMoreTip">
            <img src="~@public/image/home_law/huanyipi.png" alt="">换一批
          </span>
        </div>
      </div>
      <!-- 最近直播 -->
      <div class="lastLive newClass sizing">
        <div class="classType">最近直播</div>
        <div class="box1-item">
          <Scroller lock-y :scrollbar-x="false">
            <div class="ul-box" :style="listWidth">
              <div
                v-for="(item,index) in liveList"
                style="display:inline-block; width: 350px;"
                :key="index"
              >
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
          </Scroller>
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
          <div class="box-item" v-for="(item,index) in recommendedList" :key="index">
            <div class="recommended-up">
              <div class="recommend-image">
                <img src="" alt="">
              </div>
              <div class="recommend-name">
                <div class="recommend-desc">{{item.lessonName}}</div>
                <div class="recommend-teacher">
                  <div class="teacher-image">
                    <div>
                      <img src="" alt="">
                    </div>
                    <span>{{item.lectureName}}</span>
                  </div>
                  <div class="jieshu">14节</div>
                </div>
              </div>
            </div>
            <div class="recommended-down">
              <div class="xuexi">152人已学习</div>
              <div class="count">￥{{item.lessonPrice}}</div>
            </div>
          </div>
        </div>
        <div class="lookMore">
          <span>查看更多课程</span>
          <span class="lookMoreTip">
            <img src="~@public/image/home_law/huanyipi.png" alt="">换一批
          </span>
        </div>
      </div>
      <!-- 最新活动 -->
      <div class="newClass activity sizing">
        <div class="classType">最新活动</div>
        <swiper :options="swiperOption " ref="mySwiper">
          <swiper-slide v-for="i in 3" :key="i">
            <div class="activity-box">
              <div class="activity-item" v-for="(item,i) in activityList" :key="i">
                <div class="activity-image">
                  <img src="~@public/image/home_law/24.jpeg" alt="">
                </div>
                <div class="activity-desc">
                  <div class="name">{{item.title}}</div>
                  <div class="date">
                    <span>{{item.createTime}}</span>
                    <span>{{item.destination}}</span>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </ViewBox>
</template>
<script>
import { Swiper, Card, ViewBox, querystring, Scroller } from "vux";
import { mapState, mapGetters } from "vuex";
import url from "@/utils/url.js";
import * as api from "@/api/project/lesson_home.js";
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
      collectFlag: "",
      liveList: [
        {
          title: "开讲啦！公证系列微视频上线培训",
          num: "125",
          time: "2019年8月12日 19：30",
          image: "~@public/image/home_law/techer.png"
        },
        {
          title: "公开课：公证合法空间动态",
          num: "135",
          time: "2019年8月18日 19：30",
          image: "~@public/image/home_law/techer2.jpg"
        }
      ],

      activityList: [
        {
          img: "~@public/image/home_law/24.jpeg",
          title: "第三届新兴法律服务产业博览会暨高峰论坛",
          time: "9月26日 09:30",
          destination: "南京建邺"
        },
        {
          img: "~@public/image/home_law/512.jpg",
          title: "第三届新兴法律服务产业博览会暨高峰论坛",
          time: "9月26日 19:30",
          destination: "上海黄浦"
        },
        {
          img: "~@public/image/home_law/d.jpg",
          title: "第三届新兴法律服务产业博览会暨高峰论坛",
          time: "9月26日 09:30",
          destination: "北京海淀"
        },
        {
          img: "~@public/image/home_law/1.jpeg",
          title: "第三届新兴法律服务产业博览会暨高峰论坛",
          time: "9月26日 09:30",
          destination: "四川成都"
        }
      ],
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
      },
      page: {
        currentPage: 1,
        pageNumber: 10,
        totalNumber: 0,
        totalPage: 0
      },
      newList: [],
      recommendedList: []
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
    this.loadNewlLesson();
    this.loadRecommended();
    var length = this.liveList.length;
    this.listWidth = "width: " + length * 350 + "px";
  },
  mounted() {},
  methods: {
    onblur() {
      if (this.collectFlag == "") {
        this.loadAllStatistics();
      }
    }, 
    handleChangeFocus() {
      this.$router.push({
        path: `homeSearch`
      });
    },
    handelClickSearch() {},
    loadNewlLesson() {
      var params = {
        page: this.page,
        newFlag: "Y"
      };
      var self = this;
      api.selectLessonByName(params).then(data => {
        if (data.respCode !== "0") {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
        self.newList = data.result.list.slice(0, 5);
      });
    },
    loadRecommended() {
      var params = {
        page: this.page,
        newmainlyFlag: "Y"
      };
      var self = this;
      api.selectLessonByName(params).then(data => {
        if (data.respCode !== "0") {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
        self.recommendedList = data.result.list.slice(0, 7);
      });
    },
 
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