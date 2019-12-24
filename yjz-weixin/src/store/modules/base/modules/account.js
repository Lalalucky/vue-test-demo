import { loginAPI, logoutAPI } from '@/api/user/login';

import cookies from '@/utils/cookies.js';

import { Encrypt } from '@/utils/secret.js';

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     * @param {Object} param route {Object} 登录成功后定向的路由对象
     */
    LoginByUser({ commit, dispatch }, { openId, userName, userPass, vm, router }) {
      // 通过AES对称加密 对用户名和密码进行加密
      let params = {
        userName: Encrypt(userName.trim()),
        userPasswd: Encrypt(userPass.trim()),
        openId: openId
      };
      return new Promise(async (resolve, reject) => {
        loginAPI(params)
          .then(async response => {
            console.log(response);
            if (response.respCode !== '0') {
              // 登录失败处理
              reject(response);
              return;
            }

            const { parentColumns, sid, user } = response.result;
            debugger;
            // 保存SID数据
            commit('base/user/s_sid', sid, {
              root: true
            });

            resolve(response.result);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     * @description 用户推出系统
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     * @param {Object} param route {Object} 登录成功后定向的路由对象
     */
    logOut({ commit, dispatch }, { vm, router }) {
      return new Promise(async (resolve, reject) => {
        logoutAPI({})
          .then(async response => {
            const { respCode, respMsg, result } = response;
            if (respCode !== '0') {
              // 登录失败处理
              reject(response);
              return;
            }

            // 清除用户的登录数据
            await dispatch(
              'base/user/destroy',
              {},
              {
                root: true
              }
            );
            // 移除用户的菜单权限
            await dispatch(
              'base/menu/destroy',
              {},
              {
                root: true
              }
            );

            // 跳转到登录页面
            if (router) {
              router.push({
                path: '/login'
              });
            }
            resolve(response.result);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
