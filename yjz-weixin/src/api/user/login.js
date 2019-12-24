import http from '@/plugins/axios/index.js';

/*

  用户 登录相关

*/


//用户登录
export const loginAPI = params => {
  return http(`/oa-console/weixin/user_login.do`, params, {
    isAuth: false
  }).then(res => res);
};


//用户登录
export const logoutAPI = params => {
  return http(`/oa-console/user/destroy.do`, params, {
    isAuth: false
  }).then(res => res);
};
