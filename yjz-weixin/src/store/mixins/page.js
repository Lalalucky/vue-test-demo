import config from '@/common/config.js';

/**
 *    分页查询公共方法
 *
 *    请在你的store 中通过 merge( {} , pageMixins);去合并，
 *    然后使用同一的分页组件，不需要重复写 g_currentPage ...
 *
 *    具体参考
 *    pages/examples/page/table中 table-footer 和
 *    store/modules/examples/modules/table.js
 *
 */
export default {
  state: {
    page: {
      // 当前页码
      currentPage: 1,
      // 每页显示的条数
      pageNumber: config.page.pageNumber || 10,
      // 总条数
      totalNumber: 0,
      // page-sizes 的值 每页显示个数选择器的选项设置
      // pageSizeList: config.page.pageSize || [],
      //组件布局，子组件名用逗号分隔
      // layout: config.page.layout || 'total, prev, pager, next, jumper'
    }
  },
  getters: {
    g_page_currentPage(state) {
      return state.page.currentPage;
    },
    g_page_pageNumber(state) {
      return state.page.pageNumber;
    },
    g_page_totalNumber(state) {
      return state.page.totalNumber;
    },
    g_page_layout(state) {
      return state.page.layout;
    }
  },
  mutations: {
    /**
     * 通用的设置分页数据方法
     * 请在 dispath 获取数据之后调用此方法去设置 页码数据
     */
    s_page(state, page) {
      state.page.currentPage = page.currentPage || 1;
      state.page.totalNumber = page.totalNumber || 1;
    }
  }
};
