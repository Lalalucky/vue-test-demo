import { selectOwnVisitByPage, selectVisitById } from '@/api/crm/crm.js';
import { merge, findIndex } from 'lodash';
import pageMixins from '@/store/mixins/page.js';

/***********************************
 ************ 拜访记录  ***************
 ***********************************/

export const CONTACT_MODIFY_LABEL = [];

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
  /**
   * 分页查询 客户的数据
   * @param {*} param0
   * @param {*} payload
   */
  selectVisitsByPage({ commit, state }, { isConcat = false }) {
    let obj = {
      page: state.page
    };
    return new Promise((resolve, reject) => {
      selectOwnVisitByPage(obj)
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

  fnLoadMore({ state, dispatch }, { type = 1 }) {
    return new Promise(async (resolve, reject) => {
      if (state.page.currentPage >= state.page.totalPage) {
        reject('没有更多了');
        return;
      }
      state.page.currentPage += 1;
      let params = {
        page: state.page
      };
      const date = await dispatch('selectVisitsByPage', {
        type: 1,
        isConcat: true
      });

      resolve(date);
    });
  },
  /**
   *  加载当前客户的拜访记录
   * @param {*} param0
   * @param {*} param1
   */
  fnLoadVisits({ commit, state }, visitId) {
    let obj = {
      visitId
    };
    return new Promise((resolve, reject) => {
      selectVisitById(obj)
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
  }
};

export default merge(pageMixins, {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});
