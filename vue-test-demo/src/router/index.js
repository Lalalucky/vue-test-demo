import Vue from "vue";
import VueRouter from "vue-router";
import { baseRouterMap } from "./router" ;

Vue.use(VueRouter);

// 路由的模式 只支持 'history' || 'hash'
let ROUTER_MODE = process.env.HISTORY || 'history';

const router = new VueRouter({
  mode: ROUTER_MODE,
  base: '/demo',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: baseRouterMap
});

export default router;
