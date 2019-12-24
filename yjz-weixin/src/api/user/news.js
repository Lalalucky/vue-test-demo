import http from '@/plugins/axios/index.js';
//加载新闻
export const getAllNews = params => {
  return http(`/oa-console/back/news/select_news_page.do`, params).then(res => res);
};
//查看每条新闻
export const getEveryNews = params => {
  return http(`/oa-console/back/news/select_news_by_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//编辑新闻
export const getEditNews = params => {
  return http(`/oa-console/back/news/update_news.do`, params).then(res => res);
};
//添加新闻
export const getInsertNews = params => {
  return http(`/oa-console/back/news/inset_news.do`, params, {}).then(res => res);
};

//删除新闻
export const getDeleteNews = params => {
  return http(`/oa-console/back/news/delete_news.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//删除图片
export const deleteImages= params => {
  return http(`/oa-console/back/file/delete_file.do`, params, {
    method: 'GET'
  }).then(res => res);
};
