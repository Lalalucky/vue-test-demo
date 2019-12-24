import { getAllNews } from '@/api/user/news';
import { getAllMeet } from '@/api/user/agenda';
import { getAllNotice } from '@/api/user/notice';

export default {
  namespaced: true,
  state: {
    newsList: [],
    meetList: [],
    noticeList: []
  },

  getters: {
    g_newsList(state) {
      state.newsList.forEach(news => {
        news.img = news.newsPic;
        news.title = news.newsTitle;
        news.url = `/home/detail/1/${news.newsId}`;
      });

      return state.newsList;
    }
  },
  actions: {
    fnLoadAllNews({ state, dispatch }) {
      // 通过AES对称加密 对用户名和密码进行加密
      let params = {
        page: {
          currentPage: 1,
          pageNumber: 10
        }
      };
      return new Promise((resolve, reject) => {
        getAllNews(params)
          .then(response => {
            debugger;
            if (response.respCode !== '0') {
              // 登录失败处理
              reject(response);
              return;
            }
            state.newsList = response.result.list;
            resolve(response.result.list);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    fnLoadAllMeet({ state, dispatch }) {
      // 通过AES对称加密 对用户名和密码进行加密
      let params = {
        page: {
          currentPage: 1,
          pageNumber: 10
        }
      };
      return new Promise((resolve, reject) => {
        getAllMeet(params)
          .then(response => {
            debugger;
            if (response.respCode !== '0') {
              // 登录失败处理
              reject(response);
              return;
            }
            state.meetList = response.result.list;
            resolve(response.result.list);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    fnLoadAllNotice({ state, dispatch }) {
      // 通过AES对称加密 对用户名和密码进行加密
      let params = {
        page: {
          currentPage: 1,
          pageNumber: 10
        }
      };
      return new Promise((resolve, reject) => {
        getAllNotice(params)
          .then(response => {
            debugger;
            if (response.respCode !== '0') {
              // 登录失败处理
              reject(response);
              return;
            }
            state.noticeList = response.result.list;
            resolve(response.result.list);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
