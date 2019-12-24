import * as util from '@/utils/index.js';
import { pick, pickBy, merge } from 'lodash';
import pageMixins from '@/store/mixins/page.js';

import {
  insertReportAPI,
  selectReportByIdAPI,
  selectOwnReportByPageAPI,
  selectReportByPageAPI
} from '@/api/report/index';

export const REPORT_CREATE_FORM = ['type', 'content', 'remark', 'userIds'];

export const REPORT_QUERY_FORM = ['type', 'start', 'end', 'createId', 'isRead'];

const state = {
  // 当前的模式  为新建还是修改
  type: 1,
  // 我的报告的类型
  createForm: {
    type: '1',
    content: '',
    remark: '',
    reportId: '',
    userIds: []
  },

  query: {
    tab: 1,
    type: undefined,
    time: undefined,
    start: undefined,
    end: undefined,
    createId: undefined,
    isRead: undefined
  },
  blogList: []
};
const getters = {
  g_crateform(state) {
    return state.createForm;
  },

  g_query_tab(state) {
    return state.query.tab;
  },

  // 获取转换后的 list 数据
  g_bloglist(state) {
    let arr = [];
    let timeObj = {};
    state.blogList.forEach(item => {
      let date = item.createTime;
      let year = new Date(date).getFullYear();
      let month = new Date(date).getMonth() + 1;
      let day = new Date(date).getDate();

      let monthKey = `${year}-${month < 10 ? '0' + month : month}`;
      let dayKey = `${monthKey}-${day < 10 ? '0' + day : day}`;

      let obj = {
        date,
        year,
        month,
        monthKey,
        dayKey,
        data: item
      };
      if (timeObj[monthKey]) {
        if (timeObj[monthKey][dayKey]) {
          timeObj[monthKey][dayKey].push(obj);
        } else {
          timeObj[monthKey][dayKey] = [obj];
        }
      } else {
        timeObj[monthKey] = {};
        timeObj[monthKey][dayKey] = [obj];
      }
    });

    return timeObj;
  },
  g_query_time(state) {
    return state.query.time;
  }
};
const mutations = {
  s_query_tab(state, { tab, createId }) {
    debugger;
    switch (tab) {
      case 1:
        state.query.tab = 1;
        // 搜索所有已读未读的
        state.query.isRead = undefined;
        state.query.createId = undefined;
        break;
      case 2:
        state.query.tab = 2;
        state.query.isRead = 0;
        state.query.createId = undefined;
        break;

      case 3:
        state.query.tab = 3;
        state.query.createId = createId;
        state.query.isRead = undefined;
        break;

      default:
        state.query.tab = 1;
        // 搜索所有已读未读的
        state.query.isRead = undefined;
        state.query.createId = undefined;
    }
  },

  s_query_time(state, time) {
    if (time.length === 2) {
      state.query.time = time;
      state.query.start = new Date(time[0]).getTime();
      state.query.end = new Date(time[1]).getTime();
    } else {
      state.query.time = [];
      state.query.start = undefined;
      state.query.end = undefined;
    }
  }
};

REPORT_QUERY_FORM.forEach(item => {
  if (!getters[`g_query_${item}`]) {
    getters[`g_query_${item}`] = state => {
      return state.query[item];
    };
  }
  if (!mutations[`s_query_${item}`]) {
    mutations[`s_query_${item}`] = (state, val) => {
      state.query[item] = val;
    };
  }
});

REPORT_CREATE_FORM.forEach(item => {
  if (!getters[`g_${item}`]) {
    getters[`g_${item}`] = state => {
      return state.createForm[item];
    };
  }
  if (!mutations[`s_${item}`]) {
    mutations[`s_${item}`] = (state, val) => {
      state.createForm[item] = val;
    };
  }
});

const actions = {
  /**
   * 加载所有的权限数据
   * @author guzhanghua
   * @param {*} { commit, rootState }
   * @returns
   */
  fnCreateReport({ commit, rootState }) {
    let params = pickBy(pick(state.createForm, REPORT_CREATE_FORM), item => {
      if (item == 'id') return false;
      return item;
    });
    return new Promise((resolve, reject) => {
      insertReportAPI(params)
        .then(response => {
          let { respCode, respMsg, result } = response;
          if (respCode !== '0') {
            reject(respMsg);
          }
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * 加载所有的权限数据
   * @author guzhanghua
   * @param {*} { commit, rootState }
   * @returns
   */
  fnSelectReportById({ commit, dispatch, state }, { reportId, vm }) {
    let params = {
      reportId
    };
    return new Promise((resolve, reject) => {
      selectReportByIdAPI(params)
        .then(async response => {
          let { respCode, respMsg, result } = response;
          if (respCode !== '0') {
            reject(respMsg);
          }

          // 判断当前用户是否有权限修改当前日志
          await dispatch(
            'base/user/fnJudgePrivilege',
            { userId: result.createUserId, vm },
            {
              root: true
            }
          );

          // 修改当前的模式为 编辑模式
          state.type = '2';

          // 赋值日志的基本信息

          state.createForm.type = result.type + '';
          state.createForm.content = result.content;
          state.createForm.reportId = result.reportId;

          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /**
   * 报告的条件分页查询
   * @param {*} param0
   * @param {*} payload
   */
  fnLoadSelectReportByPage({ commit, state }, payload) {
    let params = pickBy(pick(state.query, REPORT_QUERY_FORM), item => {
      return item;
    });
    params.page = state.page;
    return new Promise((resolve, reject) => {
      selectReportByPageAPI(params)
        .then(response => {
          let { respCode, respMsg, result } = response;
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }

          state.blogList = result.list;
          resolve(response.result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
export default merge(
  {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
  },
  pageMixins
);
