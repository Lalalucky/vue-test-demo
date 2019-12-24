<template>
  <ViewBox class="user-info g2-page-view yjz-home">
    <div class="head-img">
      <div class="with-img">
        <img :src="avator" />
        <input type="file" accept="image/*" @change="change" ref="fileIpt" />
      </div>
      <span class="sub">设置头像</span>
    </div>
    <div class="user-info-form">
      <ul class="handle-group">
        <li class="handle-item">
          <span class="sub">真实姓名</span>
          <input type="text" placeholder="请填写" />
          <!-- <img src="~@public/image/home_law/profile/icon-right.png" /> -->
        </li>
        <li class="handle-item">
          <span class="sub">用户名</span>
          <input type="text" v-model="userInfo.nickName" @click="userNameChange" readonly />
          <!-- <img src="~@public/image/home_law/profile/icon-right.png" /> -->
        </li>
        <li class="handle-item">
          <span class="sub">昵称</span>
          <input type="text" placeholder="请填写" />
          <!-- <img src="~@public/image/home_law/profile/icon-right.png" /> -->
        </li>
        <li class="handle-item">
          <span class="sub">性别</span>
          <Group class="sex-pick">
            <selector
              direction="rtl"
              color="#a9a9a9"
              placeholder="请选择"
              v-model="userInfo.sex"
              :options="sexList"
              @on-change="onSexChange"
            ></selector>
          </Group>
          <!-- <input type="text" placeholder="请填写" /> -->
          <!-- <img src="~@public/image/home_law/profile/icon-right.png" /> -->
        </li>
        <li class="handle-item">
          <span class="sub">出生日期</span>
          <Group class="data-pick">
            <datetime
              v-model="userInfo.date"
              ref="datetime"
              :format="userInfo.format"
              placeholder="请选择"
            ></datetime>
          </Group>
          <!-- <img src="~@public/image/home_law/profile/icon-right.png" /> -->
        </li>
        <li class="handle-item">
          <span class="sub">手机号码</span>
          <input type="text" v-model="userInfo.phone" @click="phoneChange" readonly />
          <!-- <img src="~@public/image/home_law/profile/icon-right.png" /> -->
        </li>
        <li class="handle-item">
          <span class="sub">所在地址</span>
          <input type="text" placeholder="请填写" />
          <!-- <img src="~@public/image/home_law/profile/icon-right.png" /> -->
        </li>
        <li class="handle-item">
          <span class="sub">电子邮箱</span>
          <input type="text" placeholder="请填写" />
          <!-- <img src="~@public/image/home_law/profile/icon-right.png" /> -->
        </li>
      </ul>
    </div>
    <g2HistoryBack></g2HistoryBack>
  </ViewBox>
</template>

<script>
import { mapGetters } from "vuex";
import g2HistoryBack from "@/components/g2-history-back/index";
import { Datetime, Group, ViewBox, Selector } from "vux";
export default {
  props: {},
  data() {
    return {
      userInfo: {
        phone: "13156558587",
        date: "",
        format: "YYYY-MM-DD",
        nickName: "小黄鸭"
      },
      t1: 0,
      t2: 0,
      timer: null,
      sexList: [{ key: "1", value: "男" }, { key: "2", value: "女" }]
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
    window.addEventListener("scroll", this.scrollFn, true);
  },
  methods: {
    change() {
      let formData = new window.FormData();
      formData.append(this.name, this.$refs.fileIpt.files[0]);
      // for( let key in this.params) {
      //     formData.append(key, this.params[key])
      //   }
    },
    userNameChange() {
      this.$vux.toast.show({
        text: "用户名信息不能修改哦~",
        width: "9rem",
        time: "2000",
        position: "middle",
        type: "text"
      });
    },
    onSexChange() {},
    phoneChange() {
      this.$vux.toast.show({
        text: "请到易法学院官网去修改手机号哦！",
        width: "9rem",
        time: "2000",
        position: "middle",
        type: "text"
      });
    },
    scrollFn() {
      let backBtn = document.getElementById("history-back");
      backBtn.style.opacity = 0.2;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log(12323123321);
        this.t2 = document.documentElement.scrollTop || document.body.scrollTop;
        if (this.t2 == this.t1) {
          console.log("滚动结束了");
          backBtn.style.opacity = 0.68;
        }
      }, 1000);
      this.t1 = document.documentElement.scrollTop || document.body.scrollTop;
    },
    historyBack() {
      window.history.go(-1);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollFn, true);
  },
  components: {
    Datetime,
    Group,
    ViewBox,
    Selector,
    g2HistoryBack
  }
};
</script>

<style scoped lang="scss" src="./index.scss"></style>
<style>
.vux-datetime {
  border: none;
}
.weui-cells:before {
  display: none;
}
.weui-cells:after {
  display: none;
}
.weui-select {
  height: 1rem !important;
  padding: 0 !important;
  width: 6.654rem !important;
  font-size: 0.346667rem !important;
}
input::-webkit-input-placeholder {
  color: #a9a9a9;
}
input::-moz-input-placeholder {
  color: #a9a9a9;
}
input::-ms-input-placeholder {
  color: #a9a9a9;
}
.sex-pick .vux-no-group-title,
.data-pick .vux-no-group-title {
  width: 7rem;
  border: none;
  margin-top: 0;
}
.sex-pick .weui-cell {
  padding-top: 0.08rem;
  padding-bottom: 0.08rem;
}
.data-pick .weui-cell {
  padding: 0;
}
.data-pick .weui-cell .vux-cell-placeholder {
  font-size: 0.346667rem;
  color: #a9a9a9;
}
.sex-pick .weui-cells::before,
.date-pick .weui-cells::before {
  display: none;
}
.sex-pick .weui-cells::after,
.date-pick .weui-cells::after {
  display: none;
}
.sex-pick .weui-cell_select .weui-cell__bd:after,
.data-pick .weui-cell_access .weui-cell__ft:after {
  display: none;
}
</style>
<style>
:-moz-placeholder,
::-moz-placeholder,
:-ms-input-placeholder,
::-webkit-input-placeholder {
  text-align: right;
}
</style>
