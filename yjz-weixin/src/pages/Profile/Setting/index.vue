<template>
  <div>
    <group class="g2-oa-group">
      <cell title="基本设置" is-link link="/my/basic"></cell>
      <cell title="第三方账号" is-link></cell>
      <cell title="邮箱设置" is-link></cell>
    </group>
    <!-- <div class="g2-oa-basic-logOut">
      <p>退出登录</p>
      <actionsheet
      v-model="isShowDeleteDialog"
      :menus="confirmLogoutMenu"
      @on-click-menu="handleClickCancelDeleteClient"
    ></actionsheet>
    </div> -->
  </div>
</template>

<script>
  
import { Cell, CellBox, CellFormPreview, Group, Badge ,Actionsheet} from "vux";

export default {
  name: "g2ProfileHome",
  props: {},
  components: {
    Cell,
    CellBox,
    CellFormPreview,
    Group,
    Badge,
  Actionsheet

  },
  data() {
    return {

      isShowDeleteDialog:false,
      confirmLogoutMenu: {
        "title.noop":
          '确定咩?<br/><span style="color:#666;font-size:12px;">删除后就无法撤消了哦</span>',
        delete: '<span style="color:red">删除</span>'
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    handleClickCancelDeleteClient(){
      alert(1)
    }
  }
};
</script>
<style lang="scss">
.g2-oa-basic-logOut {
  position: absolute;
  bottom:.613333rem;
  width: 9.2rem;
  background: #fff;
  height: 1.333333rem;
  margin:  0 auto;
  left: 0;
  right: 0;
  p{
    text-align: center;
    line-height: 1.333333rem;
    color: rgb(196, 42, 42);
    font-size: .4rem;
  }
}
</style>

