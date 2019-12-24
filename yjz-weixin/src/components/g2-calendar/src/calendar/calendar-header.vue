<template>
  <div class="calendar-header">
    <span class="calendar-header-left">X</span>
    <span class="calendar-header-title">日期选择</span>
    <span class="calendar-header-right">清除</span>
  </div>
</template>

<script>
export default {
  name: "g2CalendarHeader",
  props: {},

  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.calendar-header {
  margin: 5px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -ms-flex-align: center;
  align-items: center;
  .calendar-header-left {
    position: absolute;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 8px;
    height: 24px;
    left: 5px;
    top: 5px;
    color: #068eef;
  }
  .calendar-header-title {
    text-align: center;
    width: 100%;
    font-weight: 700;
  }
  .calendar-header-right {
    position: absolute;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 8px;
    height: 24px;
    right: 5px;
    top: 5px;
    color: #068eef;
    font-size: 14px;
  }
}
</style>
