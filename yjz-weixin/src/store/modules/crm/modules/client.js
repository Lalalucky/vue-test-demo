import * as api from '@/api/crm/client';
import { merge, pick, pickBy } from 'lodash';
import pageMixins from '@/store/mixins/page.js';
const CLIENT_ALL_LABEL = [
  `name`,
  // '客户名称',
  `userId`,
  // '客户负责人id',
  `relation`,
  // '客户的关系:经销商、商超、A类客户、无返利客户、密切、较好、一般、较差',
  `stage`,
  // '客户阶段：售前跟踪、合同执行、售后服务、合同期满',
  `type`,
  // '客户类型：潜在客户、普通客户、vip客户、代理商、合作伙伴、失效客户',
  `source`,
  // '客户来源：独立开发、广告推广、客户介绍、促销活动、电话来访、公开招标、互联网、老客户、合作伙伴、代理商',
  `rank`,
  // '客户等级：一星级、二星级、三星级、四星级、五星级',
  `lastTime`,
  // '最后一次跟进时间时间',
  `isHot`,
  // '是否热点客户',
  `remark`,
  // '备注',
  `contactName`,
  // '客户联系人',
  `telephone`,
  // '电话',
  `phone`,
  // '手机',
  `email`,
  // '邮箱',
  `msnQq`,
  // 'MSN/QQ',
  `fox`,
  // '传真',
  `post`,
  // '邮编',
  `business`,
  // '客户行业:金融、电子、冶金、重工业、轻工业',
  `staffSize`,
  // '员工规模:少于20人、20-99人、100-499人、500-1000人、1000-9999人',
  `address`,
  // '客户详细地址',
  `route`,
  // '乘车路线',
  `province`,
  // '省',
  `city`,
  // '市',
  `county`,
  // '县',
  `url`,
  // '客户公司网站',
  `des`,
  // '行业描述',
  `recCountry`,
  // '收货国家',
  `recCity`,
  // '收货城市',
  `recAddress`,
  // '收货地址',
  `payAddress`,
  // '付款地址',
  `openBank`,
  // '开户行',
  `openMan`,
  // '开户人',
  `bankNo`,
  // '银行账号',
  `creditLine`
  // '信用额度：高、中、低',
];

/**
 * 联系人可修改的字段
 */
export const CLIENT_MODIFY_LABEL = [...CLIENT_ALL_LABEL, `id`];

/**
 * 联系人创建时可提供的字段
 */
export const CLIENT_CREATE_LABEL = [...CLIENT_ALL_LABEL];

/**
 * 联系人可展示的字段
 */
