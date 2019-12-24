import http from '@/plugins/axios/index.js';

//查看图片
export const getNewsImgByPage = params => {
  return http(`/oa-console/back/news/select_news_page.do`, params).then(res => res);
};
//查看会议
export const getMeetByPage = params => {
  return http(`/oa-console/back/meet/select_meet_page.do`, params).then(res => res);
};
//公告
export const getNoticeByPage = params => {
  return http(`/oa-console/back/notice/select_notice_page.do`, params).then(res => res);
};

