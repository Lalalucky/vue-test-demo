import http from '@/plugins/axios/index.js';

/* 
    员工管理
*/

/**
 * 查询所有的员工
 * @param {*} params
 */
export const loadAllUserList = params => {
  return http(`/oa-console/back/user/select_all_users.do`, params).then(res => res);
};
//  分页获取所有员工的数据
export const postStaffList = params => {
  return http(`/oa-console/back/user/select_users_by_page.do`, params).then(res => res);
};


//  查询所有的员工 包含其部门和职位
export const loadAllUserContainJobAndDept = params => {
  return http(`/oa-console/back/user/select_all_users_job_dep.do`, params).then(res => res);
};



//  查询自己及下属员工数据
export const loadUserAndSubUserAPI = params => {
  return http(`/oa-console/back/user/select_all_sub_users.do`, params).then(res => res);
};
// 重置密码接口
export const resetPasswordAPI = params => {
  return http(`/oa-console/back/user/reset_passwd.do`, params, {
    method: 'GET',
    params
  }).then(res => res);
};

// 根据id获取员工信息
export const loadUserBasinfoByIdAPI = params => {
  return http(`/oa-console/back/user/select_user_by_id.do`, params, {
    method: 'GET',
    headers:{
      "Cache-Control":"private"
    }
  }).then(res => res);
};

//新建一个员工
export const postStaffCreate = params => {
  return http(`/oa-console/back/user/insert_user.do`, params).then(res => res);
};

//更新员工信息
export const updateUserBasicInfoAPI = params => {
  return http(`/oa-console/back/user/update_user.do`, params).then(res => res);
};

//删除员工信息
export const deleteUserByIdAPI = params => {
  return http(`/oa-console/back/user/delete_user.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

//修改员工的角色
export const loadUserRoleInfoByIdAPI = params => {
  return http(`/oa-console/back/user/select_roles_by_id.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

//修改员工的角色
export const updateUserRoleInfo = params => {
  return http(`/oa-console/back/user/role_mannager.do`, params).then(res => res);
};

//修改员工的 部门
export const postStaffModDepart = params => {
  return http(`/oa-user/user/newStaff.do`, params).then(res => res);
};

//查询 员工的部门
export const selectDepByUserId = params => {
  return http(`/oa-console/back/user/get_user_info_by_id.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

//根据SID获取该用户的菜单数据
export const loadMenuListInfoBySidAPI = params => {
  return http(`/oa-console/back/user/get_user_menuitem.do`, params).then(res => res);
};

//员工修改 其部门信息
export const loadDepartmentListAllAPI = params => {
  return http(`/oa-console/back/dapartment/select_all_deps.do`, params).then(res => res);
};

//员工修改 其部门信息
export const loadDepartmentInfoByIdAPI = params => {
  return http(`/oa-console/back/user/select_deps_by_id.do`, params, {
    type: 'formdata'
  }).then(res => res);
};
//员工修改 其部门信息
export const updateUserDepInfoAPI = params => {
  return http(`/oa-console/back/user/dep_mannager.do`, params).then(res => res);
};

// -------------------------------------------
//   用户职位相关操作
// -------------------------------------------

//员工修改 其职务信息
export const loadJobsListAllAPI = params => {
  return http(`/oa-console/back/job/select_all_jobs.do`, params).then(res => res);
};
//查询 员工的职务
export const loadUserJobInfoByIdAPI = params => {
  return http(`/oa-console/back/user/select_jobs_by_id.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

//查询 员工的职务
export const updateUserJobInfoAPI = params => {
  return http(`/oa-console/back/user/job_mannager.do`, params).then(res => res);
};

//根据用户的id查询用户的信息
export const getUserInfoBySidAPI = params => {
  return http(`/oa-console/back/user/get_user_info.do`, params).then(res => res);
};

//根据用户的id查询用户的信息
export const loadUserDetailInfoByIdAPI = params => {
  return http(`/oa-console/back/user/select_user_detail.do`, params, {
    type: 'formdata'
  }).then(res => res);
};
//根据用户的id查询用户的信息
export const updateUserDetailInfoAPI = params => {
  return http(`/oa-console/back/user/update_user_detail.do`, params).then(res => res);
};

// 查询员工的技能
export const selectUserSkillsInfoById = params => {
  return http(`/oa-user/skills/selectUserSkillsInfoById.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

export const addUserSkill = params => {
  return http(`/oa-user/skills/addUserSkill.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

export const deleteUserSkill = params => {
  return http(`/oa-user/skills/deleteUserSkill.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

export const selectSubordinates = params => {
  return http(`/oa-user/selectSubordinates.do`, params).then(res => res);
};

// 根据id获取员工信息
export const getUserBasicInfo = params => {
  return http(`/oa-user/user/getUserBasicInfo.do`, params, {
    type: 'formdata'
  }).then(res => res);
};

//根据用户的id查询用户的信息
export const getUserPermissionMenu = params => {
  return http(`/admin/user/front/menus`, params, {
    method: 'GET',
    params
  }).then(res => res);
};


// 上传图片接口
export const uploadPicAPI = params => {
  return http(`/oa-console/back/user/upload_pic.do`, params , {
    type : 'file'
  }).then(res => res);
};