export const CLIENT_SHOW_LABEL = [
  ...CLIENT_ALL_LABEL,
  // 负责人的基本信息
  'userInfo',

  `createTime`,
  // '创建时间',
  `createUserid`,
  // 负责人的基本信息
  'createInfo',
  // '创建人id',
  `isPublic`,
  // '是否是公海池客户',
  `updateUserid`,
  // 负责人的基本信息
  'updateInfo',
  // '最后更新人id',
  `updateTime`
  // '更新时间',
];
// 联系人初始化的字段
export const CLIENT_DEFAULT_OBJ = {
  name: '',
  // '客户名称',
  userId: '',
  // '客户负责人id',
  relation: '',
  // '客户的关系:经销商、商超、A类客户、无返利客户、密切、较好、一般、较差',
  stage: '',
  // '客户阶段：售前跟踪、合同执行、售后服务、合同期满',
  type: '',
  // '客户类型：潜在客户、普通客户、vip客户、代理商、合作伙伴、失效客户',
  source: '',
  // '客户来源：独立开发、广告推广、客户介绍、促销活动、电话来访、公开招标、互联网、老客户、合作伙伴、代理商',
  rank: '',
  // '客户等级：一星级、二星级、三星级、四星级、五星级',
  lastTime: '',
  // '最后一次跟进时间时间',
  isHot: '',
  // '是否热点客户',
  remark: '',
  // '备注',
  contactName: '',
  // '客户联系人',
  telephone: '',
  // '电话',
  phone: '',
  // '手机',
  email: '',
  // '邮箱',
  msnQq: '',
  // 'MSN/QQ',
  fox: '',
  // '传真',
  post: '',
  // '邮编',
  business: '',
  // '客户行业:金融、电子、冶金、重工业、轻工业',
  staffSize: '',
  // '员工规模:少于20人、20-99人、100-499人、500-1000人、1000-9999人',
  address: '',
  // '客户详细地址',
  route: '',
  // '乘车路线',
  province: '',
  // '省',
  city: '',
  // '市',
  county: '',
  // '县',
  url: '',
  // '客户公司网站',
  des: '',
  // '行业描述',
  recCountry: '',
  // '收货国家',
  recCity: '',
  // '收货城市',
  recAddress: '',
  // '收货地址',
  payAddress: '',
  // '付款地址',
  openBank: '',
  // '开户行',
  openMan: '',
  // '开户人',
  bankNo: '',
  // '银行账号',
  creditLine: '',
  // '信用额度：高、中、低',
  createTime: '',
  // '创建时间',
  createUserid: '',
  // '创建人id',
  isPublic: '',
  // '是否是公海池客户',
  updateUserid: '',
  // '最后更新人id',
  updateTime: ''
};

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
   * 创建一个客户数据
   * @param {*} param0
   * @param {*} payload
   */
  fnCreateClientInfo({ commit, state }, payload) {
    // 过滤不可创建和值为空的 key
    let params = pickBy(pick(payload, CLIENT_CREATE_LABEL), item => {
      if (item == 'id') return false;
      return item;
    });
    if (params.lastTime) {
      params.lastTime = new Date(params.lastTime).getTime();
    }

    return new Promise((resolve, reject) => {
      api
        .insertClient(params)
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
   * 删除一个客户数据
   * @param {*} param0
   * @param {*} payload
   */
  fnDeleteClientById({ commit, state }, payload) {
    // 过滤不可创建和值为空的 key
    let obj = {
      clientId: clientId
    };
    return new Promise((resolve, reject) => {
      api
        .deleteClient(params)
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
   * 根据客户的ID查询客户的基本信息
   * @param {*} param0
   * @param {*} clientId
   */
  fnLoadClientInfoById({ commit, state }, clientId) {
    return new Promise((resolve, reject) => {
      let obj = {
        clientId: clientId
      };
      api
        .selectClientById(obj)
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
   * 根据客户的ID去更新客户的信息
   * @param {*} param0
   * @param {*} payload
   */
  fnUpdateClientInfoById({ commit, state }, payload) {
    let id = payload.id;
    if (payload.lastTime) {
      payload.lastTime = new Date(payload.lastTime).getTime();
    }
    return new Promise((resolve, reject) => {
      let obj = {
        ...payload
      };
      api
        .updateClient(obj)
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
   * 分页查询 客户的数据
   * @param {*} param0
   * @param {*} payload
   */
  selectClientsByPage({ commit, state }, { params = {}, isConcat = false }) {
    let obj = pickBy(params, value => {
      return value;
    });
    obj.page = state.page;

    return new Promise((resolve, reject) => {
      api
        .selectClientsByPage(obj)
        .then(response => {
          let { respCode, respMsg, result } = response;
          if (response.respCode !== '0') {
            reject(response.respMsg);
          }
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

  /**
   * 加载更多的客户信息  需要跟 selectClientsByPage 结合使用
   * @param {*} param0
   * @param {*} param1
   */
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
  },

  /**
   * 将私人客户变成公海客户
   * @param {*} param0
   * @param {*} clientId
   */
  fnChangClientPublic({ commit, state }, clientId) {
    return new Promise((resolve, reject) => {
      let obj = {
        clientId
      };
      api
        .changePublic(obj)
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
