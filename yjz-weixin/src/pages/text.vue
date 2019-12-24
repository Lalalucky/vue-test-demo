<template>
  <!-- <scroller lock-y :scrollbar-x="false">
    <div class="ul-box" :style="sfsdggj">
      <div v-for="i in list" style="display:inline-block; width: 350px;">
        <div class="lastLive-box">
          <div class="liveBiaoji">还未直播</div>
          <div class="liveDetail">
            <div>
              <div class="live-desc">开讲啦！公证系列微视频上线培训</div>
              <div class="live-baoming">4526人报名</div>
              <div class="live-baoming">开播时间：2019年9月04日 18:00</div>
            </div>
            <div class="live-teacher">
              <img src alt />
            </div>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
  </scroller>-->

  <div>
    <swiper :options="swiperOption " ref="mySwiper">
      <swiper-slide v-for="i in 3" :key="i">
        <div class="activity-box">
          <div class="activity-item" v-for="i in 4">
            <div class="activity-image">
              <img src alt />
            </div>
            <div class="activity-desc">
              <div class="name">第三届新兴法律服务产业博览会暨高峰论坛</div>
              <div class="date">
                <span>9月26日 09:30</span>
                <span>南京建邺</span>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { Card, ViewBox, querystring, Scroller } from "vux";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "LoginPage",
  components: {
    Card,
    ViewBox,
    Scroller,
    swiper,
    swiperSlide
  },
  data() {
    return {
      arrItem: [
        {
          name: "swiperSlide5",
          imgUrl: "http://pic.58pic.com/58pic/13/60/16/64b58PICXEK_1024.jpg"
        },
        {
          name: "swiperSlide1",
          imgUrl: "http://image.qmango.com/hotelimg/dl1210/109490/109.jpeg"
        },
        {
          name: "swiperSlide51",
          imgUrl: "http://image.qmango.com/hotelimg/dl1210/125708/181.jpeg"
        },
        {
          name: "swiperSlide1111115",
          imgUrl: "http://image.qmango.com/hotelimg/dl1210/119297/793.jpeg"
        }
      ],
      list: [1, 2, 3, 4, 4, 45, 4, 4],
      projectName: "",
      newsList: [
        {
          url: "javascript:",
          img: "~@public/image/home_law/banner.png",
          title: "送你一朵fua",
          fallbackImg: "~@public/image/home_law/banner.png"
        }
      ],
      sfsdggj: "",
      swiperOption: {
        autoplay: 3000,

        autoplayDisableOnInteraction: false,
        pagination: ".swiper-pagination", //分页器挂载到swiper-pagination类对应的元素上
        loop: true
      },

      swipers: [
        { fdcImage: "http://image.qmango.com/hotelimg/dl1210/119297/793.jpeg" },
        {
          fdcImage: "http://pic.58pic.com/58pic/13/60/16/64b58PICXEK_1024.jpg"
        },
        { fdcImage: "http://image.qmango.com/hotelimg/dl1210/119297/793.jpeg" },
        { fdcImage: "http://image.qmango.com/hotelimg/dl1210/119297/793.jpeg" }
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      this.asyncCount = 5;
    }, 1000);
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {
    // 处理微信端登录过的直接获取sid数据
    // 第一步保存用户的sid数据
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
    handelClickSearch() {},
    fLoadClientList() {
      this.$store
        .dispatch("home/home/fnLoadAllNews", {})
        .then(result => {})
        .catch(_ => {});
    },
    fLoadMeetList() {
      this.$store
        .dispatch("home/home/fnLoadAllMeet", {})
        .then(result => {})
        .catch(_ => {});
    },
    fLoadNoticeList() {
      this.$store
        .dispatch("home/home/fnLoadAllNotice", {})
        .then(result => {})
        .catch(_ => {});
    },
    // 点击进入会议
    handleClickGotoMeet(meet) {
      this.$router.push({
        path: `home/detail/2/${meet.meetId}`
      });
    },
    // 点击进入会议
    handleClickGotoNotice(notice) {
      this.$router.push({
        path: `home/detail/3/${notice.noticeId}`
      });
    },
    // 点击进入会议
    handleClickGotoNews(news) {
      this.$router.push({
        path: `home/detail/1/${news.newsId}`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ul-box {
  position: relative;
  white-space: nowrap;
  width: 1580px;
}
.lastLive-box {
  margin-right: 0.266667rem;
  width: 7.573rem;
  height: 3.467rem;
  background-color: #f6f6fb;
  border-radius: 0.107rem;
  position: relative;
  .liveBiaoji {
    top: 0;
    left: 0;
    padding: 0.08rem 0.28rem 0.093rem 0.267rem;
    width: 1.6rem;
    color: #fefefe;
    font-size: 0.267rem;
    background-color: #49af4f;
    border-radius: 0.107rem 0rem 0.107rem 0rem;
  }
  .liveDetail {
    display: flex;
    justify-content: space-between;
    padding: 0.307rem 0.347rem 0.56rem 0.32rem;
    .live-desc {
      width: 4.373rem;
      color: #2c2c35;
      font-size: 0.4rem;
      line-height: 1.4;
      margin-bottom: 0.403rem;
    }
    .live-baoming {
      color: #aeafc0;
      margin-bottom: 0.187rem;
      font-size: 0.32rem;
    }
  }
  .live-teacher {
    width: 1.28rem;
    height: 1.28rem;
    border-radius: 50%;
    background-color: #aeafc0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.activity {
  .activity-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    .activity-item {
      margin-bottom: 0.266667rem;
      width: 4.413rem;
      border-radius: 0.08rem 0.08rem 0rem 0rem;
      .activity-image {
        width: 4.413rem;
        height: 2.653rem;
        background-color: #ededed;
        position: relative;
        z-index: 1;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .activity-desc {
        -moz-box-shadow: 1px 1px 0.106667rem #95999e63;
        -webkit-box-shadow: 1px 1px 0.106667rem #95999e63;
        box-shadow: 1px 1px 0.106667rem #95999e63;
        padding: 0.52rem 0.28rem;
        .name {
          width: 100%;
          font-size: 0.373rem;
          color: #2c2c35;
          line-height: 1.4;
          margin-bottom: 0.333rem;
        }
        .date {
          display: flex;
          justify-content: space-between;
          color: #aeafc0;
          font-size: 0.293rem;
        }
      }
    }
  }
}
.swiper-container {
  width: 100%;
  height: 10rem;
  .swiper-wrapper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>