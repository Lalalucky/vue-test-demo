// 设置文件
// import setting from '@/setting.js'
import { baseRouterMap, asyncRouterMap } from '@/router/baseRouter';

import { getUserPermissionMenu, loadMenuListInfoBySidAPI } from '@/api/user/user';

import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

console.log(asyncRouterMap);

/**
 * 通过code判断是否与当前用户权限匹配
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  if (route.code) {
    if (menus[route.code] !== undefined) {
      return menus[route.code];
    } else {
      return false;
    }
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, userMenuData, menuDatas) {
  const accessedRouters = asyncRouterMap.filter(route => {
    let name = route.name;
    // 没有添加code字段  自动授予权限
    if (!route.code) {
      return true;
    }
    if (hasPermission(userMenuData, route)) {
      // route.name = menuDatas[route.code].title;
      // route.icon = menuDatas[route.code].icon;
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, userMenuData, menuDatas);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

export default {
  namespaced: true,
  state: {
    // 默认为基础路由，，登录鉴权后生产用户的路由表
    routers: baseRouterMap,
    // 用户添加的 路由
    addRouters: [],
    // 登录获取到的用户菜单数据
    userPermissMenus: [],
    // 在侧边栏展示的菜单数据
    navUserPermissMenus: [],
    // 需要鉴权的菜单数据
    allMenus: asyncRouterMap,
    isloadrouter: false,

    // 顶栏菜单
    header: [],
    // 侧栏菜单
    aside: [],
    // 侧边栏收缩
    asideCollapse: false,
    // 是否固定头部
    isfixHeader: false,

    // 是否固定侧边栏
    isfixMenu: false
  },
  getters: {
    g_addRouters(state) {
      return state.addRouters;
    },
    g_menus(state) {
      return state.userPermissMenus;
    },
    g_isloadrouter(state) {
      return state.isloadrouter;
    }
  },
  mutations: {
    s_menusourcedata(state, menu) {
      state.allMenus = menu;
    },
    s_isloadrouter(state, isloadrouter) {
      state.isloadrouter = !!isloadrouter;
    },
    /**
     * @description 设置顶栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    headerSet(state, menu) {
      // store 赋值
      state.header = menu;
    },
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet(state, menu) {
      // store 赋值
      state.aside = menu;
    },

    s_routers: (state, routers) => {
      state.addRouters = routers;
      state.routers = baseRouterMap.concat(routers);
    },
    s_navUserPermissMenus: (state, navMenu) => {
      state.navUserPermissMenus = [...navMenu];
    }
  },
  actions: {
    /**
     * 设置侧边栏展开或者收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse is collapse
     */
    asideCollapseSet({ state, dispatch }, collapse) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = collapse;

        // end
        resolve();
      });
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = !state.asideCollapse;

        // end
        resolve();
      });
    },
    /**
     * 从持久化数据读取侧边栏展开或者收缩
     * @param {Object} state vuex state
     */
    asideCollapseLoad({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值

        // end
        resolve();
      });
    },
    /**
     * 加载用户的所有的菜单权限
     */
    fnGetUserPermissMenus: ({ commit, rootState, state }) => {
      return new Promise(resolve => {
        loadMenuListInfoBySidAPI().then(({ result }) => {
          state.userPermissMenus = result;

          console.dir(result);
          resolve();
        });
      });
    },

    fnGenerateRoutes: ({ commit, dispatch, state }) => {
      return new Promise(async resolve => {
        // 获取用户的权限数据
        await dispatch(
          'base/menu/fnGetUserPermissMenus',
          {},
          {
            root: true
          }
        );
        // 获取所有的菜单数据 和 用户鉴权的菜单数据
        let { allMenus, userPermissMenus } = state;
        let allMenuData = {};
        let userMenuData = null;

        if (allMenus && Array.isArray(allMenus)) {
          allMenus.forEach(item => {
            allMenuData[item.code] = item;
          });
        }
        // 将 菜单树转换成 以code为key的对象
        let translatorTreeToArray = arr => {
          let result = {};
          let translator = data => {
            data.forEach(item => {
              result[item.code] = item;
              if (item.children && item.children.length) {
                translator(item.children);
              }
            });
          };
          translator(arr);
          return result;
        };

        if (Array.isArray(userPermissMenus)) {
          let arr = userPermissMenus;
          userMenuData = translatorTreeToArray(arr);
        }

        const accessedRouters = filterAsyncRouter(asyncRouterMap, userMenuData, allMenuData);

        console.log(accessedRouters);
        // commit('s_userPermissMenusObject', userPermissMenus);
        commit('s_routers', accessedRouters);
        resolve(accessedRouters);
        // getAllMenuList().then(data => {
        //   const menuDatas = {};
        //   for (let i = 0; i < data.length; i++) {
        //     menuDatas[data[i].code] = data[i];
        //   }
        //   const accessedRouters = filterAsyncRouter(asyncRouterMap, menus, menuDatas);
        //   console.log(accessedRouters);
        //   commit('SET_ROUTERS', accessedRouters);
        //   resolve();
        // });
      });
    },

    /**
     *  用户移除所有的菜单权限数据
     */
    destroy({ commit, dispatch, state }) {
      return new Promise((resolve, reject) => {
        state.routers = baseRouterMap;
        // 用户添加的 路由
        state.addRouters = [];
        // 登录获取到的用户菜单数据
        state.userPermissMenus = [];
        // 需要鉴权的菜单数据
        state.allMenus = asyncRouterMap;
        state.isloadrouter = false;
        resolve();
      });
    }
  }
};
