<template>
  <div class="cell" :class="dayClass" @click="handleCellClick">
    <div class="date-wrapper">
      <span class="left"></span>
      <div class="date" :class="dateClass">{{day}}</div>
      <span class="right"></span>
    </div>
    <div class="info">{{info}}</div>
  </div>
</template>

<script>
import emitterMixins from "@/utils/emitter.js";
import SelectType from "../../models/SelectType.js";

const SELECT_TYPE = [
  "None",
  /** 单选 */
  "Single",
  /** 起/止 */
  "All",
  /** 区间仅选择了 起 */
  "Only",
  /** 区间起 */
  "Start",
  /** 区间中 */
  "Middle",
  /** 区间止 */
  "End"
];
export default {
  name: "g2DatePickerDay",
  mixins: [emitterMixins],
  props: {
    day: {
      type: [Number, String],
      default: ""
    },
    date: {
      type: Number,
      default: 0
    },
    dayOfWeek: {
      type: [Number, String],
      default: ""
    },
    outOfDate: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    selectedType: {
      type: String,
      default: "single"
    },
    selected: {
      // type: [Symbol,String],
      default: SelectType.None
    }
  },
  data() {
    return {
      info:""
    };
  },
  computed: {
    dayClass() {
      let classObject = {
        "is-disabled": this.isDisabled || this.outOfDate
      };
      switch (this.selected) {
        case SelectType.None:
          break;
        case SelectType.Single:
          classObject["is-selected"] = true;
          classObject["selected-single"] = true;
          this.info = '起';
          break;
        case SelectType.All:
          classObject["is-selected"] = true;
          classObject["selected-all"] = true;
          this.info = '起/止';
          break;
        case SelectType.Only:
          classObject["is-selected"] = true;
          classObject["selected-only"] = true;
          break;
        case SelectType.Start:
          classObject["is-selected"] = true;
          classObject["selected-start"] = true;
          break;
        case SelectType.Middle:
          classObject["is-selected"] = true;
          classObject["selected-middle"] = true;
          break;
        case SelectType.End:
          classObject["is-selected"] = true;
          classObject["selected-end"] = true;
          break;

        default:
          break;
      }
      return classObject;
    },
    dateClass() {
      let classObj = {
        // 周六周日为节假日
        "is-grey": this.dayOfWeek === 0 || this.dayOfWeek === 6
      };
      return classObj;
    },
    startDate() {
      let startDate;
      let parent = this.$parent;
      while (parent && parent.componentName !== "g2Calendar") {
        parent = parent.$parent;
        if (parent.componentName === "g2Calendar") {
          startDate = parent.startDate;
        }
      }
      return startDate;
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    handleCellClick() {
      this.dispatch("g2Calendar", "cell-click", this);
    }
  }
};
</script>

<style scoped lang="scss">
.cell {
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 14.28571429%;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  .date-wrapper {
    display: -ms-flexbox;
    display: flex;
    height: 35px;
    width: 100%;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 1px;

    .left,
    .right {
      border: none;
      width: 100%;
      height: 100%;
    }
    .date {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-align: center;
      align-items: center;
      width: 35px;
      height: 35px;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      font-size: 12px;
      &.is-grey {
        color: #999;
      }
    }
  }
  &.is-selected {
    .date {
      border: none;
      background: #1a7be6;
      color: #fff;
    }
  }
  &.selected-single {
    .date {
      border-radius: 100%;
    }
  }
  &.selected-all {
    .date {
      border-radius: 100%;
    }
  }
  &.is-disabled {
    .date {
      color: #999;
    }
  }
  .info {
    height: 15px;
    width: 100%;
    padding: 0 5px;
    font-size: 12px;
    color: #999;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
  }
}
</style>
