<template>
  <Scroller lock-x>
    <div class="g2-basic-info">
      <header class="basic-info-header">
        <div>
          <!-- <div class="g2-title is-inverse g2-m-t basic-self-info">个人信息</div> -->
          <span class="basic-modify-link">
            <router-link tag="span" :to="'basicModify' ">
              <i class="iconfont icon-edit g2-icon is-large" style="color:#fff"></i>
            </router-link>
          </span>
        </div>
        <Flexbox justify="space-between" class="g2-m-t-lg">
          <span>{{form.userInfo && form.userInfo.nickName}}</span>
          <!-- <span>{{form.stage | obj_key_format(crmClietStage)}}</span> -->
        </Flexbox>
      </header>
      <div class="basic-self-userInfo">
        <div class="basic-self-userPic">
          <img :src="userForm.avator" alt>
        </div>
        <div class="basic-user-nameInfo">
          <div class="basic-self-userName">{{userForm.nickName}}</div>
          <div class="basic-self-userCount">{{userForm.userName}}</div>
        </div>
      </div>
      <group>
        <div class="g2-mycustomer g2-form-view">
          <div class="view-row">
            <div class="view-label">用户名:</div>
            <!-- <div class="view-content">{{form.visitTime | date_format}}ww</div> -->
            <div class="view-content">{{userForm.userName}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">性别:</div>
            <div class="view-content">{{form.sex | obj_key_format(userSexTypes)}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">年龄:</div>
            <div class="view-content">{{form.age}}</div>
          </div>
           <div class="view-row">
            <div class="view-label">民族:</div>
            <div class="view-content">{{form.nation | obj_key_format(basicUserNation)}}</div>
          </div>
          <!-- <div class="view-row">
            <div class="view-label">生日:</div>
            <div class="view-content">{{form.content}}</div>
          </div> -->
          <div class="view-row">
            <div class="view-label">学校:</div>
            <div class="view-content">{{form.school}}</div>
          </div>
         <div class="view-row">
            <div class="view-label">学历:</div>
            <div class="view-content">{{form.edu | obj_key_format(basicUserEdu)}}</div>
          </div>
         
        </div>
      </group>
      <group>
        <div class="g2-mycustomer g2-form-view">
          <div class="view-row">
            <div class="view-label">入职时间:</div>
            <div class="view-content">{{userForm.entrydate | date_format('YYYY-MM-DD')}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">职务:</div>
            <div class="view-content">{{userForm.duty}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">部门:</div>
            <div class="view-content">{{userForm.department}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">基本薪资:</div>
            <div class="view-content">{{form.salay}}</div>
          </div>
           <div class="view-row">
            <div class="view-label">联系方式:</div>
            <div class="view-content">{{form.phone}}</div>
          </div>
           <div class="view-row">
            <div class="view-label">邮箱地址:</div>
            <div class="view-content">{{userForm.email}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">身份证号码:</div>
            <div class="view-content">{{form.idcard}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">户籍地址:</div>
            <div class="view-content">{{form.household}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">户籍邮编:</div>
            <div class="view-content">{{form.housecode}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">现居地:</div>
            <div class="view-content">{{form.address}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">现居地邮编:</div>
            <div class="view-content">{{form.addresscode}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">紧急联系人:</div>
            <div class="view-content">{{form.contentname}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">紧急联系人电话:</div>
            <div class="view-content">{{form.contentphone}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">毕业专业:</div>
            <div class="view-content">{{form.major}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">毕业时间:</div>
            <div class="view-content">{{form.gradudate | date_format('YYYY-MM-DD')}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">社保卡号码:</div>
            <div class="view-content">{{form.social}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">公积金号码:</div>
            <div class="view-content">{{form.provident}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">参加工作时间:</div>
            <div class="view-content">{{form.workdate | date_format('YYYY-MM-DD')}}</div>
          </div>
          <div class="view-row">
            <div class="view-label">转正时间:</div>
            <div class="view-content">{{form.regulardate | date_format('YYYY-MM-DD')}}</div>
          </div>
        </div>
      </group>
    </div>
  </Scroller>
</template>
<script>
import {
  Cell,
  Card,
  Group,
  Flexbox,
  FlexboxItem,
  Panel,
  Grid,
  GridItem,
  Scroller
} from "vux";
import { mapState, mapGetters } from "vuex";
import { pick, pickBy } from "lodash";
import {
  // 性别
  USER_SEX_HASNODATA,
  // 员工学历
  USER_EDU_OBJ,
  USER_NATION_OBJ
} from "@/common/dictionary/user.js";
export default {
  name: "g2Pubcustomer",
  components: {
    Card,
    Cell,
    Group,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Panel,
    Scroller
  },
  data() {
    return {
      userSexTypes: USER_SEX_HASNODATA,
      basicUserEdu: USER_EDU_OBJ,
      basicUserNation: USER_NATION_OBJ,
      // crmClietStage: CRM_CLIENT_STAGE,
      userInfo: {},
      id: "",
      userForm:{
        avator: "",
        department: "",
        duty: "",
        email: "",
          // 入职时间
        entrydate: "",
        nickName: "",
        phone: "",
        userId: null,
        userName: "",
      },
      form: {
        userId: "",
        // 联系方式
        phone: "",
        // 邮箱地址
        email: "",
        // 年龄
        age: "",
        // 学历
        edu: "",
        // 学校
        school: "",
        // 入职时间
        entrydate: "",
        // 职务
        duty: "",
        // 职务
        department: "",
        // 基本薪资
        salay: "",
        // 性别
        sex: 1,
        // 民族
        nation: 0,
        // 身份证号码
        idcard: "",
        // 户籍地址
        household: "",
        // 户籍邮编
        housecode: "",
        // 现居地
        address: "",
        // 现居地邮编
        addresscode: "",
        // 紧急联系人
        contentname: "",
        // 紧急联系人电话
        contentphone: "",
        // 毕业专业
        major: "",
        // 毕业时间
        gradudate: "",
        // 社保卡号码
        social: "",
        // 公积金号码
        provident: "",
        // 参加工作时间
        workdate: "",
        // 转正时间
        regulardate: "",
        // 员工照片
        avator: ""
      }
    };
  },
  computed: {
    ...mapGetters("base/user", {
      userId: "g_userId"
    })
  },
  created() {
    // let { id } = this.$route.params;
    this.loadUserInfoBysid();
    // this.id = id;
  },
  methods: {
    // 根据sid查询用户信息
    loadUserInfoBysid() {
      this.$store.dispatch("base/user/fnLoadUserBasicInfo").then(result => {
        this.userInfo.userId = result.userId;
        this.id = this.userInfo.userId;
        this.userForm = {
          ...result
        };
        this.loadUserBasicInfoById();
        console.log(result, "get-user-info");
      });
    },
    // 根据id查询用户详情
    loadUserBasicInfoById() {
      debugger;
      this.$vux.loading.show({
        text: "加载中..."
      });
      this.$store
        .dispatch("profile/user/getStaffInfoById", this.id)
        .then(result => {
          debugger;
          // this.form.avator = result.avator;
          this.form = {
            // ...this.form,
            ...result
          };

          this.$vux.loading.hide();
        })
        .catch(_ => {
          // 显示文字
          this.$vux.toast.show({
            type: "warn",
            position: "middle",
            text: "加载内容失败。"
          });
          this.$vux.loading.hide();
        });
    }
  }
};
</script>

<style lang="scss" src="./index.scss">
</style>
