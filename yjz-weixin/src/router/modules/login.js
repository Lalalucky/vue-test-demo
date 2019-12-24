import layout from '@/layout/nodata.vue';

const meta = { requiresAuth: false };
//  - 登录

export default {
  path: '/weixin',
  name: 'weixin',
  meta,
  authority: 'weixin',
  component: layout,
  children: (pre => [
    {
      path: 'login',
      name: `${pre}login`,
      authority: 'prologin',
      component: () => import('@/pages/weixinLogin/index.vue'),
      meta: { ...meta, title: '登录' }
    },
    
  ])('crm-')
};
