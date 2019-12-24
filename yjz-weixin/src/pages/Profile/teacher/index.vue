<template>
  <ViewBox class="user-info g2-page-view yjz-home">
    <!-- 12 30 -->
    <div class="up-stage">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- 简介 -->
          <div class="swiper-slide simply-instr">
            <div class="restrain">
              <!-- <div class="restrain-con"> -->
                <div class="avator">
                  <img :src="avator" alt />
                </div>
                <div class="name">李涛</div>
                <div class="sex-age">
                  <span>37岁</span>
                  <span class="devide-line"></span>
                  <span>男</span>
                </div>
                <div class="info-display">
                  <div class="item">
                    <div class="title">
                      <span>用</span>
                      <span>户</span>
                      <span>名</span>
                    </div>
                    <div>超级管理员</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>手</span>
                      <span>机</span>
                      <span>号</span>
                      <span>码</span>
                    </div>
                    <div>13152635266</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>所</span>
                      <span>在</span>
                      <span>地</span>
                      <span>址</span>
                    </div>
                    <div>江苏省南京市雨花台区小行路158号</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>电</span>
                      <span>子</span>
                      <span>邮</span>
                      <span>箱</span>
                    </div>
                    <div>125356456@163.com</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>个</span>
                      <span>人</span>
                      <span>简</span>
                      <span>介</span>
                    </div>
                    <div>法律界的权威，目前就职于南京中法法律有限公司，中国公证部门早就意识到对公证员培及改革需要。</div>
                  </div>
                </div>
                <div class="info-display">
                  <div class="item">
                    <div class="title">
                      <span>用</span>
                      <span>户</span>
                      <span>名</span>
                    </div>
                    <div>超级管理员</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>手</span>
                      <span>机</span>
                      <span>号</span>
                      <span>码</span>
                    </div>
                    <div>13152635266</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>所</span>
                      <span>在</span>
                      <span>地</span>
                      <span>址</span>
                    </div>
                    <div>江苏省南京市雨花台区小行路158号</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>电</span>
                      <span>子</span>
                      <span>邮</span>
                      <span>箱</span>
                    </div>
                    <div>125356456@163.com</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>个</span>
                      <span>人</span>
                      <span>简</span>
                      <span>介</span>
                    </div>
                    <div>法律界的权威，目前就职于南京中法法律有限公司，中国公证部门早就意识到对公证员培及改革需要。</div>
                  </div>
                </div>
                <div class="info-display">
                  <div class="item">
                    <div class="title">
                      <span>用</span>
                      <span>户</span>
                      <span>名</span>
                    </div>
                    <div>超级管理员</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>手</span>
                      <span>机</span>
                      <span>号</span>
                      <span>码</span>
                    </div>
                    <div>13152635266</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>所</span>
                      <span>在</span>
                      <span>地</span>
                      <span>址</span>
                    </div>
                    <div>江苏省南京市雨花台区小行路158号</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>电</span>
                      <span>子</span>
                      <span>邮</span>
                      <span>箱</span>
                    </div>
                    <div>125356456@163.com</div>
                  </div>
                  <div class="item">
                    <div class="title">
                      <span>个</span>
                      <span>人</span>
                      <span>简</span>
                      <span>介</span>
                    </div>
                    <div>法律界的权威，目前就职于南京中法法律有限公司，中国公证部门早就意识到对公证员培及改革需要。</div>
                  </div>
                </div>
              <!-- </div> -->
            </div>
          </div>
          <!-- 教师统计 -->
          <div class="swiper-slide teacher-summary">
            <div class="restrain">
              <div class="col-title">教师统计</div>
              <div class="summary-data">
                <div class="sub-title">数据统计</div>
                <ul class="data-list">
                  <li>
                    <div class="item">
                      <div>课程人气</div>
                      <div>124564</div>
                    </div>
                  </li>
                  <li>
                    <div class="item">
                      <div>点赞数</div>
                      <div>147515</div>
                    </div>
                  </li>
                  <li>
                    <div class="item">
                      <div>点击量</div>
                      <div>125452</div>
                    </div>
                  </li>
                  <li>
                    <div class="item">
                      <div>购买量</div>
                      <div>1545645</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="lesson-summary">
                <div class="fa-date-picker">
                  <div class="title">课程统计</div>
                  <div class="user-handle">
                    <Group class="user-select">
                      <popup-picker
                        :data="pickYear.list"
                        :popup-title="pickYear.title"
                        v-model="pickYear.year"
                        @on-change="onChange"
                        :display-format="format"
                      >
                        <template slot="title" slot-scope="props">
                          <span>年</span>
                          <span>月</span>
                        </template>
                      </popup-picker>
                    </Group>
                    <div class="fake-select"></div>
                  </div>
                </div>
                <div class="con-form">
                  <ul class="list-wrap">
                    <li>
                      <div class="item">
                        <div>课程人气</div>
                        <div>124564</div>
                      </div>
                    </li>
                    <li>
                      <div class="item">
                        <div>点赞数</div>
                        <div>147515</div>
                      </div>
                    </li>
                    <li>
                      <div class="item">
                        <div>点击量</div>
                        <div>125452</div>
                      </div>
                    </li>
                    <li>
                      <div class="item">
                        <div>购买量</div>
                        <div>1545645</div>
                      </div>
                    </li>
                  </ul>
                  <div class="fake-form">
                    <ul class="form-head">
                      <li>课程名</li>
                      <li>时间</li>
                      <li>人气</li>
                      <li>点赞</li>
                      <li>点击</li>
                      <li>购买</li>
                    </ul>
                    <ul class="form-tbody">
                      <li>
                        <span>公正处的公证流程</span>
                        <span>2019/10</span>
                        <span>1122</span>
                        <span>120</span>
                        <span>120</span>
                        <span>120</span>
                      </li>
                      <li>
                        <span>公正处的公证流程</span>
                        <span>2019/10</span>
                        <span>1122</span>
                        <span>120</span>
                        <span>120</span>
                        <span>120</span>
                      </li>
                      <li>
                        <span>公正处的公证流程</span>
                        <span>2019/10</span>
                        <span>1122</span>
                        <span>120</span>
                        <span>120</span>
                        <span>120</span>
                      </li>
                      <li>
                        <span>公正处的公证流程</span>
                        <span>2019/10</span>
                        <span>1122</span>
                        <span>120</span>
                        <span>120</span>
                        <span>120</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 相关课程 -->
          <div class="swiper-slide related-lesson">
            <div class="restrain">
              <div class="col-title">相关课程</div>
              <ul class="data-list">
                <li>
                  <img src alt />
                  <div class="lesson-info">
                    <div class="lesson-name">民事诉讼程序起诉是怎样的一个过程</div>
                    <div class="total-sub">共2章11节</div>
                  </div>
                </li>
                <li>
                  <img src alt />
                  <div class="lesson-info">
                    <div class="lesson-name">民事诉讼程序起诉是怎样的一个过程</div>
                    <div class="total-sub">共2章11节</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 门类 -->
      <div class="devides">
        <ul>
          <li class="active">简介</li>
          <li>教师统计</li>
          <li>相关课程</li>
        </ul>
      </div>
      <!-- 自定义分页器 -->
      <div class="swiper-pagination my-pagination"></div>
    </div>
    <g2HistoryBack></g2HistoryBack>
  </ViewBox>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import g2HistoryBack from "@/components/g2-history-back/index";
