<template class="g2-participant">
  <div class="page-view-container">
    <group>
      <cell title="参与人" :value="showCheckedUserList" is-link  @click.native="clickshowPopup"></cell>
    </group>
    <div v-transfer-dom class="stage-popup">
      <popup v-model="showPopup" class="checker-popup" @on-hide="hideChange">
        <!-- readonly="isReponser"  -->
        <div style="padding:10px 10px 40px 10px;">
          <checker
            v-model="checkedUserList"
            @on-change="handleChangeCheckItem"
            type="checkbox"
            default-item-class="demo1-item"
            selected-item-class="demo1-item-selected"
          >
            <checker-item :value="item.key" v-for="item in options" :key="item.key">{{item.value}}</checker-item>
          </checker>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import Schema from "async-validator";
import { checkStr } from "@/utils/type/index.js";
import {
  Cell,
  Card,
  Group,
  Popup,
  XInput,
  XButton,
  PopupHeader,
  Confirm,
  Radio,
  Calendar,
  PopupRadio,
  Checklist,
  Checker,
  CheckerItem
} from "vux";
export default {
  name: "g2Participant",
  components: {
    Card,
    Cell,
    Group,
    Popup,
    XInput,
    XButton,
    PopupHeader,
    Confirm,
    Radio,
    Calendar,
    PopupRadio,
    Checklist,
    Checker,
    CheckerItem
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    readonly:{
      type:Boolean,
      default(){
        return true
      }
    }
  },
  data() {
    return {
      userList: [],
      model: [],
      checkedUserList: [],
      showCheckedUserList: [],
      showPopup: false,
      
    };
  },
  computed: {},
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.checkedUserList = val;
      }
    },
    checkedUserList: {
      immediate: true,
      handler(val) {
        let list = [];
        this.options.forEach(item => {
          this.checkedUserList.forEach(checkItem => {
            if (item.key == checkItem) {
              list.push(item.value);
            }
          });
        });

        this.showCheckedUserList = list.join();
        console.log(this.showCheckedUserList, "000");
      }
    }
  },
  created() {
    this.loadParticipantData();
  },
  methods: {
    loadParticipantData() {
      this.$store.dispatch("project/project/fnLoadAllUsersJob").then(result => {
        this.userList = result.map(item => {
          var obj = {};
          obj.value = item.userName;
          obj.key = item.userId;
          return obj;
        });
        console.log(this.userList, "this.userList");
      });
    },
    handleChangeCheckItem() {
      this.$emit("input", this.checkedUserList);
      this.$emit("val-change", this.checkedUserList);
    },
    hideChange() {
      this.$emit("hide-change", this.checkedUserList);
    },
    clickshowPopup() {
      if (this.readonly) {
        this.showPopup = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.demo1-item {
  border: 1px solid #ececec;
  padding: 0.133333rem 0.533333rem;
  margin: 0.066667rem 0.026667rem;
  font-size: 14px;
}
.demo1-item-selected {
  border: 1px solid #4f77aa;
  border-radius: 0.066667rem;
  color: #fff;
  background: #4f77aa;
}

.g2-participant {
  .weui-cell {
    .vux-label {
      color: #333333;
      line-height: 0.666667rem;
      font-size: 16px !important;
      margin-bottom: 0;
      position: relative;
    }
    .weui-cell_access .weui-cell__ft {
      width: 60%;
    }
  }
}
</style>


