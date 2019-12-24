import * as util from '@/utils/index.js';

const CALENDAR_VIEW_NAME_LIST = [
  // （月视图）
  "month",
  // （基本周视图，左侧不显示具体时间）
  "basicWeek",
  // （基本日视图，左侧不显示具体时间）
  "basicDay",
  // （周视图）
  "agendaWeek",
  // （日视图）
  "agendaDay"
];

const crm = {
  namespaced: true,
  state: {
    visible: false,

    instance: null,

    date : "",
    view: {
      name: 'month',
      viewObj: null
    }
  },
  getters: {
    g_visible(state) {
      return state.visible;
    },
    g_instance(state) {
      return state.instance;
    },
    g_viewName(state) {
      return state.view.name;
    },
    g_date(state) {
      return state.date;
    }
  },
  mutations: {
    s_visible(state, val) {
      state.visible = !!val;
    },
    s_instance(state , instance) {
      debugger;
      state.instance = instance;
    },
    s_viewName(state, val) {
      state.view.name = val;
    },
    s_date(state , date) {
      state.date = date;
    },
  },

  actions: {}
};

export default crm;
