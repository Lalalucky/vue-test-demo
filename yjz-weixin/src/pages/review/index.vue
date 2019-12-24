<template>
    <ViewBox class="g2-page-view yjz-home review">
        <div class="review-submit" @click="handleClickSubmitReview()">提交</div>
        <textarea class="review-text" placeholder="回复:"></textarea>
    </ViewBox>
</template>
<script>
import { ViewBox } from "vux";
import * as api from "@/api/project/lesson_home.js";

export default {
  components: {
    ViewBox
  },
  data() {
    return {
      isSid: false
    };
  },
  created() {
    this.isSid = getCookies("sid") ? true : false;
  },
  methods: {
    handleClickSubmitReview() {
      var params = {
        lessonId: this.lessonId
      };
      api.addLessonComment(params).then(data => {
        if (data.respCode == "0") {
          self.$vux.toast.show({
            text: "回复成功",
            type: "warn"
          });
        } else {
          self.$vux.toast.show({
            text: data.respMsg,
            type: "warn"
          });
        }
      });
    }
  }
};
</script>
<style>
.review {
  height: 100%;
  position: relative;
  background-color: #fff;
}
.review-submit {
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
.review-text {
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

