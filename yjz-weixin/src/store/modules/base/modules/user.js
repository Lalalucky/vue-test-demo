import { getUserInfoBySidAPI, loadUserBasinfoByIdAPI, loadUserRoleInfoByIdAPI } from '@/api/user/user';
// import cookies from '@/utils/cookies.js';
import { setCookies, getCookies, remove } from '@/utils/cookies.js';
import _ from 'lodash';

/**************************************************
 * 跟当前登录用户有关的数据都在此处设置。
 * 包含
 * -- 用户的基本信息
 * -- 用户登录的 sid
 *
 **************************************************/

// 用户基本信息字段
const USER_BASE_INFO = [
  `userId`,
  // 工号
  'workCard',
  // 用户名
  'userName',
  // 密码
  'password',
  // 昵称
  'nickName',
  // 头像
  'avator',
  // 用户的状态  0-正常 1-离职 2-注销
  'status',
  'phone',
  'email',
  'entrydate',
  'duty',
  'department',
  'depTree',
  'photo'
];

let sid = getCookies('sid') || '';

const translateArrToObj = arr => {
  let obj = {};
  arr.forEach(item => {
    obj[item] = '';
  });
  return obj;
};

const cacheUserBasicInfo = {};

const state = {
  // 初始化从cookie中获取用户的sid 数据
  sid: sid,
  info: {
    ...translateArrToObj(USER_BASE_INFO)
  }
};
const getters = {
  g_sid(state) {
    return state.sid;
  },
  g_userId(state) {
    return state.info.userId;
  },
  g_userName(state) {
    return state.info.userName;
  },
  g_nickName(state) {
    return state.info.nickName;
  },
  g_avator(state) {
    return state.info.avator;
  },
  g_duty(state) {
    return state.info.duty;
  },
  g_userinfo(state) {
    if (state.info) {
      return state.info;
    }
    let cookieUserInfo = getCookies('user');
    if (cookieUserInfo && state.sid) {
      // 通过指定
      return cookieUserInfo.info;
    }
  },
  /**
   * 获取当前用户的 部门字符串
   * @returns String   ‘市场部 -- 一级销售部1 -- 二级销售部1’
   * @param {*} state
   */
  g_userDepartmentStr(state) {
    let departStr = '';
    let translatorTreeToString = obj => {
      departStr += ` -- ${obj.name}`;
      if (obj.child) {
        translatorTreeToString(obj.child);
      }
    };
    if (state.info) {
      let { depTree } = state.info;
      // 修复 depTree 为null 的情况
      if (!depTree) {
        return '';
      }
      translatorTreeToString(depTree);
      return departStr.replace(/ \-\- /, '');
    } else {
      return '';
    }
  }
};

const mutations = {
  // 设置登录的SID数据
  s_sid(state, sid) {
    state.sid = sid;
    setCookies('sid', sid);
  },
  // 此处设置用户的基本信息
  s_user(state, user) {

    if (user) {
      // 只能设置指定字段的用户信息
      state.info = _.pick(user, USER_BASE_INFO);
      // 将用户的信息保存到cookies中
      setCookies('user', {
        sid: state.sid,
        info: user
      });
    } else {
      state.info = {
        ...translateArrToObj(USER_BASE_INFO)
      };
    }
  }
};

const actions = {
  /**
   * 用户登录以后 初始化加载 系统数据 包含：
   * -- 用户的基本信息
   * -- 用户的页面权限
   * @param {*} param0
   */
  load({ state, dispatch }) {
    let params = {
      // token: state.token
    };
    return new Promise(async resolve => {
      await dispatch(
        'base/user/fnLoadUserBasicInfo',
        {},
        {
          root: true
        }
      );
      // await dispatch(
      //   'base/menu/fnGenerateRoutes',
      //   {},
      //   {
      //     root: true
      //   }
      // );
      resolve();
    });
  },
  /**
   * 移除用户的基本数据
   */
  destroy({ state, dispatch }) {
    return new Promise(async resolve => {
      // 清除用户的基本信息
      state.sid = '';
      state.info = {
        ...translateArrToObj(USER_BASE_INFO)
      };

      // cookie中关键数据移除
      remove('sid');
      remove('user');
      resolve();
    });
  },
  fnLoadUserBasicInfo({ commit, state }, userId) {
    return new Promise((resolve, reject) => {
      let params = {};
      getUserInfoBySidAPI(params)
        .then(response => {
          if (response.respCode != '0') {
            reject(response.respMsg);
          }
          let result = response.result;
          // 将用户的基本信息保存
          commit('s_user', result);
          resolve(response.result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * 根据ID获取用户的基本信息
   * @param {*} param0
   * @param {*} userId
   */
  fnLoadUserBasicInfoById({ commit, state }, userId) {
    return new Promise((resolve, reject) => {
      let params = {
        userId
      };
      loadUserBasinfoByIdAPI(params)
        .then(response => {
          if (response.respCode != '0') {
            reject(response.respMsg);
          }
          let result = response.result;

          resolve(response.result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  set({ state, dispatch }, info) {
    return new Promise(async resolve => {
      // store 赋值
      state.info = {
        ...USER_BASE_INFO,
        ...info
      };
      // 持久化
      await dispatch(
        'base/db/set',
        {
          dbName: 'sys',
          path: 'user.info',
          value: info,
          user: true
        },
        { root: true }
      );
      // end
      resolve();
    });
  },

  fnJudgePrivilege({ state }, { userId, vm }) {
    return new Promise((resolve, reject) => {
      if (state.info.userId === userId) {
        resolve(true);
      } else {
        vm.$router.push('/500');
        reject(true);
      }
    });
  }
};

// 导出用户
export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
