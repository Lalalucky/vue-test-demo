import http from '@/plugins/axios/index.js';
//查看所有职位
export const getPosition = params => {
  return http(`/oa-console/back/job/select_all_jobs.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//查看每个职位对应的用户
export const getPositionByPage = params => {
  return http(`/oa-console/back/job/select_job_users_by_page.do`, params).then(res => res);
};
//根据id查询职位
export const getPositionInfoById = params => {
  return http(`/oa-console/back/job/select_job_by_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//添加职位
export const getInserttPosition = params => {
  return http(`/oa-console/back/job/insert_job.do`, params, {}).then(res => res);
};

//修改职位
export const getUpdatePosition = params => {
  return http(`/oa-console/back/job/update_job.do`, params, {}).then(res => res);
};
//删除职位
export const DeletePositionById = params => {
  return http(`/oa-console/back/job/delete_job.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//批量删除该职位用户
export const deletePositionUser = params => {
  return http(`/oa-console/back/job/delete_job_users.do`, params, {}).then(res => res);
};