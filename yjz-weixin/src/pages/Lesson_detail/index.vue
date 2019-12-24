<template>
  <ViewBox class="g2-page-view yjz-home yjz-detail">
    <div class="lesson-detailAll">
      <div
        class="fullPlayer"
        v-if="fullScreen"
        id="fullEle"
        :style="{width:windowHeight+'px',height:windowWidth+'px',transform:'translate('+windowWidth+'px,0%) rotate(90deg)',transformOrigin:'0% 0%'}"
      ></div>
      <div class="video-fixed">
        <div class="lesson-live">
          <div id="my-video-ali"></div>
        </div>
      </div>
      <div class="content-video">
        <div class="lesson-desc paddingLR">
          <div class="lesson-name">{{contentList.lessonName}}</div>
          <div class="lesson-length">
            <span></span>
            共{{contentList.subLessonCounts}}节课
          </div>
          <div class="lesson-price">
            <span class="price">￥{{contentList.lessonPrice}}</span>
            <span>29人已购买</span>
          </div>
          <div class="lesson-teacher">
            <div class="teacher-image">
              <!-- <img src="~@public/image/home_law/techer.jpg" alt=""> -->
              <img :src="contentList.showPic" alt="">
            </div>
            <div class="teacher-desc">
              <div class="name">
                <div>老师：{{contentList.lecturerName}}</div>
                <div class="shanchang">擅长法律、公证行业</div>
              </div>
              <div class="dianzan">
                <span
                  class="meidian"
                  v-show="userBehavior.praiseFlag === false"
                  @click="handelClickThumbsUp()"
                ></span>
                <span
                  class="dianle"
                  v-show="userBehavior.praiseFlag === true"
                  @click="handelClickThumbsUp()"
                ></span>
                <div>点赞</div>
              </div>
            </div>
          </div>
          <div class="teacher-intro">{{contentList.lecturerInfo}}</div>
        </div>
        <div class="hengxian"></div>
        <div class="lessonBar">
          <div class="yjz-page-header">
            <tab v-model="lessonIndex" @on-before-index-change="switchTabItem">
              <tab-item>课程介绍</tab-item>
              <tab-item>课程目录</tab-item>
              <tab-item>学员评价({{contentList.commentNum}})</tab-item>
            </tab>
          </div>
        </div>
        <div class="hengxian"></div>
        <!-- 课程简介 -->
        <div class="lesson-container paddingLR" v-if="showDesc">
          <div class="people" v-html="contentList.content"></div>
        </div>
        <!-- 课程目录 -->
        <div class="lesson-container2 paddingLR" v-if="showDirectory">
          <div class="jijieke">共{{contentList.subLessonCounts}}节课</div>
          <div class="gaikuang">课程前沿概况</div>
          <div class="bikan">
            <!-- <span class="huifang">[回放]课程介绍(必看)</span> -->

            <span class="huifang">{{menuList[0].subLessonName}}</span>
            <div class="shiting" @click="handleClickVideoForFree(menuList[0])">免费试听</div>
          </div>
          <div class="gaikuang">课程内容概要</div>
          <div
            class="lesson-jie"
            v-for="(item,index) in menuListOther"
            :key="index"
            @click="handleClickVideoPlayer(item)"
          >
            <span style="margin-right:10px">1-{{index+1}}</span>
            <span class="subLesson">{{item.subLessonName}}</span>
            <span class="shichang">{{item.lessonTime}}</span>
          </div>
          <div class="lesson-noMore">没有更多</div>
        </div>
        <!-- 学员评价 -->
        <div class="aa" style="height:300px" v-if="showComments">
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
            v-if="showComments"
          >
            <div class="lesson-container3 paddingLR">
              <div class="score">
                <div class="score-left">
                  <span class="defen">{{score.averageScore}}</span>
                  <span class="manfen">满分10分</span>
                  <div class="dengji">
                    <rater v-model="score.commentLv" :min="0" :max="5" disabled></rater>
                  </div>
                </div>
                <div class="score-right" @click="handleClickEvaluate()">我要评价</div>
              </div>
              <div class="pinjia" v-for="(item,index) in commentsList" :key="index">
                <div class="pinjia-top">
                  <img
                    :src="item.parent.avatar"
                    alt=""
                    class="touxiang"
                    style="vertical-align: bottom;"
                  >
                  <span class="nichen">{{item.parent.nickName}}</span>
                  <rater v-model="item.parent.commentLv" :min="0" :max="5" disabled class="xingji"></rater>
                  <!-- <span class="jitianqian">{{item.timePassed}}</span> -->
                  <span class="jigezan">{{item.parent.likeNum}}&nbsp;</span>
                  <img
                    src="~@public/image/home_law/detail/zan.png"
                    alt=""
                    class="pinlun-dianzan"
                    v-if="item.parent.isAlreadyLike==2"
                    @click="handleClickAlreadyLike(item)"
                  >
                  <img
                    src="~@public/image/home_law/detail/zan-1.png"
                    alt=""
                    class="pinlun-dianzan"
                    v-if="item.parent.isAlreadyLike==1"
                    @click="handleClickAlreadyLike(item)"
                  >
                </div>
                <div class="pinjia-content">{{item.parent.content}}</div>
                <div class="pinjia-bottom">
                  <!-- <img src="~@public/image/home_law/detail/zan.png" alt="" class="dianzan"> -->
                  <!-- <img src="~@public/image/home_law/detail/edit.png" alt="" class="xiepinlun"> -->
                  <span class="longago">{{item.parent.timePassed}}</span>
                  <span
                    class="reviewNum"
                    @click="handleClickReview(item)"
                  >· {{item.parent.commentNum}}回复</span>
                </div>
                <div
                  class="pinjia-review"
                  v-for="(childrenItem,index) in item.children"
                  :key="index"
                >
                  <div class="review">
                    <div class="review-touxiang">
                      <div>
                        <img :src="childrenItem.avatar" alt="">
                      </div>
                      <span>{{childrenItem.nickName}}</span>
                    </div>
                    <div class="shijian-review">{{childrenItem.timePassed}}</div>
                  </div>
                  <div class="review-content">{{childrenItem.content}}</div>
                </div>
              </div>
            </div>
          </scroller>
          <div v-else></div>
        </div>
        <div class="buy-bottom bb">
          <div class="shouye" @click="handleClickBack">
            <img src="~@public/image/home_law/detail/home.png" alt="">
            <span>首页</span>
          </div>
          <div class="shouye">
            <img
              src="~@public/image/home_law/detail/collect.png"
              alt=""
              @click="handleClickCollect()"
              v-show="userBehavior.collectFlag===false"
            >
            <img
              src="~@public/image/home_law/detail/collect-1.png"
              alt=""
              @click="handleClickCollect()"
              v-show="userBehavior.collectFlag===true"
            >
            <span>收藏</span>
          </div>
          <div class="shouye">
            <img src="~@public/image/home_law/detail/share.png" alt="">
            <span>分享</span>
          </div>
          <div class="buynow">立即购买</div>
        </div>
      </div>
    </div>
  </ViewBox>
