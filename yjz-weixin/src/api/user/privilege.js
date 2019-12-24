import http from '@/plugins/axios/index.js';
/* 
    权限管理
*/
export const postPrivilegeLoadTotal = params => {
  return http(`/oa-console/back/privilege/select_all_privileges.do`, params).then(res => res);
};

export const postPrivilegeLoadByName = params => {
  return http(`/oa-console/back/privilege/select_privileges_by_page.do`, params).then(res => res);
};

export const postPrivilegeCreate = params => {
  return http(`/oa-console/back/privilege/insert_privilege.do`, params).then(res => res);
};

export const postPrivilegeMod = params => {
  return http(`/oa-console/back/privilege/update_privilege.do`, params).then(res => res);
};

// 根据权限id查询权限数据
export const postPrivilegeById = params => {
  return http(`/oa-console/back/privilege/select_privileges_by_id.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

export const deletePrivilege = params => {
  return http(`/oa-console/back/privilege/delete_privilege.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

//查询用户是否具有某些权限
export const selectUserPrivilege = params => {
  return http(`/oa-console/privilege/selectUserPrivilege.do`, params).then(res => res);
};

//根据用户的id查询用户的信息
export const listPrivilegesByPage = params => {
  return http(`/oa-console/back/privilege/select_privileges_by_page.do`, params).then(res => res);
};

//根据用户的id查询用户的信息
export const getPrivilegeInfoById = params => {
  return http(`/oa-console/back/privilege/select_privileges_by_id.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

//根据用户的id查询用户的信息
export const deletePrivilegeById = params => {
  return http(`/oa-console/back/privilege/delete_privilege.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

//根据用户的id查询用户的信息
export const updatePrivilegeById = params => {
  return http(`/oa-console/back/privilege/update_privilege.do`, params).then(res => res);
};
