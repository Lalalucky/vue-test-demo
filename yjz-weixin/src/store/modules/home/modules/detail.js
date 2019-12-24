import { getEveryNews } from '@/api/user/news';
import { getEveryMeet } from '@/api/user/agenda';
import { getEveryNotice } from '@/api/user/notice';

export default {
  namespaced: true,
  state: {
    title: '',
    time: '',
    content: '',
    createName: ''
  },

  getters: {},
  actions: {
    fnLoadArticleDetail({ state, dispatch }, { type = 1, id = undefined }) {
      return new Promise(async (resolve, reject) => {
        debugger;
        switch (type) {
          case '1':
            await dispatch('fnLoadNewsDetail', id).then(data => {
              resolve(data);
            });
            break;
          case '2':
            await dispatch('fnLoadMeetDetail', id).then(data => {
              resolve(data);
            });
            break;
          case '3':
            await dispatch('fnLoadNoticeDetail', id).then(data => {
              resolve(data);
            });
            break;
          default:
            reject('type类型错误');
            break;
        }
      });
    },

    fnLoadNewsDetail({ state, dispatch }, newsId) {
      // 通过AES对称加密 对用户名和密码进行加密
      let params = {
        newsId
      };
      return new Promise((resolve, reject) => {
        getEveryNews(params)
          .then(response => {
            let { respCode, respMsg, result } = response;
            if (respCode !== '0') {
              // 登录失败处理
              reject(respMsg);
              return;
            }

            state.title = result.newsTitle;
            state.time = result.createTime;
            state.content = result.newsContent;
            state.createName = result.depName;
            resolve(response.result);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fnLoadMeetDetail({ state, dispatch }, meetId) {
      // 通过AES对称加密 对用户名和密码进行加密
      let params = {
        meetId
      };
      return new Promise((resolve, reject) => {
        getEveryMeet(params)
          .then(response => {
            let { respCode, respMsg, result } = response;
            if (respCode !== '0') {
              // 登录失败处理
              reject(respMsg);
              return;
            }
            state.title = result.meetTitle;
            state.time = result.createTime;
            state.content = result.meetAbstract;
            state.createName = result.createName;

            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fnLoadNoticeDetail({ state, dispatch }, noticeId) {
      // 通过AES对称加密 对用户名和密码进行加密
      let params = {
        noticeId
      };
      return new Promise((resolve, reject) => {
        getEveryNotice(params)
          .then(response => {
            let { respCode, respMsg, result } = response;
            if (respCode !== '0') {
              // 登录失败处理
              reject(respMsg);
              return;
            }
            state.title = result.noticeTitle;
            state.time = result.createTime;
            state.content = result.noticeContent;
            state.createName = result.depName;
            resolve(response.result);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
