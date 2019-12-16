/**
 * 访问首页是不需要登陆的
 */
const meta = { requiresAuth: false };

export default {
	path: '/home',
	name: 'home',
	meta,
	// authority: 'myManager',
  // redirect: { name: 'my' },
  component:() => import('@/pages/Home/index.vue'),
	// children: (pre => [
	// 	{
	// 		path: '/home',
	// 		name: `${pre}home`,
	// 		authority: 'blogManager',
	// 		component: () => import('@/pages/Lesson/index.vue'),
	// 		meta: { ...meta, title: '首页' }
	// 	}
	// ])('home-')
};
