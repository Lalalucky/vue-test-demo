<template>
    <ViewBox class="g2-page-view yjz-home evaluate">
        <div class="evaluate-submit" @click="handleClickSubmiteEvaluate()">提交</div>
        <div class="description">
            <div>{{serverAttitude[raterLevel]}}</div>
            <rater v-model="raterLevel" :min="0" :max="5"></rater>
        </div>
        <textarea class="evaluate-text" placeholder="感谢您的认可，留下您的评价可以帮助更多学员哦" v-model="content"></textarea>
    </ViewBox>
</template>
<script>
import { ViewBox, Rater } from "vux";
import * as api from "@/api/project/lesson_home.js";
import { getCookies } from "@/utils/cookies.js";

export default {
  components: {
    ViewBox,
    Rater
  },
  data() {
    return {
      isSid: false,
      page: {
        currentPage: 1,
        pageNumber: 10,
        totalNumber: 0,
        totalPage: 0
      },
      raterLevel: 0,
      serverAttitude: {
        0: "点击星星评分",
        1: "糟糕",
        2: "较差",
        3: "还行",
        4: "推荐",
        5: "太棒啦"
      },
      content: ""
    };
  },
  created() {
    this.isSid = getCookies("sid") ? true : false;
    this.lessonId = this.$route.query.lessonId;
  },
  methods: {
    handleClickSubmiteEvaluate() {
      var self = this;
      if (this.isSid) {
        var params = {
          lessonId: this.lessonId,
          commentLv: this.raterLevel,
          content: this.content
        };
        api.addLessonComment(params).then(data => {
          if (data.respCode == "0") {
            self.$vux.toast.show({
              text: "回复成功",
              type: "warn"
            });
            self.$router.push({
              path: `/lesson/detail?lessonId=${this.lessonId}`,
              query: {
                lessonIndex: 2
              }
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
    }
  }
};
</script>
<style>
.evaluate {
  height: 100%;
  position: relative;
  background-color: #fff;
}
.evaluate-submit {
  position: absolute;
  top: 0.666667rem;
  right: 0.666667rem;
  font-family: PingFang-SC-Medium;
  font-size: 0.426667rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #f54305;
}
.description {
  width: 6.266667rem;
  height: 1.76rem;
  position: absolute;
  top: 1.733333rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-family: PingFang-SC-Medium;
  font-size: 0.373333rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: 0px;
  color: #7b8196;
}
.evaluate .vux-rater-inner span {
  font-size: 36px !important;
}
.evaluate .vux-rater a {
  margin-right: 0.3rem !important;
}
.evaluate-text {
  width: 9.2rem;
  height: 4rem;
  border-radius: 0.133333rem;
  border: solid 0.04rem #efeff6;
  position: absolute;
  left: 50%;
  top: 5.066667rem;
  transform: translateX(-50%);
  padding: 0.266667rem;
  font-size: 0.373333rem;
  font-weight: normal;
  font-stretch: normal;
  color: #aeafc0;
  line-height: 0.48rem;
}
</style>

