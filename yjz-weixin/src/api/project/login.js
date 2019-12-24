import http from '@/plugins/axios/index.js';

/*

 登录相关的接口

*/

//获取手机验证码
export const getPhoneCodeByPhone = params => {
  return http(`/yjz-sso/lawtrain/getPhoneCode.do`, params,{method:'GET'}).then(res => res);
};

// 登录
export const loginByCode = params => {
  return http(`/yjz-sso/lawtrain/bindVX.do`, params).then(res => res);
};
//获取微信头像
export const getHeadImg = params => {
  return http(`/yjz-sso/lawtrain/getWeChatHeadImgUrl.do`, params,{method:'GET'}).then(res => res);
};