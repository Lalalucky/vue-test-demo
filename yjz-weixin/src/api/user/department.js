import http from '@/plugins/axios/index.js';
//查看所有部门
export const getDepartments = params => {
  return http(`/oa-console/back/dapartment/select_all_deps.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//查看每个部门的用户
export const getDepartmentOfficials = params => {
  return http(`/oa-console/back/dapartment/select_dep_users_by_page.do`, params).then(res => res);
};
//根据id查询部门信息
export const getDepartmentInfoById = params => {
  return http(`/oa-console/back/dapartment/select_dep_by_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//添加部门
export const getInsertDepartment = params => {
  return http(`/oa-console/back/dapartment/insert_dapartment.do`, params, {}).then(res => res);
};

//修改部门
export const getUpdateDepartment = params => {
  return http(`/oa-console/back/dapartment/update_dep.do`, params, {}).then(res => res);
};
//删除部门
export const DeleteDepartmentById = params => {
  return http(`/oa-console/back/dapartment/delete_department.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//批量删除部门人员
export const deleteDeptOffcials = params => {
  return http(`/oa-console/back/dapartment/delete_dep_users.do`, params, {}).then(res => res);
};