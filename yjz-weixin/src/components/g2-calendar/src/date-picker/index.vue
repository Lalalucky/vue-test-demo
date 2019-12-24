<template>
  <div class="g2-calender date-picker">
    <g2WeekPanel></g2WeekPanel>
    <div class="date-picker-wrapper">
      <g2SingleMonth
        v-for="month in months"
        :key="month.title"
        :title="month.title"
        :weeks="month.weeks"
      ></g2SingleMonth>
    </div>
  </div>
</template>

<script>
import g2WeekPanel from "./week-panel.vue";
import g2SingleMonth from "./single-month.vue";

export default {
  name: "g2DatePicker",
  components: {
    g2WeekPanel,
    g2SingleMonth
  },
  props: {
    // 默认加载几个月
    months: {
      type: Array,
      default() {
        return [];
      }
    },
    
    
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.date-picker {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  background: #eee;

  .date-picker-wrapper {
    height: auto;
    position: relative;
    overflow-y: auto;
  }
}
</style>
