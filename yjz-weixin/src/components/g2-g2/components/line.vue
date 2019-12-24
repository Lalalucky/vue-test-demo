<template>
  <div ref="lineCharts"></div>
</template>

<script>
import G2 from "@antv/g2";
import chartsMixins from "../mixins.js";
export default {
  name: "g2Line",
  mixins: [chartsMixins],
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      chart: null
    };
  },

  mounted() {
    // Step 1: 创建 Chart 对象
    this.chart = new G2.Chart({
      // 指定图表容器 ID
      container: this.$refs.lineCharts,

      forceFit: true,
      width: this.width,
      height: this.height
    });
    // Step 2: 载入数据源
    this.chart.source(this.data);

    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    this.chart.scale("value", {
      min: 0
    });
    this.chart.scale("year", {
      range: [0, 1]
    });
    this.chart.tooltip({
      crosshairs: {
        type: "line"
      }
    });
    this.chart.line().position("year*value");
    this.chart
      .point()
      .position("year*value")
      .size(4)
      .shape("circle")
      .style({
        stroke: "#fff",
        lineWidth: 1
      });

    // Step 4: 渲染图表
    this.chart.render();
  },
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
</style>
