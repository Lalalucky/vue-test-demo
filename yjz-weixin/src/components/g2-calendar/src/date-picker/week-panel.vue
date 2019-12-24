<template>
  <div class="g2-weekpanel">
    <div class="cell cell-grey">日</div>
    <div class="cell">一</div>
    <div class="cell">二</div>
    <div class="cell">三</div>
    <div class="cell">四</div>
    <div class="cell">五</div>
    <div class="cell cell-grey">六</div>
  </div>
</template>

<script>
export default {
  name: "g2WeekPanel",
  props: {
    week: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.g2-weekpanel {
  background: #fff;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 0 2px;
  border-bottom: 1px #ccc solid;
  .cell {
    height: 24px;
    display: -ms-flexbox;
    display: flex;
    width: 14.28571429%;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    &.cell-grey {
      color: #999;
    }
  }
}
</style>
