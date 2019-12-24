import { queryActivityByPage } from '@/api/examples/table.js';

import { merge } from 'lodash';
import pageMixins from '@/store/mixins/page.js';

export default merge(
  {
    namespaced: true,
    state: {
      query: {
        name: '',
        status: []
      },
      list: [],
      isLoading: false
    },
    getters: {
      g_query(state) {
        return state.query;
      },
      g_name(state) {
        return state.query.name;
      },
      g_status(state) {
        return state.query.status;
      }
    },
    mutations: {
      s_qQuery(state, query) {
        state.query = {
          ...state.query,
          query
        };
      },
      s_qname(state, name) {
        state.query.name = name;
      },
      s_qStatus(state, status) {
        state.query.status = status || [];
      }
    },
    actions: {
      loadActivityListByPage({ commit, dispatch, state }) {
        state.loading = true;
        let params = {
          status: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          page: state.page,
          name: ''
        };
        return new Promise(async (resolve, reject) => {
          queryActivityByPage(params)
            .then(resp => {
              state.loading = false;
              if (resp.respCode !== '0') {
                reject(`${resp.respMsg}`);
                return;
              }

              let { result } = resp;
              state.page = {
                ...state.page,
                ...result.page
              };
              state.list = result.list || [];
              resolve(resp);
            })
            .catch(error => {
              state.loading = false;
             
            });
        });
      },
      reloadActivityByPage({ commit, dispatch, state }, { currentPage }) {
        if (currentPage) {
          state.page.currentPage = currentPage;
        } else {
          state.page.currentPage = 1;
        }

        return new Promise(async (resolve, reject) => {
          await dispatch('loadActivityListByPage');
        });
      }
    }
  },
  pageMixins
);
