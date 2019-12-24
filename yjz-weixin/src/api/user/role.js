import http from '@/plugins/axios/index.js';
/* 
    角色相关
*/

//加载所有的角色
export const postRoleLoadTotal = params => {
  return http(`/oa-console/back/role/select_all_roles.do`, params).then(res => res);
};
//根据角色名称和分页查询角色数据
export const postRoleLoadByName = params => {
  return http(`/oa-console/back/role/select_roles_by_page.do`, params).then(res => res);
};
//根据id查询角色数据
export const postRoleInfoById = params => {
  return http(`/oa-console/back/role/select_role_by_id.do`, params, {
    type: 'formdata'
  }).then(res => res);
};
//创建一个新的角色
export const postCreateRole = params => {
  return http(`/oa-console/back/role/insert_role.do`, params).then(res => res);
};
// 编辑角色信息
export const postModRoleInfo = params => {
  return http(`/oa-console/back/role/update_role.do`, params).then(res => res);
};

//删除角色
export const deleteRoleById = params => {
  return http(`/oa-console/back/role/delete_role.do`, params, {
    type: 'formdata'
  }).then(res => res);
};
// 修改角色的权限
export const updateRolePrivileges = params => {
  return http(`/oa-console/back/role/priv_mannager.do`, params).then(res => res);
};
