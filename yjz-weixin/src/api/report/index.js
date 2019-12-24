import http from '@/plugins/axios/index.js';

/**********************
  个人报告管理
 **********************/

//新增报告
export const insertReportAPI = params => {
  return http(`/oa-console/back/report/inset_report.do`, params).then(res => res);
};

//根据Id查询报告详情
export const selectReportByIdAPI = params => {
  return http(`/oa-console/back/report/select_report_by_id.do`, params, {
    method: 'GET'
  }).then(res => res);
};

//自己的报告的条件分页查询
export const selectOwnReportByPageAPI = params => {
  return http(`/oa-console/back/report/select_own_report_by_page.do`, params).then(res => res);
};

//报告的条件分页查询
export const selectReportByPageAPI = params => {
  return http(`/oa-console/back/report/select_report_by_page.do`, params).then(res => res);
};
