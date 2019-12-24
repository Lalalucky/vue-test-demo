import http from '@/plugins/axios/index.js';

/*

  CRM相关的接口

*/

//创建 一个客户
export const insertClient = params => {
  return http(`/oa-crm/client/insertClient.do`, params).then(res => res);
};
//删除一个客户数据
export const deleteClient = params => {
  return http(`/oa-crm/client/deleteClient.do`, params, {
    type: 'formdata'
  }).then(res => res);
};
//更新一个客户基本数据
export const updateClient = params => {
  return http(`/oa-crm/client/updateClient.do`, params).then(res => res);
};
//根据id查询 客户详细信息
export const selectClientById = params => {
  return http(`/oa-crm/client/selectClientById.do`, params, {
    type: 'formdata'
  }).then(res => res);
};
//加载所有的客户
export const selectClientsByPage = params => {
  return http(`/oa-crm/client/selectClientsByPage.do`, params).then(res => res);
};

export const queryLogsByTypeAndTargetId = params => {
  return http(`/oa-project/queryLogsByTypeAndTargetId.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

export const changePublic = params => {
  return http(`/oa-crm/client/changePublic.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

/*
    拜访记录
*/

export const insertVisit = params => {
  return http(`/oa-crm/visit/insertVisit.do`, params).then(res => res);
};

//删除一个客户数据
export const deleteVisit = params => {
  return http(`/oa-crm/visit/deleteVisit.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

//更新一个客户基本数据
export const updateVisit = params => {
  return http(`/oa-console/back/visit/updateVisit.do`, params).then(res => res);
};

//根据id查询 客户详细信息
export const selectVisitById = params => {
  return http(`/oa-console/back/visit/select_visit_by_id.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

//根据id查询 客户详细信息
export const selectVisitByPage = params => {
  return http(`/oa-console/back/visit/selectVisitByPage.do`, params).then(res => res);
};

//分页自己查询拜访记录
export const selectOwnVisitByPage = params => {
  return http(`/oa-console/back/visit/select_own_visit_by_page.do`, params).then(res => res);
};
