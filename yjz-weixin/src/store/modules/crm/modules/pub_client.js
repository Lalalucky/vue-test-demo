import * as api from '@/api/crm/client';
import { merge, pickBy, findIndex } from 'lodash';
import pageMixins from '@/store/mixins/page.js';

const state = {
  clientList: []
};
const getters = {
  g_list(state) {
    return state.clientList;
  }
};
const mutations = {};

const actions = {
  /**
   * 分页查询 客户的数据  --- 公海客户查询
   * @param {*} param0
   * @param {*} payload
   */
  selectClientsByPage({ commit, state }, { params = {}, isConcat = false }) {
    let obj = pickBy(params, value => {
      return value;
    });
    obj.page = state.page;
    obj.isPublic = 1;

    return new Promise((resolve, reject) => {
      api
        .selectClientsByPage(obj)
        .then(response => {
          let { respCode, respMsg, result } = response;
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          debugger;
          if (isConcat) {
            state.clientList = state.clientList.concat(response.result.list);
          } else {
            state.clientList = response.result.list;
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
      const date = await dispatch('selectClientsByPage', {
        type: 1,
        isConcat: true
      });

      resolve(date);
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
