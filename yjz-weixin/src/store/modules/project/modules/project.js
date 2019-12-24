import * as api from '@/api/project/project';
import { merge, pick, pickBy } from 'lodash';
import pageMixins from '@/store/mixins/page.js';

const state = {
  projectList: [],
  isResponser: false,
  isParticipant: false,
};
const getters = {
  g_list(state) {
    return state.projectList;
  },
  g_visitList(state) {
    return state.visitList;
  },

  g_isResponser(state) {
    return state.isResponser;
  },
  g_isParticipant(state) {
    return state.isParticipant;
  }
};
const mutations = {
  s_isResponser(state, isResponser) {
    state.isResponser = isResponser;
  },

  s_isParticipant(state, isParticipant) {
    state.isParticipant = isParticipant;
  }
};
const actions = {
  /**
   * 创建一个项目
   * @param {*} param0
   * @param {*} payload
   */
  fnCreateProjectInfo({ commit, state }, payload) {
    // 过滤不可创建和值为空的 key
    //   let params = pickBy(pick(payload, CLIENT_CREATE_LABEL), item => {
    //     if (item == 'id') return false;
    //     return item;
    //   });
    debugger;
    return new Promise((resolve, reject) => {
      api
        .insertProject(payload)
        .then(response => {
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //   查询所有项目
  fnLoadAllClientInfo({ commit, state }) {
    debugger;
    return new Promise((resolve, reject) => {
      api
        .selectAllClient()
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

  //   查询所有用户
  fnLoadAllUsersJob({ commit, state }) {
    debugger;
    return new Promise((resolve, reject) => {
      api
        .selectAllUsers()
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
   * 分页查询 项目的数据
   * @param {*} param0
   * @param {*} payload
   */
  selectProjectsByPage({ commit, state }, { params = {}, isConcat = false }) {
    debugger;
    let obj = pickBy(params, value => {
      return value;
    });
    obj.page = state.page;

    return new Promise((resolve, reject) => {
      api
        .selectProjectsByPage(obj)
        .then(response => {
          let { respCode, respMsg, result } = response;
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          if (isConcat) {
            state.projectList = state.projectList.concat(response.result.list);
          } else {
            state.projectList = response.result.list;
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
   * 加载更多的客户信息  需要跟 selectProjectsByPage 结合使用
   * @param {*} param0
   * @param {*} param1
   */
  fnLoadMore({ state, dispatch }) {
    return new Promise(async (resolve, reject) => {
      if (state.page.currentPage >= state.page.totalPage) {
        reject('没有更多了');
        return;
      }
      state.page.currentPage += 1;
      let params = {
        page: state.page
      };
      const date = await dispatch('selectProjectsByPage', {
        isConcat: true
      });

      resolve(date);
    });
  },
  //根据Id查询项目详情
  fnLoadProjectInfoById({ commit, state }, projectId) {
    return new Promise((resolve, reject) => {
      let obj = {
        projectId: projectId
      };
      api
        .selectProjectById(obj)
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
   * 根据项目的ID去更新项目的信息
   * @param {*} param0
   * @param {*} payload
   */
  fnUpdateProjectInfoById({ commit, state }, payload) {
    debugger;

    let projectId = payload.projectId;
    // if (payload.lastTime) {
    //   payload.lastTime = new Date(payload.lastTime).getTime();
    // }
    return new Promise((resolve, reject) => {
      let obj = {
        ...payload
      };
      api
        .updateProject(obj)
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
   * 删除一个项目数据
   * @param {*} param0
   * @param {*} payload
   */
  fnDeleteProjectById({ commit, state }, payload) {
    debugger;
    // 过滤不可创建和值为空的 key
    let obj = {
      projectId: payload
    };
    return new Promise((resolve, reject) => {
      api
        .deleteProject(obj)
        .then(response => {
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /**
   * 完结一个项目数据
   * @param {*} param0
   * @param {*} payload
   */
  fnCompleteProjectById({ commit, state }, payload) {
    let obj = {
      projectId: payload
    };
    return new Promise((resolve, reject) => {
      api
        .completeProject(obj)
        .then(response => {
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * 创建一个阶段
   * @param {*} param0
   * @param {*} payload
   */
  fnCreateStageInfo({ commit, state }, payload) {
    debugger;
    return new Promise((resolve, reject) => {
      api
        .insertStage(payload)
        .then(response => {
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //  根据项目Id查询阶段
  fnLoadStagesInfoByProjectId({ commit, state }, projectId) {
    return new Promise((resolve, reject) => {
      let obj = {
        projectId: projectId
      };
      api
        .selectStagesByProjectId(obj)
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
  //根据Id查询项目详情
  fnLoadStagesInfoById({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      api
        .selectStagesById(payload)
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
   * 根据项目的ID去更新项目的信息
   */
  fnUpdateStageInfoById({ commit, state }, payload) {
    debugger;

    let projectId = payload.projectId;
    // if (payload.lastTime) {
    //   payload.lastTime = new Date(payload.lastTime).getTime();
    // }
    return new Promise((resolve, reject) => {
      let obj = {
        ...payload
      };
      api
        .updateStage(obj)
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
   * 完结一个项目数据
   * @param {*} param0
   * @param {*} payload
   */
  fnCompleteStageById({ commit, state }, payload) {
    let obj = {
      stageId: payload
    };
    return new Promise((resolve, reject) => {
      api
        .completeStage(obj)
        .then(response => {
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /**
   * 删除一个项目数据
   * @param {*} param0
   * @param {*} payload
   */
  fnDeleteStageById({ commit, state }, payload) {
    debugger;
    // 过滤不可创建和值为空的 key
    let obj = {
      stageId: payload
    };
    return new Promise((resolve, reject) => {
      api
        .deleteStage(obj)
        .then(response => {
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /**
   * 退出阶段
   * @param {*} param0
   * @param {*} payload
   */
  fnQuitStageById({ commit, state }, payload) {
    debugger;
    let obj = {
      stageId: payload
    };
    return new Promise((resolve, reject) => {
      api
        .quitStage(obj)
        .then(response => {
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /**h
   * 合同
   */

  //  根据项目Id查询阶段
  fnLoadAllContract({ commit, state }, projectId) {
    return new Promise((resolve, reject) => {
      let obj = {
        projectId: projectId
      };
      api
        .selectAllContract(obj)
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
  uploadFile({ commit, rootState, state }, params) {
    debugger;
    return new Promise((resolve, reject) => {
      api
        .uploadFile(params)
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
   * 分页查询 拜访的数据
   * @param {*} param0
   * @param {*} payload
   */
  selectProjectVisitByPage({ commit, state }, { params = {}, isConcat = false }) {
    debugger;
    let obj = pickBy(params, value => {
      return value;
    });
    obj.page = state.page;

    return new Promise((resolve, reject) => {
      api
        .selectProjectVisitByPage(obj)
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
   * 加载更多的拜访的数据 需要跟 selectProjectVisitByPage 结合使用
   * @param {*} param0
   * @param {*} param1
   */
  fnLoadMoreVisit({ state, dispatch }) {
    return new Promise(async (resolve, reject) => {
      if (state.page.currentPage >= state.page.totalPage) {
        reject('没有更多了');
        return;
      }
      state.page.currentPage += 1;
      let params = {
        page: state.page
      };
      const date = await dispatch('selectProjectVisitByPage', {
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
