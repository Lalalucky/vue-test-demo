<template>
  <div class="g2-progress">
    <span
      class="g2-progress__portion"
      :class="{ 'g2-progress__with-pivot': showPivot }"
      :style="portionStyle"
    >
      <span ref="pivot" :style="pivotStyle" class="g2-progress__pivot" v-if="showPivot">{{text}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "g2Progress",
  props: {
    inactive: Boolean,
    pivotText: String,
    pivotColor: String,
    percentage: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 100
    },
    showPivot: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "#2AAFC4"
    },
    textColor: {
      type: String,
      default: "#fff"
    }
  },

  data() {
    return {
      pivotWidth: 0,
      progressWidth: 0
    };
  },
  computed: {
    pivotStyle() {
      const background = this.inactive ? "#cacaca" : this.color;

      return {
        color: this.textColor,
        background: this.pivotColor || background
      };
    },
    portionStyle() {
      const background = this.inactive ? "#cacaca" : this.color;

      return {
        background,
        width:
          ((this.progressWidth - this.pivotWidth) * this.percentage) / 100 +
          "px"
      };
    },
    text() {
      return this.pivotText ? this.pivotText : this.percentage + "%";
    }
  },

  mounted() {
    this.getWidth();
  },

  watch: {
    showPivot() {
      this.getWidth();
    },

    pivotText() {
      this.getWidth();
    }
  },

  methods: {
    getWidth() {
      this.progressWidth = this.$el.offsetWidth;
      this.pivotWidth = this.$refs.pivot ? this.$refs.pivot.offsetWidth : 0;
    }
  }
};
</script>

<style scoped lang="scss">
.g2-progress {
  height: 4px;
  position: relative;
  border-radius: 4px;
  background: #f3f3f3;

  &__portion {
    left: 0;
    height: 100%;
    position: absolute;
    border-radius: inherit;

    &__with-pivot {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &__pivot {
    top: 50%;
    right: 0;
    min-width: 2em;
    padding: 0 5px;
    font-size: 10px;
    position: absolute;
    line-height: 1.6;
    text-align: center;
    border-radius: 1em;
    word-break: keep-all;
    box-sizing: border-box;
    background-color: #f3f3f3;
    transform: translate(100%, -50%);
  }
}
</style>
