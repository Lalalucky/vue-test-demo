import { merge } from 'lodash';
import pageMixins from '@/store/mixins/page.js';

import * as api from '@/api/user/user.js';

import * as util from '@/utils/index.js';
import { formatTime } from '@/utils/date.js';

function cached(fn) {
  // 首先其穿件一个空的对象{}
  const cache = Object.create(null);
  // 返回一个函数 当入参 camelize('my-name')
  return function cachedFn(str) {
    // 以入参为key 获取缓存对象上是否存在
    const hit = cache[str];
    // 存在则返回 没有则执行函数并且将其结果作为新的一个属性值

    return hit ? new Promise((resolve, reject) => resolve(hit)) : (cache[str] = fn(str));
  };
}
export const userBasicInfo = cached(userId => {
  return new Promise((resolve, reject) => {
    api.getUserBasicInfo({
        userId
      })
      .then(response => {
        if (response.respCode != '0') {
          reject(response);
        }
        resolve(response.result);
      })
      .catch(error => {
        reject(error);
      });
  });
});

export default merge(
  {
    namespaced: true,
    state: {
      // 查询的用户数据
      userList: [],

      queryForm: {
        queryUserName: '',
        dimission: 0, //在职还是离职
        userIsparttime: 0 //兼职或非兼职
      },

      ownAndSubUserList: []
    },
    getters: {
      g_userList: state => {
        return state.userList;
      },

      page: state => {
        return state.page;
      },
      userInfo: state => {
        return state.userInfo;
      },
      //当前页
      currentPage: state => {
        return state.page.currentPage;
      },
      // 数据总数
      totalNumber: state => {
        return state.page.totalNumber;
      },
      //分页--一页条数
      pageNumber: state => {
        return state.page.pageNumber;
      },
      //查询条件 -- 用户名称
      queryUserName: state => {
        return state.queryForm.queryUserName;
      },
      //查询条件 -- 用户名称
      queryDimission: state => {
        return state.queryForm.dimission;
      },
      //查询条件 -- 兼职
      g_qUserIsparttime: state => {
        return state.queryForm.userIsparttime;
      }
    },
    mutations: {
      //设置员工数据
      s_userList: (state, userList) => {
        state.userList = [...userList];
      },
      // 设置查询条件 -- 用户名称
      setQueryUserName: (state, queryUserName) => {
        state.queryForm.queryUserName = queryUserName;
      },
      // 设置查询条件 -- 在职还是离职
      setQueryDimission: (state, dimission) => {
        state.queryForm.dimission = dimission;
      },
      s_qUserIsparttime: (state, userIsparttime) => {
        state.queryForm.userIsparttime = userIsparttime;
      },
      setPage: (state, page) => {
        state.page = Object.assign({}, state.page, page);
      },
      // 设置当前页
      updateCurrentPage: (state, currentPage) => {
        state.page.currentPage = currentPage > 0 ? currentPage : 1;
      },

      RESET_USERINFO: state => {
        state.userInfo = Object.assign({}, state.resetUserInfo);
      },

      s_staffAllList: (state, staffAllList) => {
        state.staffAllList = [...staffAllList];
      },

      s_userName: (state, userName) => {
        state.userInfo.userName = userName;
      },
      s_id: (state, id) => {
        state.userInfo.id = id;
      },
      s_userUsername: (state, userUsername) => {
        state.userInfo.userUsername = userUsername;
      },
      s_userPhone: (state, userPhone) => {
        state.userInfo.userPhone = userPhone;
      },
      s_userEmail: (state, userEmail) => {
        state.userInfo.userEmail = userEmail;
      },
      s_userAge: (state, userAge) => {
        state.userInfo.userAge = userAge;
      },
      s_userEdu: (state, userEdu) => {
        state.userInfo.userEdu = userEdu;
      },
      s_userSchool: (state, userSchool) => {
        state.userInfo.userSchool = userSchool;
      },
      s_userEntrydate: (state, userEntrydate) => {
        state.userInfo.userEntrydate = userEntrydate;
      },
      s_userDuty: (state, userDuty) => {
        state.userInfo.userDuty = userDuty;
      },
      s_userDepartment: (state, userDepartment) => {
        state.userInfo.userDepartment = userDepartment;
      },
      s_userSalay: (state, userSalay) => {
        state.userInfo.userSalay = userSalay;
      },
      s_userDimission: (state, userDimission) => {
        state.userInfo.userDimission = userDimission;
      },
      s_userSex: (state, userSex) => {
        state.userInfo.userSex = userSex;
      },
      s_userNation: (state, userNation) => {
        state.userInfo.userNation = userNation;
      },
      s_userIdcard: (state, userIdcard) => {
        state.userInfo.userIdcard = userIdcard;
      },
      s_userHousehold: (state, userHousehold) => {
        state.userInfo.userHousehold = userHousehold;
      },
      s_userHousecode: (state, userHousecode) => {
        state.userInfo.userHousecode = userHousecode;
      },

      s_userAddress: (state, userAddress) => {
        state.userInfo.userAddress = userAddress;
      },
      s_userAddresscode: (state, userAddresscode) => {
        state.userInfo.userAddresscode = userAddresscode;
      },
      s_userContentname: (state, userContentname) => {
        state.userInfo.userContentname = userContentname;
      },
      s_userContentphone: (state, userContentphone) => {
        state.userInfo.userContentphone = userContentphone;
      },
      s_userMajor: (state, userMajor) => {
        state.userInfo.userMajor = userMajor;
      },
      s_userGradudate: (state, userGradudate) => {
        state.userInfo.userGradudate = userGradudate;
      },
      s_userSocial: (state, userSocial) => {
        state.userInfo.userSocial = userSocial;
      },
      s_userProvident: (state, userProvident) => {
        state.userInfo.userProvident = userProvident;
      },
      s_userWorkdate: (state, userWorkdate) => {
        state.userInfo.userWorkdate = userWorkdate;
      },
      s_userRegulardate: (state, userRegulardate) => {
        state.userInfo.userRegulardate = userRegulardate;
      },
      s_userAvator: (state, userAvator) => {
        state.userInfo.userAvator = userAvator;
      },
      s_userIsparttime: (state, userIsparttime) => {
        state.userInfo.userIsparttime = userIsparttime;
      },

      SET_STAFFINFO: (state, userInfo) => {
        state.userInfo = Object.assign({}, state.resetUserInfo, userInfo);
        state.userInfo = Object.assign({}, state.resetUserInfo, userInfo);
        state.userInfo.userNation = userInfo.userNation ? userInfo.userNation + '' : '1';
        state.userInfo.userEdu = userInfo.userEdu ? userInfo.userEdu + '' : '4';
        state.userInfo.userSex = userInfo.userSex ? userInfo.userSex + '' : '0';
        state.userInfo.userEntrydate = userInfo.userEntrydate ? formatTime(userInfo.userEntrydate) : '';
        state.userInfo.userGradudate = userInfo.userGradudate ? formatTime(userInfo.userGradudate) : '';
        state.userInfo.userWorkdate = userInfo.userWorkdate ? formatTime(userInfo.userWorkdate) : '';
        state.userInfo.userRegulardate = userInfo.userRegulardate ? formatTime(userInfo.userRegulardate) : '';

        state.oldUserInfo = Object.assign({}, state.userInfo);
      }
    },

    actions: {
      loadAllUserList({ commit, rootState, state }) {
        return new Promise((resolve, reject) => {
          api
            .loadAllUserList()
            .then(response => {
              if (response.respCode != '0') {
                reject(response);
              }
              commit('s_staffAllList', response.result);

              resolve(response.result);
            })
            .catch(error => {
              reject(error);
            });
        });
      },

      fnLoadAllUserContainJobAndDept({ commit, rootState, state }) {
        return new Promise((resolve, reject) => {
          api
            .loadAllUserContainJobAndDept()
            .then(response => {
              if (response.respCode != '0') {
                reject(response);
              }
              resolve(response.result);
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      /**
       * 查询自己即下属员工
       * @param {*} param0
       */
      fnLoadOwnAndSubUserList({ commit, rootState, state }, userId) {
        return new Promise((resolve, reject) => {
          api
            .loadUserAndSubUserAPI()
            .then(response => {
              if (response.respCode != '0') {
                reject(response);
              }

              state.ownAndSubUserList = response.result;
              resolve(response.result);
            })
            .catch(error => {
              reject(error);
            });
        });
      },

      /**
       * 分页查询用户数据
       *
       */
      fnLoadUserListByPage({ commit, rootState, state }) {
        return new Promise((resolve, reject) => {
          api
            .postStaffList({
              userDimission: state.queryForm.dimission,
              userName: state.queryForm.queryUserName,
              userIsparttime: state.queryForm.userIsparttime,
              page: state.page
            })
            .then(response => {
              if (response.respCode != '0') {
                reject(response);
              }

              // 保存用户的数据
              commit('s_userList', response.result.list);
              commit('setPage', response.result.page);
              resolve(response.result);
            })
            .catch(error => {
              reject(error);
            });
        });
      },



      resetForm({ commit, rootState }) {
        return new Promise((resolve, reject) => {
          commit('RESET_USERINFO');
          resolve();
        });
      },
// 根据id查询用户详情
      getStaffInfoById({ commit, rootState, state }, id) {
        debugger;
        return new Promise((resolve, reject) => {
          api
            .loadUserDetailInfoByIdAPI({
              userId: id
            })
            .then(response => {
              if (response.respCode != '0') {
                reject(response);
              }
              commit('s_userList', response.result);
              resolve(response.result);
              console.log(response.result,"details")
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      // 
      uploadUserImage({ commit, rootState, state },params){
        debugger;
        return new Promise((resolve, reject) => {
          api
            .uploadPicAPI(params)
            .then(response => {
              if (response.respCode != '0') {
                reject(response);
              }
              resolve(response.result);
    
            })
            .catch(error => {
              reject(error);
            });
        });
      },

      // 确认更新用户详细信息
      updateUserDetail({ commit, rootState, state }, payload){
        debugger;
        let obj = {
          ...payload
        };
        return new Promise((resolve, reject) => {
          api
            .updateUserDetailInfoAPI(obj)
            .then(response => {
              if (response.respCode != '0') {
                reject(response);
              }
              resolve(response.result);
    
            })
            .catch(error => {
              reject(error);
            });
        });
      },
      // 确认更新用户信息
      updateUserInfo({ commit, rootState, state }, payload){
        debugger;
        let obj = {
          ...payload
        };
        return new Promise((resolve, reject) => {
          api
            .updateUserBasicInfoAPI(obj)
            .then(response => {
              if (response.respCode != '0') {
                reject(response);
              }
              resolve(response.result);
    
            })
            .catch(error => {
              reject(error);
            });
        });
      }
    }
  },
  pageMixins
);
