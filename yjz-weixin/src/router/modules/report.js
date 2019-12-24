import layout from '@/layout/nodata.vue';

const meta = { requiresAuth: false };

// ---------------------------------------
// 报告有关页面
//  - 我的客户
//  - 公海客户
// --------------------------------------
export default {
  path: '/report',
  name: 'report',
  meta,
  authority: 'myManager',
  redirect: { name: 'my' },
  component: layout,
  children: (pre => [
    {
      path: 'day',
      name: `${pre}day`,
      authority: 'dayReport',
      component: () => import('@/pages/Report/report-day/index.vue'),
      meta: { ...meta, title: '日报' }
    }
  ])('report-')
};
