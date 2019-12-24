import { version } from '../../package';

export default {
  menuAuth: false,
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: false,
    // 是否开启menuAuthr认证
    isAuthentication: false,
    // 白名单
    whiteList: ['/login', '/authredirect']
  },
  // 版本
  releases: {
    version
  },

  // Cookie的设置 。注意 如果在统一域名下存在多个工程，请设置path来区分工程  path = '/simcere-weixin'
  cookie: {
    path: '/oa-weixin',
    // 所有的cookie保存字段都以此为开头   oa-1.0.0-sid
    prefix: `oa-${version}`
  },

  // 是否默认开启页面切换动画
  transition: {
    active: true
  },
  page: {
    pageNumber: 10,
    pageSize: [5, 10, 20, 50, 100],
    layout: 'total, prev, pager, next, jumper'
  },
  // 日期的基本格式化方式
  data_format: 'YYYY-MM-DD HH:mm:ss'
};
