import http from '@/plugins/axios/index.js';

/*

  project相关的接口

*/

/**项目
 *
 */
//创建 一个项目
export const insertProject = params => {
  return http(`/oa-console/back/project/insert_project.do`, params).then(res => res);
};

// 查询所有客户公司及名称
export const selectAllClient = params => {
  return http(`/oa-console/back/client/select_all_client.do`).then(res => res);
};

// 查询所有用户公司及名称
export const selectAllUsers = params => {
  return http(`/oa-console/back/user/select_all_users_job_dep.do`).then(res => res);
};

// 分页查询所有项目
export const selectProjectsByPage = params => {
  return http(`/oa-console/back/project/select_projects_by_page.do`, params).then(res => res);
};

// 根据Id查询项目详情
export const selectProjectById = params => {
  return http(`/oa-console/back/project/select_project_base.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//更新一个项目基本数据
export const updateProject = params => {
  return http(`/oa-console/back/project/update_project.do`, params).then(res => res);
};
// 完成项目
export const completeProject = params => {
  return http(`/oa-console/back/project/complete_project.do`, params, {
    method: 'GET'
  }).then(res => res);
};
// 删除取消项目
export const deleteProject = params => {
  return http(`/oa-console/back/project/delete_project.do`, params, {
    method: 'GET'
  }).then(res => res);
};

/**
    项目阶段
 * 
 */

//创建 一个阶段
export const insertStage = params => {
  return http(`/oa-console/back/stage/insert_stage.do`, params).then(res => res);
};

// 根据项目Id查询项目阶段
export const selectStagesByProjectId = params => {
  return http(`/oa-console/back/stage/select_stages_by_project_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};

// 根据项目Id和阶段id查询项目阶段详情
export const selectStagesById = params => {
  return http(`/oa-console/back/stage/select_stage_by_id.do`, params).then(res => res);
};

//更新一个项目阶段基本数据
export const updateStage = params => {
  return http(`/oa-console/back/stage/update_stage.do`, params).then(res => res);
};

// 完成项目
export const completeStage = params => {
  return http(`/oa-console/back/stage/complete_stage.do`, params, {
    method: 'GET'
  }).then(res => res);
};
// 删除取消项目
export const deleteStage = params => {
  return http(`/oa-console/back/stage/delete_stage.do`, params, {
    method: 'GET'
  }).then(res => res);
};

// 退出阶段
export const quitStage = params => {
  return http(`/oa-console/back/stage/quit_stage.do`, params, {
    method: 'GET'
  }).then(res => res);
};

/**
    合同
 * 
 */

// 根据项目Id查询所有合同
export const selectAllContract = params => {
  return http(`/oa-console/back/contract/select_all_contract.do`, params, {
    method: 'GET'
  }).then(res => res);
};

//创建 一个合同
export const insertContract = params => {
  return http(`/oa-console/back/contract/insert_contract.do`, params).then(res => res);
};
//删除一个合同数据
export const deleteContract = params => {
  return http(`/oa-console/back/contract/delete_contractId.do`, params, {
    type: 'formdata'
  }).then(res => res);
};
//根据合同id查找合同详情
export const selectContractById = params => {
  return http(`/oa-console/back/contract/query_contract_by_id.do`, params, {
    type: 'formdata'
  }).then(res => res);
};
//更新一个合同基本数据
export const updateContract = params => {
  return http(`/oa-console/back/contract/update_contract.do`, params).then(res => res);
};
// 根据合同id下载合同附件压缩包
export const downContractFile = params => {
  return http(`/oa-console/back/contract/down_contract_file.do`, params,{
    method: 'GET'
  }).then(res => res);
};

/***
 * 文件
 * 
 */
// 上传文件
export const uploadFile = params => {
  return http(`/oa-console/back/file/upload_file.do`, params , {
    type : 'file'
  }).then(res => res);
};

// 删除文件
export const deleteFile = params => {
  return http(`/oa-console/back/file/delete_file.do`, params , {
    method: 'GET'
  }).then(res => res);
};

// 查询自己上传的文件
export const selectFile = params => {
  return http(`/oa-console/back/file/select_file_by_page.do`, params).then(res => res);
};


/***金额管理 
 * 
*/

//创建 一个资金
export const insertProjectCash = params => {
  return http(`/oa-console/back/cash/insert_project_cash.do`, params).then(res => res);
};
// 根据Id查询资金详情
export const selectProjectCashById = params => {
  return http(`/oa-console/back/cash/select_project_cash_byid.do`, params, {
    method: 'GET'
  }).then(res => res);
};
//删除一个资金数据
export const deleteProjectCash= params => {
  return http(`/oa-console/back/cash/delete_cash_id.do`, params, {
    type: 'formdata'
  }).then(res => res);
};
//根据id查找所有资金
export const selectAllCash = params => {
  return http(`/oa-console/back/cash/select_all_project_cash.do`, params, {
    type: 'formdata'
  }).then(res => res);
};
//更新一个资金基本数据
export const updateProjectCash = params => {
  return http(`/oa-console/back/cash/update_project_cash.do`, params).then(res => res);
};

  /**
   * 拜访
   */
  // 添加项目拜访记录
  export const insertProjectVisit = params => {
    return http(`/oa-console/back/project/insert_project_visit.do`, params).then(res => res);
  };
  //条件分页查询项目拜访记录
export const selectProjectVisitByPage= params => {
  return http(`/oa-console/back/project/select_project_visit_by_page.do`, params).then(res => res);
};
// 根据Id查询项目拜访记录
export const selectProjectVisitById = params => {
  return http(`/oa-console/back/project/select_project_visit_by_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};
// 更新项目拜访记录
export const updateProjectVisit = params => {
  return http(`/oa-console/back/project/update_project_visit.do`, params).then(res => res);
};
// 审核通过项目拜访记录
export const checkPassProjectVisit = params => {
  return http(`/oa-console/back/project/check_pass_project_visit.do`, params, {
    method: 'GET'
  }).then(res => res);
};
// 审核不通过项目拜访记录
export const checkNoPassProjectVisit = params => {
  return http(`/oa-console/back/project/check_no_pass_project_visit.do`, params, {
    method: 'GET'
  }).then(res => res);
};
// 删除项目拜访记录
export const deleteProjectVisit = params => {
  return http(`/oa-console/back/project/delete_project_visit.do`, params, {
    method: 'GET'
  }).then(res => res);
};
// 一键添加客户拜访记录
export const insertClientVisit= params => {
  return http(`/oa-console/back/project/insert_client_visit.do`, params, {
    method: 'GET'
  }).then(res => res);
};
/**
 * 统计相关
 * 
 */
//工作量详情
export const queryPersonalStatistic= params => {
  return http(`/oa-console/statistics/back/person_month_statistics.do`, params).then(res => res);
};
//工作量详情
export const queryProjectMonthStatistic= params => {
  return http(`/oa-console/statistics/back/project_month_statistics.do`, params).then(res => res);
};
//工作量详情
export const queryProjectDetailStatistic= params => {
  return http(`/oa-console/statistics/back/project_month_detail.do`, params).then(res => res);
};
//工作量详情
export const queryWorkStatistic= params => {
  return http(`/oa-console/statistics/back/work_month_statistics.do`, params).then(res => res);
};
//工作量详情
export const queryWorkDetailStatistic= params => {
  return http(`/oa-console/statistics/back/work_person_detail.do`, params).then(res => res);
};

