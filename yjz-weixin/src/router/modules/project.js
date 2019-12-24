import layout from '@/layout/nodata.vue';

const meta = { requiresAuth: false };

// ---------------------------------------
// 报告有关页面
//  -
//  - 课程
// --------------------------------------
export default {
  path: '/lesson',
  name: 'lesson',
  meta,
  authority: 'lesson',
  component: layout,
  children: (pre => [
    {
      path: 'detail',
      name: `${pre}create`,
      authority: 'proCreate',
      component: () => import('@/pages/Lesson_detail/index.vue'),
      meta: { ...meta, title: '课程详情' }
    },
    
  ])('crm-')
};
