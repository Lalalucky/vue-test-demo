<template>
  <ViewBox class="g2-page-view yjz-home reply">
    <div class="reply-submit" @click="handleClickSubmitReview()">提交</div>
    <textarea class="reply-text" placeholder="回复:" v-model="content"></textarea>
  </ViewBox>
</template>
<script>
import { ViewBox } from "vux";
import * as api from "@/api/project/lesson_home.js";
import { getCookies } from "@/utils/cookies.js";

export default {
  components: {
    ViewBox
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
      content: "",
    };
  },
  created() {
    this.isSid = getCookies("sid") ? true : false;
    this.replyId = this.$route.query.replyId;
    this.lessonId = this.$route.query.lessonId;
    this.parentId = this.$route.query.parentId;
    this.commentId = this.$route.query.commentId;
  },
  methods: {
    handleClickSubmitReview() {
      var self = this;
      if (this.isSid) {
        var params = {
          replyId: this.replyId,
          commentId: this.commentId,
          lessonId: this.lessonId,
          parentId: this.parentId,
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
              query:{
                lessonIndex:2
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
.reply {
  height: 100%;
  position: relative;
  background-color: #fff;
}
.reply-submit {
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
.reply-text {
  width: 9.2rem;
  height: 4rem;
  border-radius: 0.133333rem;
  border: solid 0.04rem #efeff6;
  position: absolute;
  left: 50%;
  top: 2.133333rem;
  transform: translateX(-50%);
  padding: 0.266667rem;
  font-size: 0.373333rem;
  font-weight: normal;
  font-stretch: normal;
  color: #aeafc0;
  line-height: 0.48rem;
}
</style>

