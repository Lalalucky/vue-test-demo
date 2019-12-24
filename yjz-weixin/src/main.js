import 'babel-polyfill';
import Vue from 'vue';

// [必选插件] 移除移动端页面点击延迟
import FastClick from 'fastclick';
FastClick.attach(document.body);
import 'vant/lib/index.css';
import App from './App';

// import VConsole from 'vconsole'

// if (process.env.NODE_ENV === 'production') {
//   new VConsole()
// }
// [必选插件]  菜单和路由设置
import router from './router';

// [必选插件]  Vuex store
import store from '@/store/index';

// [必选插件] 一些公共的业务组件
import '@/components/index.js';

// [必选插件] 自定义插件
import plugin from './plugins/index.js';
Vue.use(plugin);

// swiper 组件


import VueSwiper from 'vue-awesome-swiper'
Vue.use(VueSwiper)


import '@public/lib/flexible.js';

import Es6Promise from 'es6-promise'
require('es6-promise').polyfill();
Es6Promise.polyfill()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
