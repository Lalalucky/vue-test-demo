<template>
  <!-- <Scroller lock-x class="g2-basic-modify"> -->
  <div class="g2-basic-modify g2-page-view">
    <div class="g2-basic-modify-body g2-page-view-container" style="position:absolute;width:100%;">
      <group title class="g2-group">
        <Cell title="员工照片" class="basic-modify-background">
          <!-- <span class="vux-cell-value" slot="value">{{form.createInfo && form.createInfo.nickName}}</span> -->
          <span slot="value">
            <img class="g2-avator" :src="userForm.avator" alt>
            <input type="file" class="title_img" accept="image/*" @change="uploadUserImage">
          </span>
        </Cell>
        <x-input title="昵称" text-align="right" placeholder="请输入您的昵称" v-model="userForm.nickName"></x-input>
        <!-- <Cell title="背景图" class="basic-modify-background">
          <span slot="value">
            <img class="g2-avator" :src="form.avator" alt>
            <input type="file" class="title_img" accept="image/*">
          </span>
        </Cell>-->
        <x-input title="姓名" text-align="right" placeholder="请输入您的姓名" v-model="userForm.userName"></x-input>
        <popup-radio title="性别" :options="basicSexTypes" v-model="form.sex"></popup-radio>
        <!-- <datetime format="YYYY-MM-DD" v-model="form.birthDay" placeholder="生日" title="生日"></datetime> -->
        <x-input title="年龄" text-align="right" placeholder="请输入您的年龄" v-model="form.age"></x-input>
        <popup-radio title="民族" :options="basicUserNation" v-model="form.nation"></popup-radio>
        <!-- <x-input title="学历" text-align="right" placeholder="学历" v-model="form.edu"></x-input> -->
        <x-input title="学校" text-align="right" placeholder="请输入您的学校" v-model="form.school"></x-input>
        <popup-radio title="学历" :options="basicUserEdu" v-model="form.edu"></popup-radio>
      </group>
      <group title class="g2-group">
        <datetime
          v-model="userForm.entrydate"
          placeholder="入职时间"
          title="入职时间"
          :display-format="fnDisplayFormat"
          :min-year="minYear"
          :max-year="maxYear"
        ></datetime>

        <x-input title="职务" text-align="right" placeholder="请输入您的职务" v-model="userForm.duty"></x-input>
        <x-input title="部门" text-align="right" placeholder="请输入您的部门" v-model="userForm.department"></x-input>
        <x-input title="基本薪资" text-align="right" placeholder="请输入您的基本薪资" v-model="form.salay"></x-input>
        <x-input
          title="联系方式"
          text-align="right"
          placeholder="请输入您的联系方式"
          v-model="form.phone"
          @on-blur="handleInputChange('phone')"
        ></x-input>
        <x-input title="邮箱地址" text-align="right" placeholder="请输入您的邮箱地址" v-model="userForm.email"></x-input>
        <x-input title="身份证号码" text-align="right" placeholder="请输入您的身份证号码" v-model="form.idcard"></x-input>
        <x-input title="户籍地址" text-align="right" placeholder="请输入您的户籍地址" v-model="form.household"></x-input>
        <x-input title="户籍邮编" text-align="right" placeholder="请输入您的户籍邮编" v-model="form.housecode"></x-input>
        <x-input title="现居地" text-align="right" placeholder="请输入您的现居地" v-model="form.address"></x-input>
        <x-input
          title="现居地邮编"
          text-align="right"
          placeholder="请输入您的现居地邮编"
          v-model="form.addresscode"
        ></x-input>
        <x-input
          title="紧急联系人"
          text-align="right"
          placeholder="请输入您的紧急联系人"
          v-model="form.contentname"
        ></x-input>
        <x-input
          title="紧急联系人电话"
          text-align="right"
          placeholder="请输入您的紧急联系人电话"
          v-model="form.contentphone"
          @on-blur="handleInputChange('contentphone')"
        ></x-input>
        <x-input title="毕业专业" text-align="right" placeholder="请输入您的毕业专业" v-model="form.major"></x-input>
        <datetime
          v-model="form.gradudate"
          placeholder="毕业时间"
          title="请输入您的毕业时间"
          :min-year="minYear"
          :max-year="maxYear"
          :display-format="fnDisplayFormat"
        ></datetime>
        <x-input title="社保卡号码" text-align="right" placeholder="请输入您的社保卡号码" v-model="form.social"></x-input>
        <x-input title="公积金号码" text-align="right" placeholder="请输入您的公积金号码" v-model="form.provident"></x-input>
        <datetime
          v-model="form.workdate"
          placeholder="请输入您的参加工作时间"
          title="参加工作时间"
          :display-format="fnDisplayFormat"
          :min-year="minYear"
          :max-year="maxYear"
        ></datetime>
        <datetime
          v-model="form.regulardate"
          placeholder="请输入您的转正时间"
          title="转正时间"
          :display-format="fnDisplayFormat"
          :min-year="minYear"
          :max-year="maxYear"
        ></datetime>
      </group>
      <div class="g2-p-v" style="margin-top : .4rem;margin-bottom:.266667rem">
        <x-button type="primary" @click.native="handleSubmitClient()">保存</x-button>
      </div>
    </div>
  </div>
  <!-- </Scroller> -->
