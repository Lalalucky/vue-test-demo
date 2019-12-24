<template>
  <ViewBox class="g2-page-view yjz-home">
    <div class="user-card">
      <div class="head-msg">
        <div class="user-info">
          <img :src="avator" />
          <div class="right">
            <div>{{nickName}}</div>
            <div>查看并编辑个人资料</div>
          </div>
        </div>
        <!-- 诱导注册 -->
        <div class="improve-lv">
          <img src="~@public/image/home_law/profile/member.png" class="member" />
          <div class="ad">易法学院海量学习视频为学习加速！</div>
          <div class="btn"></div>
        </div>
      </div>
      <!-- 快速进入 -->
      <div class="quick-enter">
        <div class="my-order">
          <div class="top">
            <img src="~@public/image/home_law/profile/order.png" />
            <span>我的订单</span>
          </div>
          <div class="bottom">查找您的全部订单信息</div>
        </div>
        <div class="my-msg">
          <div class="top">
            <img src="~@public/image/home_law/profile/message.png" />
            <span>消息中心</span>
          </div>
          <div class="bottom">更好的建立与客户的联系</div>
        </div>
      </div>
      <div class="already-view">
        <myCell>
          <div slot="link">
            <div class="cover" @click="goToPage()">
              <div class="yi-icon">
                <img src="~@public/image/home_law/profile/already.png" />
              </div>
              <span>我的已学</span>
            </div>
          </div>
          <div slot="besides">
            <div class="slide-box">
              <ul>
                <li v-for="(item,index) in list" :key="index">
                  <img :src="item.img" />
                  <div class="title">{{item.title}}</div>
                </li>
                <li v-for="(item,index) in list" :key="index+4">
                  <img :src="item.img" />
                  <div class="title">{{item.title}}</div>
                </li>
              </ul>
            </div>
          </div>
        </myCell>
      </div>
      <!-- 一些入口 -->
      <div class="enters">
        <myCell>
          <div slot="link">
            <div class="cover" @click="goToPage()">
              <div class="yi-icon">
                <img src="~@public/image/home_law/profile/collet.png" />
              </div>
              <span>我的收藏</span>
            </div>
            <div class="cover" @click="goToPage()">
              <div class="yi-icon">
                <img src="~@public/image/home_law/profile/dingyue.png" />
              </div>
              <span>订阅服务</span>
            </div>
            <div class="cover" @click="goToPage('/my/myInfo')">
              <div class="yi-icon">
                <img src="~@public/image/home_law/profile/user-info.png" />
              </div>
              <span>个人信息</span>
            </div>
            <div class="cover" @click="goToPage('/my/teacher')">
              <div class="yi-icon">
                <img src="~@public/image/home_law/profile/teacher.png" />
              </div>
              <span>教师中心</span>
            </div>
            <div class="cover">
              <div class="yi-icon">
                <img src="~@public/image/home_law/profile/safe.png" />
              </div>
              <span>账号与安全</span>
            </div>
          </div>
        </myCell>
      </div>
    </div>
  </ViewBox>
</template>

<script>
import { ViewBox, Swiper, SwiperItem } from "vux";
import myCell from "@/pages/Profile/Home/components/my-cell";
import { mapGetters } from "vuex";

export default {
  name: "g2UserCard",
  props: {},
  components: {
    ViewBox,
    myCell,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      list: [
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
          title: "送你一朵fua送你一朵fua送你一朵fua送你一朵fua送你一朵fua"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
          title: "送你一辆车"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/5.jpg", // 404
          title: "送你一次旅行",
          fallbackImg:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"
        }
      ]
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
  created() {},
  mounted() {},
  watch: {},
  methods: {
    goToPage(v) {
      console.log(v);
      this.$router.push({
        path: v
      });
    }
  }
};
</script>

<style scoped lang="scss" src="./user-card.scss"></style>
