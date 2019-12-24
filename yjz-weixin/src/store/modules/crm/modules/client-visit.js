import * as api from '@/api/crm/client';
import { merge, findIndex, pickBy, pick } from 'lodash';
import pageMixins from '@/store/mixins/page.js';

const VISIT_INSET_LABEL = ['clientId', 'purpose', 'content', 'remark', 'nextTime', 'nextPurpose', 'visitTime'];

const state = {
  visitList: []
};
const getters = {
  g_visitList(state) {
    return state.visitList;
  }
};
const mutations = {};

const actions = {
  /***********************************
   ************ 客户的拜访记录  ********
   ***********************************/
  /**
   * 添加一个拜访记录信息
   * @param {*} param0
   * @param {*} payload
   */
  fnCreateClientVisit({ commit, state }, payload) {
    // 过滤不可创建和值为空的 key
    let params = pickBy(pick(payload, VISIT_INSET_LABEL), item => {
      if (item == 'id') return false;
      return item;
    });
    // 将拜访时间转换成毫秒数
    if (params.visitTime) {
      params.visitTime = new Date(params.visitTime).getTime();
    }

    return new Promise((resolve, reject) => {
      api
        .insertVisit(params)
        .then(response => {
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          resolve(response.result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * 根据客户ID查询此客户下的客户拜访记录数据
   * @param {*} param0
   * @param {*} payload
   */
  selectClientVisitByPage({ commit, state }, { params = {}, isConcat = false }) {
    let obj = pickBy(params, value => {
      return value;
    });
    obj.page = {
      ...state.page,
      pageNumber: 10
    };
    return new Promise((resolve, reject) => {
      api
        .selectVisitByPage(obj)
        .then(response => {
          let { respCode, respMsg, result } = response;
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          if (isConcat) {
            state.visitList = state.visitList.concat(response.result.list);
          } else {
            state.visitList = response.result.list;
          }
          state.page = response.result.page;
          resolve(response.result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * 加载更多的 客户拜访记录
   * @param {*} param0
   * @param {*} clientId   -- 客户的ID
   */
  fnLoadMoreVisit({ state, dispatch }, { clientId, type = 1 }) {
    return new Promise(async (resolve, reject) => {
      if (state.page.currentPage >= state.page.totalPage) {
        reject('没有更多了');
        return;
      }
      state.page.currentPage += 1;
      let params = {
        page: state.page
      };
      const date = await dispatch('selectClientVisitByPage', {
        params: {
          clientId: clientId
        },
        isConcat: true
      });

      resolve(date);
    });
  }
};

export default merge(pageMixins, {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});
