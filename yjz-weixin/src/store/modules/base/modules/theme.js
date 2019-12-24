export default {
  namespaced: true,
  state: {
    //  整体风格
    themeBlock: 1,
    themeColor: 1,
    themeSpin: 1,
    isFixHeader: false,
    isHiddenHeader: false,
    isFixSider: false
  },
  getters: {
    g_themeBlock(state) {
      return state.themeBlock;
    },
    g_themeColor(state) {
      return state.themeColor;
    },
    g_themeSpin(state) {
      return state.themeSpin;
    },
    g_isFixHeader(state) {
      return state.isFixHeader;
    },
    g_isHiddenHeader(state) {
      return state.isHiddenHeader;
    },
    g_isFixSider(state) {
      return state.isFixSider;
    }
  },
  mutations: {
    s_themeBlock(state, themeBlock) {
      state.themeBlock = themeBlock;
    },
    s_themeColor(state, themeColor) {
      state.themeColor = themeColor;
    },
    s_themeSpin(state, themeSpin) {
      state.themeSpin = themeSpin;
    },
    s_isFixHeader(state, isFixHeader) {
      state.isFixHeader = isFixHeader;
    },
    s_isHiddenHeader(state, isHiddenHeader) {
      state.isHiddenHeader = isHiddenHeader;
    },
    s_isFixSider(state, isFixSider) {
      state.isFixSider = isFixSider;
    }
  },
  actions: {}
};
