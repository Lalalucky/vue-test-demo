import { merge } from 'lodash';
import pageMixins from '@/store/mixins/page.js';

import { getAllNews } from '@/api/user/news';
import { getAllMeet } from '@/api/user/agenda';
import { getAllNotice } from '@/api/user/notice';

const state = {
  list: [],
  type: '1',
  page: {
    pageNumber: 5
  }
};
const getters = {
  g_list(state) {
    state.list.forEach(item => {
      switch (state.type) {
        case '1':
          item.id = item.newsId;
          item.time = item.createTime;
          item.title = item.newsTitle;
          item.intro = item.subTitle;
          item.content = item.newsContent;
          item.createName = item.depName;
          break;
        case '2':
          item.id = item.meetId;
          item.time = item.createTime;
          item.title = item.meetTitle;
          item.intro = item.meetIntro;
          item.content = item.meetAbstract;
          item.createName = item.depName;
          break;
        case '3':
          item.id = item.noticeId;
          item.time = item.createTime;
          item.title = item.noticeTitle;
          item.intro = item.subTitle;
          item.content = item.noticeContent;
          item.createName = item.depName;
          break;

        default:
          break;
      }
    });

    return state.list;
  }
};
const mutations = {
  s_type(state, type) {
    state.type = type;
  }
};
const actions = {
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
      const date = await dispatch('fnLoadAllNews', {
        type: 1,
        isConcat: true
      });

      resolve(date);
    });
  },

  fnLoadAllNews({ state, dispatch }, { type = 1, isConcat = false }) {
    // 通过AES对称加密 对用户名和密码进行加密
    let params = {
      page: state.page
    };
    return new Promise((resolve, reject) => {
      let api = null;
      switch (type) {
        case '1':
          api = getAllNews;
          break;
        case '2':
          api = getAllMeet;
          break;
        case '3':
          api = getAllNotice;
          break;

        default:
          api = getAllNews;
          break;
      }

      api(params)
        .then(response => {
          if (response.respCode !== '0') {
            // 登录失败处理
            reject(response);
            return;
          }
          debugger;
          if (isConcat) {
            state.list = state.list.concat(response.result.list);
          } else {
            state.list = response.result.list;
          }

          state.page = response.result.page;
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
  state,
  getters,
  mutations,
  actions
});