import { mapGetters } from "vuex";
import { Datetime, Group, ViewBox, Selector, PopupPicker } from "vux";
export default {
  props: {},
  data() {
    return {
      pickYear: {
        list: [
          ["2014", "2015", "2016", "2017", "2018", "2019"],
          [
            "截止本月",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ]
        ],
        title: "请选择",
        year: []
      }
    };
  },
  computed: {
    ...mapGetters("base/user", {
      nickName: "g_nickName",
      avator: "g_avator",
      duty: "g_duty",
      department: "g_userDepartmentStr"
    })
  },
  mounted() {
    this.initSwiper();
  },
  watch: {},
  methods: {
    initSwiper() {
      var mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal", // 垂直切换选项
        loop: false, // 循环模式选项
        on: {
          slideChangeTransitionStart: function() {
            console.log(this.activeIndex);
            let uls = document.querySelectorAll(".devides ul li");
            for (let element of uls) {
              element.classList.remove("active");
            }
            switch (this.activeIndex) {
              case 0:
                uls[0].classList.add("active");
                break;
              case 1:
                uls[1].classList.add("active");
                break;
              case 2:
                uls[2].classList.add("active");
                break;
              case 3:
                uls[0].classList.add("active");
                break;
              default:
                uls[0].classList.add("active");
                break;
            }
          }
        },
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function(index, className) {
            return `<span class="pagination-dot ${className}"></span>`;
          }
        }
      });
    },
    format: function(value, name) {
      var _month = new Date().getMonth() + 1;
      if (value[1] == "截止本月") {
        return `${value[0]} / ${_month}`;
      }
      return `${value[0]} / ${value[1]}`;
    },
    onChange() {
      console.log("val change", this.pickYear.year);
    }
  },
  components: {
    ViewBox,
    Group,
    PopupPicker,
    g2HistoryBack
  }
};
</script>
<style scoped lang="scss" src="./index.scss"></style>
<style>
.my-pagination {
  width: 0.86rem;
  padding: 0 4.05rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.pagination-dot {
  width: 0.186667rem;
  height: 0.186667rem;
}
.pagination-dot.swiper-pagination-bullet-active {
  background: #f54305;
}
.user-select .vux-no-group-title {
  margin: 0;
  display: flex;
}
.user-select .weui-cell {
  padding: 0;
  margin-left: 0.36rem;
}
.user-select .vux-cell-box:not(:first-child):before {
  display: none;
}
.user-select .weui-cell__hd {
  display: flex;
}
.user-select .vux-popup-picker-select-box {
  margin-left: 0.36rem;
}
.user-select .vux-cell-value {
  font-size: 0.373333rem;
  line-height: 0.746667rem;
  color: #505050;
}
.user-select .weui-cells:before {
  display: none;
}
.user-select .weui-cells:after {
  display: none;
}
</style>
