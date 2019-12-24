import url from '@/utils/url';

export default {
  install(Vue, options) {
    // 处理当前url
    Vue.prototype.$url = url;
  }
};
