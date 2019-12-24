import http from '@/plugins/axios/index.js';
//加载公告
export const getAllNotice = params => {
  return http(`/oa-console/back/notice/select_notice_page.do`, params).then(res => res);
};
//查看每条公告
export const getEveryNotice = params => {
  return http(`/oa-console/back/notice/select_notice_by_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//编辑公告
export const getEditNotice = params => {
  return http(`/oa-console/back/notice/update_notice.do`, params).then(res => res);
};
//添加公告
export const getInsertNotice = params => {
  return http(`/oa-console/back/notice/inset_notice.do`, params, {}).then(res => res);
};

//删除公告
export const getDeleteNotice = params => {
  return http(`/oa-console/back/notice/delete_notice.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//查看所有部门
export const getAnotherDepartments = params => {
  return http(`/oa-console/back/dapartment/select_all_deps_and_com.do`, params, {
    method: 'GET'
  }).then(res => res);
};