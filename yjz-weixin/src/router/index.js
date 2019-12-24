import Vue from 'vue';
import NProgress from 'nprogress'; // Progress 进度条
import Router from 'vue-router';

import { baseRouterMap, LoginPage } from './baseRouter';
import store from '@/store/index.js';
import { getSid as getToken } from '@/common/auth.js';
import config from '@/common/config';

Vue.use(Router);
// 路由的模式 只支持 'history' || 'hash'
let ROUTER_MODE = process.env.HISTORY || 'history';
const router = new Router({
  mode: ROUTER_MODE,
  base: '/lt-page-weixin',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: baseRouterMap
});

// 免登陆白名单
const whiteList = config.menu.whiteList || []; // 不重定向白名单

let isAuthentication = config.menu.isAuthentication;

if (process.env.NODE_ENV !== 'development') {
  isAuthentication = true;
}

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress

  // 不开启认证直接全部通过
  // if (!isAuthentication) {
    next();
    // r/eturn;
  // }

  // if (whiteList.indexOf(to.path) !== -1) {
  //   // 在免登录白名单，直接进入
  //   next();
  // } else {
  //   if (getToken()) {
  //     // 判断是否有token
  //     if (to.path === '/login') {
  //       next({ path: '/' });
  //     } else {
  //       // 如果没有用户的信息就 获取
  //       if (!store.getters['base/user/g_userId']) {
  //         store
  //           .dispatch('base/user/load')
  //           .then(info => {
  //             next();
  //           })
  //           .catch(() => {
  //             store.dispatch('FedLogOut').then(() => {
  //               next({ path: '/login' });
  //             });
  //           });
  //       } else {
  //         next();
  //       }
  //     }
  //   } else {
  //     next('/login'); // 否则全部重定向到登录页
  //     // NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
  //   }
  // }
});

router.afterEach(to => {
  NProgress.done(); // 结束Progress
  // 设置 meta 的title
  let title = to.meta && to.meta.title ? to.meta.title : '';
  document.title = title;
});

export default router;
