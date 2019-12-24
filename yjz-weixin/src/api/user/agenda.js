import http from '@/plugins/axios/index.js';
//加载会议
export const getAllMeet = params => {
  return http(`/oa-console/back/meet/select_meet_page.do`, params).then(res => res);
};
//查看每条会议
export const getEveryMeet = params => {
  return http(`/oa-console/back/meet/select_meet_by_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//编辑会议
export const getEditMeet = params => {
  return http(`/oa-console/back/meet/update_meet.do`, params).then(res => res);
};
//添加会议
export const getInsertMeet = params => {
  return http(`/oa-console/back/meet/inset_meet.do`, params, {}).then(res => res);
};

//删除会议
export const getDeleteMeet = params => {
  return http(`/oa-console/back/meet/delete_meet.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//查看所有部门
export const getAllDepartments = params => {
    return http(`/oa-console/back/dapartment/select_all_deps_and_com.do`, params, {
      method: 'GET'
    }).then(res => res);
  };