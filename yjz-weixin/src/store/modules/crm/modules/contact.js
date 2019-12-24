import * as api from '@/api/crm/contact';
import { merge, findIndex, pickBy, pick } from 'lodash';
import pageMixins from '@/store/mixins/page.js';

export const CONTACT_MODIFY_LABEL = [
  'address',
  'appellation',
  'birthTime',
  'business',
  'clientId',
  'clientName',
  'createTime',
  'createUserid',
  'department',
  'email',
  'fox',
  'hobby',
  'id',
  'idNumber',
  'identity',
  'job',
  'kind',
  'msnQq',
  'name',
  'phone',
  'photo',
  'post',
  'remark',
  'remark1',
  'remark2',
  'sex',
  'telephone',
  'type',
  'updateTime',
  'updateUserid',
  'wangwang'
];

const state = {
  contactList: []
};
const getters = {
  g_contactList(state) {
    return state.contactList;
  }
};
const mutations = {};

const actions = {
  /***********************************
   ************ 联系人  ***************
   ***********************************/

  fnLoadContactInfoById({ commit, state }, contactId) {
    let obj = {
      contactId
    };
    return new Promise((resolve, reject) => {
      api
        .selectContactById(obj)
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
  fnUpdateContact({ commit, state }, payload) {
    let obj = {
      ...payload
    };
    return new Promise((resolve, reject) => {
      api
        .updateContact(obj)
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
  fnCreateContact({ commit, state }, payload) {
    // 过滤不可创建和值为空的 key
    let params = pickBy(pick(payload, CONTACT_MODIFY_LABEL), item => {
      if (item == 'id') return false;
      return item;
    });

    return new Promise((resolve, reject) => {
      api
        .insertContact(params)
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
   * 根据客户ID查询此客户下的联系人数据  -- 不需要分页
   * @param {*} param0
   * @param {*} payload
   */
  selectContantsByPage({ commit, state }, clientId) {
    let obj = {
      clinetId: clientId
    };
    return new Promise((resolve, reject) => {
      api
        .selectContactByClientId(obj)
        .then(response => {
          let { respCode, respMsg, result } = response;
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
          state.contactList = response.result;

          resolve(response.result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * 删除联系人接口
   * @param {*} param0
   * @param {*} contactId    联系人的ID
   */
  fnDeleteContact({ commit, state }, contactId) {
    let obj = {
      contactId
    };
    return new Promise((resolve, reject) => {
      api
        .deleteContact(obj)
        .then(response => {
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }

          // 查询删除的联系人下标
          const findIndexOfClient = findIndex(state.contactList, item => {
            return item.id === contactId;
          });
          // 如果找到删除联系人的下标  就在数组中移除此联系人数据
          if (findIndexOfClient > -1) {
            state.contactList.splice(findIndexOfClient, 1);
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
