import Vue from 'vue';
// // 注意 有些组件使用异步加载会有影响


// Vue.component('g2-container', () => import('./g2-container'));
Vue.component('g2-scroll', () => import('./g2-scroll'));
Vue.component('g2-calendar', () => import('./g2-calendar1'));
Vue.component('g2-swipe-cell', () => import('./g2-swipecell'));
Vue.component('g2-group-spread', () => import('./g2-group-spread'));
Vue.component('g2-transition-add', () => import('./g2-transition-add'));
Vue.component('g2-search', () => import('./g2-search'));
// Vue.component('g2-uploader', () => import('./g2-uploader'));
Vue.component('g2-progress', () => import('./g2-progress'));
Vue.component('g2-user-selected', () => import('./g2-user-selected'));
