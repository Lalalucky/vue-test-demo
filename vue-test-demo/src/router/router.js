/**
 * 路由来自三部分：一进入页面的入口页面-- baseRouterMap
 *                所有无法找到页面回到 Home 页 -- LoginPage
 *                其他所有的业务页面 -- asyncRouterMap
 */

export let baseRouterMap = [
	{
		path: '/login',
		name: 'Login',
		component: resolve => require(['@/pages/Login/index.vue'],resolve)
	}
];

export const LoginPage = {
	path: '*',
	redirect: '/login'
};

/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const routerFiles = require.context('./modules', false, /\.js$/);
const modules = [];

routerFiles.keys().forEach(key => {
	let moduleDefault = routerFiles(key).default;
	Array.isArray(moduleDefault) ? modules.push(...moduleDefault) : modules.push(moduleDefault);
});

// 权限验证后的路由
export const asyncRouterMap = [
	// 个人中心
	// 系统有关
	// 用户有关
	// 默认首页为 登录页面
	...modules
];

baseRouterMap = baseRouterMap.concat(asyncRouterMap).concat([LoginPage]);
