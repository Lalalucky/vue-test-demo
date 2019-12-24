import config from '@/common/config';

export let baseRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/pages/Login/index.vue'], resolve)
  }
];

export const LoginPage = {
  path: '*',
  redirect: '/home'
};

/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const routerFiles = require.context('./modules', false, /\.js$/);
const modules = [];

routerFiles.keys().forEach(key => {
  let moduleDefault = routerFiles(key).default;

  Array.isArray(moduleDefault) ? modules.push(...moduleDefault) : modules.push(moduleDefault);
});

// 权限验证后的路由
export const asyncRouterMap = [
  // 个人中心
  // 系统有关
  // 用户有关
  // 默认首页为 登录页面
  ...modules
];

let isAuthentication = config.menu.isAuthentication;
// if (process.env.NODE_ENV !== 'development') {
//   isAuthentication = true;
// }
// // 开启登录鉴权
// if (!isAuthentication) {
baseRouterMap = baseRouterMap.concat(asyncRouterMap).concat([LoginPage]);

// }