</template>

<script>
import { mapState, mapGetters } from "vuex";
import {
  Card,
  ViewBox,
  Group,
  Cell,
  PopupPicker,
  PopupRadio,
  Datetime,
  XTextarea,
  XInput,
  XButton,
  Scroller,
  Alert
} from "vux";
import {
  // 员工学历
  USER_EDU_OBJ_OPTIONS,
  USER_NATION_OBJ_OPTIONS
} from "@/common/dictionary/user.js";
import {
  // 性别
  BASIC_SEX_TYPES_OPTIONS,
  BASIC_BLOOD_TYPES_OPTIONS
} from "@/common/dictionary/privilege.js";
import schema from "async-validator";
import { pick, pickBy } from "lodash";
import { formatTime } from "@/utils/date";
import { checkStr } from "@/utils/type/index.js";
import {
  // 性别
  USER_SEX_HASNODATA_OPTIONS
} from "@/common/dictionary/user.js";
export default {
  name: "g2PubcustomerDetail",
  components: {
    Card,
    ViewBox,
    Group,
    Cell,
    PopupPicker,
    PopupRadio,
    Datetime,
    XTextarea,
    XInput,
    XButton,
    Scroller,
    Alert
  },
  data() {
    return {
      basicSexTypes: BASIC_SEX_TYPES_OPTIONS,
      basicBloodTypes: BASIC_BLOOD_TYPES_OPTIONS,
      basicUserEdu: USER_EDU_OBJ_OPTIONS,
      basicUserNation: USER_NATION_OBJ_OPTIONS,

      minYear: 1900,
      maxYear: 2100,
      // clietStatuses: CRM_CLIENT_STATUS_OPTIONS,
      // crmClietType: CRM_CLIENT_TYPE_OPTIONS,
      // crmClietRelation: CRM_CLIENT_RELATION_OPTIONS,
      // crmClietStage: CRM_CLIENT_STAGE_OPTIONS,
      // crmClietSource: CRM_CLIENT_SOURCE_OPTIONS,
      // crmClietLevel: CRM_CLIENT_LEVEL_OPTIONS,
      // crmClietStatus: CRM_CLIENT_STATUS_OPTIONS,
      // crmClietHot: CRM_CLIENT_HOT_OPTIONS,
      // crmCompanyIndustryList: CRM_COMPANY_INDUSTRY_OPTIONS,
      // crmCompanyScaleList: CRM_COMPANY_SCALE_OPTIONS,
      // crmCreditLimitList: CRM_CREDIT_LIMIT_OPTIONS,
      id: undefined,
      oldForm: {},
      oldUserForm: {},
      userForm: {
        avator: "",
        department: "",
        duty: "",
        email: "",
        // 入职时间
        entrydate: "",
        nickName: "",
        phone: "",
        userId: null,
        userName: ""
      },
      form: {
        nickName: this.nickName,
        userName: "",
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
      userId: "g_userId",
      sid: "g_sid",
      nickName: "g_nickName",
      userName: "g_userName"
    })
  },
  created() {
    // let { id } = this.$route.params;
    this.id = this.userId;
    // this.loadArticleDetail(id);
    this.loadUserInfoBysid();
  },
  mounted() {},
  watch: {},
  methods: {
    // 根据sid查询用户信息
    loadUserInfoBysid() {
      this.$store.dispatch("base/user/fnLoadUserBasicInfo").then(result => {
        result.entrydate = formatTime(result.entrydate, "YYYY-MM-DD");
        this.userForm = {
          ...result
        };
        this.oldUserForm = {
          ...result
        };
        this.loadUserBasicInfoById();
        console.log(result, "get-user-info");
      });
    },
    handleInputChange(key) {
      debugger;
      const descriptor = {
        contentphone: {
          type: "number",
          validator: (rule, value) => {
            return !value || checkStr(value, "phone");
          },
          message: "紧急联系人手机格式不正确"
        },
        phone: {
          type: "number",
          validator: (rule, value) => {
            return !value || checkStr(value, "phone");
          },
          message: "手机格式不正确"
        }
      };
      var validator = new schema(descriptor);

      validator.validate(this.form, (errors, fields) => {
        if (errors) {
          let firstMessage = errors[0];
          let { message, field } = errors[0];
          this.$vux.toast.show({
            type: "warn",
            position: "middle",
            text: message
          });
          return message;
        }
      });
    },
    fnDisplayFormat(value) {
      return formatTime(value, "YYYY-MM-DD");
    },
    // 上传用户头像---上传图片
    uploadUserImage(el) {
      var files = el.target.files;
      if (files.length === 0) {
        this.$message({
          message: "请选择上传的文件",
          type: "info"
        });
      }
      var fd = new FormData();
      fd.append("file", files[0]);

      if (this.data) {
        for (var key in this.data) {
          fd.append(key, this.data[key]);
        }
      }
      this.$vux.loading.show({
        text: "上传头像中..."
      });
      this.$store
        .dispatch("profile/user/uploadUserImage", fd)
        .then(result => {
          debugger;
          this.userForm.avator = result;
          console.log(result);
          this.$vux.loading.hide();
        })
        .catch(_ => {
          // 显示文字
          this.$vux.toast.show({
            type: "warn",
            position: "middle",
            text: "上传头像失败。"
          });
          this.$vux.loading.hide();
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
          // this.form.id = result.id;
          result.workdate = formatTime(result.workdate, "YYYY-MM-DD");
          result.regulardate = formatTime(result.regulardate, "YYYY-MM-DD");
          result.entrydate = formatTime(result.entrydate, "YYYY-MM-DD");
          result.gradudate = formatTime(result.gradudate, "YYYY-MM-DD");

          this.form = {
            nickName: this.nickName,
            userName: this.userName,
            ...result
          };
          this.oldForm = {
            nickName: this.nickName,
            userName: this.userName,
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
    },
    handleSubmitClient() {
      debugger;
      let result = true;
      let detailResult = true;

      Object.keys(this.oldUserForm).forEach(key => {
        if (this.oldUserForm[key] != this.userForm[key]) {
          result = false;
        }
      });
      Object.keys(this.oldForm).forEach(key => {
        if (this.oldForm[key] != this.form[key]) {
          detailResult = false;
        }
      });
      if (!result) {
        this.UpdateUserForm();
      }
      if (!detailResult) {
        this.UpdateDetailForm();
      }
    },
    // 确认修改
    UpdateDetailForm() {
      debugger;
      const descriptor = {
        contentphone: {
          type: "number",
          validator: (rule, value) => {
            return !value || checkStr(value, "phone");
          },
          message: "紧急联系人手机格式不正确"
        },
        phone: {
          type: "number",
          validator: (rule, value) => {
            return !value || checkStr(value, "phone");
          },
          message: "手机格式不正确"
        }
      };
      var validator = new schema(descriptor);

      validator.validate(this.form, (errors, fields) => {
        if (errors) {
          let firstMessage = errors[0];
          let { message, field } = errors[0];
          this.$vux.toast.show({
            type: "warn",
            position: "middle",
            text: message
          });
          return message;
        }
        // if(oldForm == this.form){
        //   debugger;
        //    this.$vux.alert.show({
        //       title: '温馨提示',
        //       content: '此桌已被预定！',
        //       buttonText: '好的',
        //       hideOnBlur: true,
        //       maskZIndex: 100
        //   })
        // }
        this.$store
          .dispatch("profile/user/updateUserDetail", this.form)
          .then(result => {
            this.$vux.loading.hide();
            // 显示文字
            this.$vux.toast.show({
              type: "success",
              position: "middle",
              text: "修改信息成功。",
              onHide: () => {
                this.$router.push({
                  path: `/my/basic`
                });
              }
            });
          })
          .catch(_ => {
            // 显示文字
            this.$vux.toast.show({
              type: "warn",
              position: "middle",
              text: "修改信息失败。"
            });
            this.$vux.loading.hide();
          });
      });
    },
    // 更新用户基本信息
    UpdateUserForm() {
      this.$store
        .dispatch("profile/user/updateUserInfo", this.userForm)
        .then(result => {
          this.$vux.loading.hide();
          // 显示文字
          this.$vux.toast.show({
            type: "success",
            position: "middle",
            text: "修改信息成功。",
            onHide: () => {
              this.$router.push({
                path: `/my/basic`
              });
            }
          });
        })
        .catch(_ => {
          // 显示文字
          this.$vux.toast.show({
            type: "warn",
            position: "middle",
            text: "修改信息失败。"
          });
          this.$vux.loading.hide();
        });
    }
    // hanleChangeForm(key) {
    //   if (this.oldForm[key] === this.form[key]) {
    //     return;
    //   }

    //   const descriptor = {
    //     name: {
    //       type: "string",
    //       required: true,
    //       validator: (rule, value) => {
    //         return !!value.trim();
    //       },
    //       message: "请填写客户名称"
    //     },
    //     phone: {
    //       type: "number",
    //       validator: (rule, value) => {
    //         return !value || checkStr(value, "phone");
    //       },
    //       message: "手机格式不正确"
    //     }
    //   };

    //   var validator = new schema(descriptor);

    //   validator.validate(this.form, (errors, fields) => {
    //     if (errors) {
    //       let firstMessage = errors[0];
    //       let { message, field } = errors[0];
    //       this.$vux.toast.show({
    //         type: "warn",
    //         position: "middle",
    //         text: message
    //       });
    //       return message;
    //     }
    //     this.$vux.loading.show({
    //       text: "修改中..."
    //     });
    //     let params = { id: this.id };
    //     params[key] = this.form[key];
    //     this.$store
    //       .dispatch("crm/mycustomer/fnUpdateClientInfoById", params)
    //       .then(result => {
    //         this.$vux.loading.hide();
    //         this.oldForm[key] = this.form[key];
    //         this.form.updateTime = new Date().getTime();
    //         // 显示文字
    //         this.$vux.toast.show({
    //           type: "success",
    //           position: "middle",
    //           text: "修改信息成功。"
    //         });
    //       })
    //       .catch(_ => {
    //         // 显示文字
    //         this.$vux.toast.show({
    //           type: "warn",
    //           position: "middle",
    //           text: "加载内容失败。"
    //         });
    //         this.$vux.loading.hide();
    //       });
    //     // validation passed
    //   });
    // }
  }
};
</script>

<style lang="scss" src="./basic-modify.scss">
</style>