</template>
<script>
import { setCookies, getCookies, remove } from "@/utils/cookies.js";
import { Card, ViewBox, querystring, Scroller, Tab, TabItem, Rater } from "vux";
import url from "@/utils/url.js";
import * as api from "@/api/project/lesson_home.js";

const pulldownDefaultConfig = {
  content: "下拉刷新",
  height: 0,
  autoRefresh: false,
  downContent: "下拉刷新",
  upContent: "释放后刷新",
  loadingContent: "正在刷新...",
  clsPrefix: "xs-plugin-pulldown-"
};
const pullupDefaultConfig = {
  content: "",
  pullUpHeight: 60,
  height: 0,
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
    Tab,
    TabItem,
    Rater
  },
  data() {
    return {
      fullScreen: false,
      myPlayer: null,
      isSid: false,
      page: {
        currentPage: 1,
        pageNumber: 10,
        totalNumber: 0,
        totalPage: 0
      },
      newList: [],
      userBehavior: {
        collectFlag: false, // 是否收藏
        praiseFlag: false // 是否点赞他
      },
      recommendedList: [],
      contentList: [],
      menuList: [],
      lessonPic: "",
      lessonIndex: 0,
      showDesc: true,
      showDirectory: false,
      showComments: false,
      showVideoById: false,
      videoLists: [],
      menuListOther: [],
      score: [],
      commentsList: [],
      pullupDefaultConfig: pullupDefaultConfig,
      pulldownDefaultConfig: pulldownDefaultConfig,
      videoSrc: {
        origUrl: "", // 原始视频地址
        sdUrl: "", // 流畅画质
        hdUrl: "", // 标清
        shdUrl: "", // 高清
        snapshotUrl: "", // 封面地址
        src: ""
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.asyncCount = 5;
    }, 5000);
  },
  computed: {
    windowWidth() {
      return window.innerWidth;
    },
    windowHeight() {
      return window.innerHeight;
    }
  },
  beforeDestroy() {
    this.myPlayer.dispose();
  },
  created() {
    this.lessonId = this.$route.query.lessonId;
    this.loadLessonById();
    this.loadLessonMenuById();
    this.isSid = getCookies("sid") ? true : false;
    if (this.$route.query.lessonIndex) {
      this.lessonIndex = ~~this.$route.query.lessonIndex;
    }
  },
  methods: {
    play() {
      this.$refs.videoHandle.posterSetted = true;
      this.$refs.videoHandle.posterSetted.play();
      this.visible = false;
    },
    // 切换tab
    switchTabItem(index) {
      switch (index) {
        case 0:
          this.lessonIndex = index;
          this.showDesc = true;
          this.showVideoById = true;
          this.showDirectory = false;
          this.showComments = false;
          this.loadLessonById();
          break;
        case 1:
          this.lessonIndex = index;
          this.showDesc = false;
          this.showDirectory = true;
          this.showComments = false;
          this.showVideoById = true;
          // this.loadLessonMenuById();
          break;
        case 2:
          this.lessonIndex = index;
          this.showDesc = false;
          this.showDirectory = false;
          this.showComments = true;
          this.$nextTick(() => {
            var pHeight = parseFloat(
              document.getElementsByClassName("aa")[0].offsetHeight
            );
            var bHeight = parseFloat(
              document.getElementsByClassName("bb")[0].offsetHeight
            );
            this.scrollHeight = pHeight - bHeight + "px";
          });
          this.showVideoById = true;
          this.loadSelectAverageScore();
          this.handelClickSearchComments();
          break;
        default:
          return;
      }
      // this.$vux.loading.show({
      //   text: "正在加载中..."
      // });
      // setTimeout(() => {
      //   this.$vux.loading.hide();
      // }, 500);
    },
    //收藏
    handleClickCollect() {
      // if (this.isSid) {
      var params = {
        lessonId: this.lessonId,
        collectFlag: !this.userBehavior.collectFlag === true ? 1 : 0
      };
      var self = this;
      api.collectLesson(params).then(data => {
        if (data.respCode == "0") {
          self.userBehavior.collectFlag = !self.userBehavior.collectFlag;
          self.$vux.toast.show({
            text: data.result,
            type: "warn"
          });
        } else if (data.respCode == "gateway.000001") {
          self.$router.push({
            path: "/weixin/login"
          });
        } else {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
      });
      // } else {
      //   self.$router.push({
      //     path: "/weixin/login"
      //   });
      // }
    },
    //给老师点赞
    handelClickThumbsUp() {
      var self = this;
      if (this.isSid) {
        var params = {
          lessonId: this.lessonId
        };
        api.getLessonLiked(params).then(data => {
          if (data.respCode == "0") {
            self.userBehavior.praiseFlag = !self.userBehavior.praiseFlag;
            self.$vux.toast.show({
              text: "点赞成功",
              type: "warn"
            });
          } else {
            self.$vux.toast.show({
              text: data.respMsg,
              type: "warn"
            });
          }
        });
      } else {
        self.$router.push({
          path: "/weixin/login"
        });
      }
    },
    //用户点赞
    handleClickAlreadyLike(val) {
      var self = this;
      if (this.isSid) {
        var params = {
          commentId: val.parent.commentId
        };
        api.addCommentLike(params).then(data => {
          if (data.respCode !== "0") {
            self.$vux.toast.show({
              text: data.respMsg,
              type: "warn"
            });
          }
          self.handelClickSearchComments();
        });
      } else {
        self.$router.push({
          path: "/weixin/login"
        });
      }
    },
    //微信端用户回复
    handleClickReview(val) {
      var self = this;
      if (this.isSid) {
        self.$router.push({
          path: `/reply?replyId=${val.parent.userId}&lessonId=${
            val.parent.lessonId
          }&parentId=${val.parent.commentId}&commentId=${val.parent.commentId}`
        });
      } else {
        self.$router.push({
          path: "/weixin/login"
        });
      }
    },
    //自己评价
    handleClickEvaluate() {
      var self = this;
      if (this.isSid) {
        self.$router.push({
          path: `/evaluate?lessonId=${this.lessonId}`
        });
      } else {
        self.$router.push({
          path: "/weixin/login"
        });
      }
    },
    //分页查询评价内容
    handelClickSearchComments(isConcat = false) {
      //  this.showComments = false;
      var params = {
        page: this.page,
        lessonId: this.lessonId
      };
      var _this = this;
      api.selectCommentsByPage(params).then(data => {
        if (data.respCode == "0") {
          _this.showComments = true;
          if (isConcat) {
            _this.commentsList = _this.commentsList.concat(data.result.list);
          } else {
            _this.commentsList = data.result.list;
          }
          _this.page = data.result.page;
          _this.$nextTick(() => {
            _this.$refs.scrollerBottom.reset({ top: 0 });
          });
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
      this.handelClickSearchComments(true);
    },
    //刷新
    refresh() {
      this.page.currentPage = 1;
      this.handelClickSearchComments(false);
    },
    // 根据id查询课程详情
    loadLessonById() {
      var params = {
        lessonId: this.lessonId
      };
      var self = this;
      api.selectLessonById(params).then(data => {
        if (data.respCode !== "0") {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
        if (data.result) {
          self.contentList = data.result;
          self.userBehavior.collectFlag =
            data.result.collectFlag == 1 ? true : false;
          self.userBehavior.praiseFlag =
            data.result.likeFlag == 1 ? true : false;
        }
      });
    },
    //查分数
    loadSelectAverageScore() {
      var params = {
        lessonId: this.lessonId
      };
      var self = this;
      api.selectAverageScoreById(params).then(data => {
        if (data.respCode !== "0") {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
        if (data.result) {
          self.score = data.result;
        }
      });
    },
    // 根据id查询课程目录
    loadLessonMenuById() {
      var params = {
        lessonId: this.lessonId
      };
      var self = this;
      api.selectLessonMenuById(params).then(data => {
        if (data.respCode !== "0") {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
        if (data.result) {
          self.menuList = data.result;
          self.menuListOther = data.result.splice(1);
          self.handleClickVideoForFree(self.menuList[0]);
        }
      });
    },
    handleClickBack() {
      this.$router.push({
        path: `/home`
      });
    },

    handleClickVideoForFree(val) {
      // debugger;
      if (this.myPlayer) {
        this.myPlayer.dispose();
      }
      var params = {
        subLessonId: val.subLessonId
      };
      // var self = this;
      api.selectVideoForFree(params).then(res => {
        if (res.respCode !== "0") {
          return this.$vux.toast.show({
            text: res.respMsg,
            type: "warn"
          });
        }
        let VideoId = res.result.vid;
        this.initPlayer(VideoId);
      });
    },
    initFullPlayer(playauth, VideoId, currentTime) {
      let self = this;
      this.fullPlayer = new Aliplayer(
        {
          id: "fullEle",
          width: "100%",
          height: "100%",
          autoplay: true,
          vid: VideoId,
          playauth: playauth,
          language: "zh-cn",
          // cover:item.snapshotUrl,
          definition: ["FD", "LD", "SD", "HD", "OD"],
          controlBarVisibility: "always",
          skinLayout: [
            { name: "bigPlayButton", align: "tlabs", x: 80, y: 30 },
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                { name: "progress", align: "tlabs", x: 0, y: 10 },
                { name: "playButton", align: "tl", x: 8, y: 16 },
                { name: "timeDisplay", align: "tl", x: 10, y: 10 },
                { name: "fullScreenButton", align: "tr", x: 10, y: 18 },
                { name: "volume", align: "tr", x: 10, y: 15 },
                { name: "setting", align: "tr", x: 10, y: 17 }
              ]
            }
          ]
        },
        function() {
          self.fullPlayer.seek(currentTime);
          self.fullPlayer.play();
          var fullBtn = document.getElementsByClassName(
            "prism-fullscreen-btn"
          )[0];
          fullBtn.onclick = function() {
            self.$nextTick(() => {
              let currentTime = self.fullPlayer.getCurrentTime();
              self.fullPlayer.dispose();
              self.initPlayer(VideoId, currentTime);
              self.fullScreen = false;
              self.$forceUpdate();
            });
          };
        }
      );
    },
    initPlayer(VideoId, currentTime) {
      let self = this;
      api
        .selectVideoAuth({ VideoId })
        .then(data => {
          let playauth = data.result;
          this.myPlayer = new Aliplayer(
            {
              id: "my-video-ali",
              width: "100%",
              height: "100%",
              autoplay: currentTime?true:false,
              vid: VideoId,
              playauth: playauth,
              language: "zh-cn",
              // cover:item.snapshotUrl,
              definition: ["FD", "LD", "SD", "HD", "OD"],
              controlBarVisibility: "always",
              skinLayout: [
                { name: "bigPlayButton", align: "tlabs", x: 80, y: 30 },
                {
                  name: "controlBar",
                  align: "blabs",
                  x: 0,
                  y: 0,
                  children: [
                    { name: "progress", align: "tlabs", x: 0, y: 10 },
                    { name: "playButton", align: "tl", x: 8, y: 16 },
                    { name: "timeDisplay", align: "tl", x: 10, y: 10 },
                    { name: "fullScreenButton", align: "tr", x: 10, y: 18 },
                    { name: "volume", align: "tr", x: 10, y: 15 },
                    { name: "setting", align: "tr", x: 10, y: 17 }
                  ]
                }
              ]
            },
            function() {
              if (currentTime) {
                self.myPlayer.seek(currentTime);
                self.myPlayer.play();
              }
              var fullBtn = document.getElementsByClassName(
                "prism-fullscreen-btn"
              )[0];
              fullBtn.onclick = function() {
                self.fullScreen = true;
                self.$forceUpdate();
                self.$nextTick(() => {
                  let currentTime = self.myPlayer.getCurrentTime();
                  self.initFullPlayer(playauth, VideoId, currentTime);
                  self.myPlayer.dispose();
                });
              };
            }
          );
        })
        .catch(() => {
          this.$vux.toast.show({
            text: "获取视频auth失败",
            type: "warn"
          });
        });
    },

    handleClickVideoPlayer(val) {
      if (this.myPlayer) {
        this.myPlayer.dispose();
      }
      var self = this;
      var params = {
        subLessonId: val.subLessonId
      };
      // var self = this;
      api.selectSubLessonById(params).then(res => {
        if (res.respCode !== "0") {
          this.$vux.toast.show({
            text: res.respMsg,
            type: "warn"
          });
          this.$router.push({
            path: "/weixin/login"
          });
        }
        let VideoId = res.result.vid;
        this.initPlayer(VideoId);
      });
    }
  },
  watch: {
    lessonIndex(val) {
      this.switchTabItem(val);
    }
  }
};
</script>
<style lang="scss" src="./index.scss">
</style>
