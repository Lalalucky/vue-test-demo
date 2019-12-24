import layout from '@/layout/footer.vue';

const meta = { requiresAuth: false };

// ---------------------------------------
// 报告有关页面
//  - 我的客户
//  - 公海客户
// --------------------------------------
export default {
  path: '/home',
  name: 'home',
  meta,
  authority: 'myManager',
  redirect: { name: 'my' },
  component: layout,
  children: (pre => [
    {
      path: '/home',
      name: `${pre}home`,
      authority: 'blogManager',
      component: () => import('@/pages/Lesson/index.vue'),
      meta: { ...meta, title: '首页' }
    },
    {
      path: '/reply',
      name: `${pre}reply`,
      authority: 'blogManager',
      component: () => import('@/pages/reply/index.vue'),
      meta: { ...meta, title: '回复' }
    },
    {
      path: '/evaluate',
      name: `${pre}evaluate`,
      authority: 'blogManager',
      component: () => import('@/pages/evaluate/index.vue'),
      meta: { ...meta, title: '我要评价' }
    },
    {
      path: '/type',
      name: `${pre}type`,
      authority: 'type',
      component: () => import('@/pages/lesson_type/index.vue'),
      meta: { ...meta, title: '课程' }
    },
    {
      path: '/search',
      name: `${pre}search`,
      authority: 'blogManager',
      component: () => import('@/pages/Lesson/search/index.vue'),
      meta: { ...meta, title: '搜索' }
    },
    {
      path: '/searchOver',
      name: `${pre}searchOver`,
      authority: 'blogManager',
      component: () => import('@/pages/Lesson/search_over/index.vue'),
      meta: { ...meta, title: '搜索' }
    },
  ])('home-')
};
