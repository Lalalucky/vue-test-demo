import layout from '@/layout/nodata.vue';
import footerLayout from '@/layout/footer.vue';

const meta = { requiresAuth: false };

// ---------------------------------------
// 报告有关页面
//  - 我的客户
//  - 公海客户
// --------------------------------------
export default [
  {
    path: '/my',
    name: 'my',
    meta,
    authority: 'myManager',
    redirect: { name: 'my' },
    component: footerLayout,
    code: 501,
    children: (pre => [
      {
        path: '/my',
        name: `${pre}my`,
        authority: 'blogManager',
        component: () => import('@/pages/Profile/Home/index.vue'),
        meta: { ...meta, title: '我的' }
      }
    ])('profile-')
  },
  {
    path: '/my',
    name: 'my',
    meta,
    authority: 'myManagerChildren',
    redirect: { name: 'my' },
    component: layout,
    code: 502,
    children: (pre => [
      {
        path: 'myInfo',
        name: `${pre}myInfo`,
        authority: 'blogManager',
        component: () => import('@/pages/Profile/userInfo/index.vue'),
        meta: { ...meta, title: '个人信息' }
      },
      {
        path: 'teacher',
        name: `${pre}teacher`,
        authority: 'blogManager',
        component: () => import('@/pages/Profile/teacher/index.vue'),
        meta: { ...meta, title: '教师中心' }
      },
      {
        path: 'setting',
        name: `${pre}setting`,
        authority: 'blogManager',
        component: () => import('@/pages/Profile/Setting/index.vue'),
        meta: { ...meta, title: '设置' }
      },
      {
        path: 'basic',
        name: `${pre}basic`,
        authority: 'blogManager',
        component: () => import('@/pages/Profile/Basic/index.vue'),
        meta: { ...meta, title: '基本设置' }
      },
      {
        path: 'basicModify',
        name: `${pre}basicModify`,
        authority: 'blogManager',
        component: () => import('@/pages/Profile/Basic/basic-info/basic-modify.vue'),
        meta: { ...meta, title: '设置' }
      },
      {
        path: 'email',
        name: `${pre}email`,
        authority: 'blogManager',
        component: () => import('@/pages/Profile/Email/index.vue'),
        meta: { ...meta, title: '设置' }
      }
    ])('profile-')
  }
];
