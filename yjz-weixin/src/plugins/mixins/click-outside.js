import { on, off } from '@/utils/dom';

export const ClickOutsideMixin = config => ({
  mounted() {
    config.handler = event => {
      if (!this.$el.contains(event.target)) {
        this[config.method]();
      }
    };

    on(document, config.event, config.handler);
  },

  beforeDestroy() {
    off(document, config.event, config.handler);
  }
});
