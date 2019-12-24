import { range } from '@/utils/index';
import { TouchMixin } from '@/plugins/mixins/touch';
import { ClickOutsideMixin } from '@/plugins/mixins/click-outside';

import './index.scss';

const THRESHOLD = 0.15;

export default {
  name: 'g2SwipeCell',
  mixins: [
    TouchMixin,
    ClickOutsideMixin({
      event: 'touchstart',
      method: 'onClick'
    })
  ],

  props: {
    onClose: Function,
    disabled: Boolean,
    leftWidth: {
      type: Number,
      default: 0
    },
    rightWidth: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      offset: 0,
      dragging: false
    };
  },

  methods: {
    open(position) {
      const offset = position === 'left' ? this.leftWidth : -this.rightWidth;
      this.swipeMove(offset);
      this.resetSwipeStatus();
    },

    close() {
      this.offset = 0;
    },

    resetSwipeStatus() {
      this.swiping = false;
      this.opened = true;
    },

    swipeMove(offset = 0) {
      this.offset = range(offset, -this.rightWidth, this.leftWidth);
      if (this.offset) {
        this.swiping = true;
      } else {
        this.opened = false;
      }
    },

    swipeLeaveTransition(direction) {
      const { offset, leftWidth, rightWidth } = this;
      const threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;

      // right
      if (direction === 'right' && -offset > rightWidth * threshold && rightWidth > 0) {
        this.open('right');
        // left
      } else if (direction === 'left' && offset > leftWidth * threshold && leftWidth > 0) {
        this.open('left');
        // reset
      } else {
        this.swipeMove(0);
      }
    },

    startDrag(event) {
      if (this.disabled) {
        return;
      }

      this.dragging = true;
      this.startOffset = this.offset;
      this.touchStart(event);
    },

    onDrag(event) {
      if (this.disabled) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'horizontal') {
        event.preventDefault();
        this.swipeMove(this.deltaX + this.startOffset);
      }
    },

    endDrag() {
      if (this.disabled) {
        return;
      }

      this.dragging = false;
      if (this.swiping) {
        this.swipeLeaveTransition(this.offset > 0 ? 'left' : 'right');
      }
    },

    onClick(position = 'outside') {
      this.$emit('click', position);

      if (!this.offset) {
        return;
      }

      if (this.onClose) {
        this.onClose(position, this);
      } else {
        this.swipeMove(0);
      }
    }
  },

  render(h) {
    const onClick = (position, stop) => event => {
      if (stop) {
        event.stopPropagation();
      }
      this.onClick(position);
    };

    const wrapperStyle = {
      transform: `translate3d(${this.offset}px, 0, 0)`,
      transition: this.dragging ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)'
    };

    return (
      <div
        class="g2-swipe-cell"
        onClick={onClick('cell')}
        onTouchstart={this.startDrag}
        onTouchmove={this.onDrag}
        onTouchend={this.endDrag}
        onTouchcancel={this.endDrag}
      >
        <div
          class="g2-swipe-cell__wrapper"
          style={wrapperStyle}
          onTransitionend={() => {
            this.swiping = false;
          }}
        >
          {this.leftWidth ? (
            <div class="g2-swipe-cell__left" onClick={onClick('left', true)}>
              {this.$slots['left']}
            </div>
          ) : null}
          {this.$slots['default']}
          {this.rightWidth ? (
            <div class="g2-swipe-cell__right" onClick={onClick('right', true)}>
              {this.$slots['right']}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
};
