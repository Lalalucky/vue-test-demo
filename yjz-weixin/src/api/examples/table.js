import http from '@/plugins/axios/index.js';

/*

用户 登录相关

*/

//用户登录
export const queryActivityByPage = params => {
  return http(`/simcere-vote/back/pcactivity/query_activity_by_page.do`, params).then(res => res);
};
