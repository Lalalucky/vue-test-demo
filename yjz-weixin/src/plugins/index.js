// [可选插件] 内置 $log 日志方法
import logPlugin from './log/index';

// [可选插件] 内置 $url url处理方法
import urlPlugin from './url/index';

import VueMeta from 'vue-meta';

import './brower/index.js';

// 内置过滤器
import './filters/date.js';
import './filters/obj.js';
// 文件大小过滤器
import './filters/file.js';
// 内置的指令
// import './directives/index.js';

// 移动端使用Vux作为基本组件
import { ToastPlugin, LoadingPlugin, TransferDom, ConfirmPlugin } from 'vux';

export default {
  async install(Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示。https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false;
    // 当前环境  --区分为  开发环境 'development' ; 生产环境 : 'production'
    Vue.prototype.$node_env = process.env.NODE_ENV;
    // 当前编译环境  --区分为 各个环境 如 dev cloud cloud1...
    Vue.prototype.$build_env = process.env.BUILD_ENV;
    // 当前的 baseUrl
    Vue.prototype.$base_url = process.env.BASE_URL;

    // [可选插件] 插件
    Vue.use(logPlugin);
    Vue.use(urlPlugin);
    Vue.use(VueMeta);

    // Vux 组件

    Vue.use(ToastPlugin);
    Vue.use(LoadingPlugin);
    Vue.use(ConfirmPlugin);

    Vue.directive('transfer-dom', TransferDom);
  }
};
