import Vue from 'vue';

// 获取当前年份
Vue.filter('obj_key_format', (value, obj, nodataTips = '') => {
  debugger;
  if (value === undefined || value === '') return nodataTips;

  return obj && obj[value] && obj[value].label;
});

// 获取当前年份
Vue.filter('arr_key_format', (value, obj, nodataTips = '') => {
  if (value === '') return nodataTips;

  return obj && obj[value];
});
