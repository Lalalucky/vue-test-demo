export default {
  props: {
    // 是否宽高自适应
    forceFit: {
      type: Boolean,
      default: true
    },
    // 开启关闭图表动画
    animate: {
      type: Boolean,
      default: true
    },
    width: {
      type: [String, Number],
      default: '1000'
    },
    height: {
      type: [String, Number],
      default: '400'
    }
  }
};
