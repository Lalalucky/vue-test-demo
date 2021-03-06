import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// fastclick
import FastClick from 'fastclick';
FastClick.attach(document.body);

// vant-UI
import 'vant/lib/index.css';

// 自适应屏幕
import '@public/lib/flexible.js';

// 支持es6 Promise
import 'babel-polyfill';
import Es6Promise from 'es6-promise';
require('es6-promise').polyfill();
Es6Promise.polyfill();

// 轮播插件
import vueSwiper from 'vue-awesome-swiper';
Vue.use(vueSwiper);

// plugins
import '@/utils/index.js';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
