import http from '@/plugins/axios/index.js';

/* 
    项目 客户管理
*/

//创建 一个客户
export const insertClient = params => {
  return http(`/oa-console/back/client/insert_client.do`, params).then(res => res);
};
//删除一个客户数据
export const deleteClient = params => {
  return http(`/oa-console/back/client/delete_client.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//更新一个客户基本数据
export const updateClient = params => {
  return http(`/oa-console/back/client/update_client.do`, params).then(res => res);
};
//根据id查询 客户详细信息
export const selectClientById = params => {
  return http(`/oa-console/back/client/select_client_by_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//加载所有的客户
export const selectClientsByPage = params => {
  return http(`/oa-console/back/client/select_clients_by_page.do`, params).then(res => res);
};

export const queryLogsByTypeAndTargetId = params => {
  return http(`/oa-project/queryLogsByTypeAndTargetId.do`, params, {
    method: 'GET'
  }).then(res => res);
};

export const changePublic = params => {
  return http(`/oa-console/back/client/change_public.do`, params, {
    method: 'GET'
  }).then(res => res);
};

/**************************************************
    拜访记录
**************************************************/

export const insertVisit = params => {
  return http(`/oa-console/back/visit/insert_visit.do`, params).then(res => res);
};

//删除一个客户数据
export const deleteVisit = params => {
  return http(`/oa-console/back/visit/delete_visit.do`, params, {
    method: 'GET'
  }).then(res => res);
};

//更新一个客户基本数据
export const updateVisit = params => {
  return http(`/oa-console/back/visit/update_visit.do`, params).then(res => res);
};

//根据id查询 客户详细信息
export const selectVisitById = params => {
  return http(`/oa-console/back/visit/select_visit_by_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};

//根据id查询 客户详细信息
export const selectVisitByPage = params => {
  return http(`/oa-console/back/visit/select_visit_by_page.do`, params).then(res => res);
};
