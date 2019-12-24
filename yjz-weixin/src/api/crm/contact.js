import http from '@/plugins/axios/index.js';

/* 
    项目 客户管理
*/

//创建 一个客户
export const insertContact = params => {
  return http(`/oa-console/back/contact/insert_contact.do`, params).then(res => res);
};
//删除一个客户数据
export const deleteContact = params => {
  return http(`/oa-console/back/contact/delete_contact.do`, params, {
    method: 'GET'
  }).then(res => res);
};

//更新一个客户基本数据
export const updateContact = params => {
  return http(`/oa-console/back/contact/update_contact.do`, params).then(res => res);
};

//根据id查询 客户详细信息
export const selectContactById = params => {
  return http(`/oa-console/back/contact/select_contact_by_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};

//加载所有的客户
export const selectContactByClientId = params => {
  return http(`/oa-console/back/contact/select_contacts_by_client.do`, params, {
    method: 'GET'
  }).then(res => res);
};
