<template>
  <div class="single-month">
    <header class="month-title">{{title}}</header>
    <div class="month-date">
      <g2SingleWeek v-for="(week,$index) in weeks" :key="$index" :week='week'></g2SingleWeek>
    </div>
  </div>
</template>

<script>
import g2SingleWeek from "./single-week.js";
export default {
  name: "g2SingleMonth",
  components: { g2SingleWeek },
  props: {
    title: {
      type: String,
      default: ""
    },
    firstDate: {
      type: Date,
      default() {
        return new Date();
      }
    },
    lastDate: {
      type: Date,
      default() {
        return new Date();
      }
    },
    weeks: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {}
};
</script>

<style lang="scss">
.single-month {
  background: #fff;
  padding: 10px 2px 0;
  overflow: hidden;

  .month-title {
    margin-left: 15px;
  }
  .month-date {
    .row {
      display: flex;
      padding: 3px 0;
    }
  }
}
</style>
