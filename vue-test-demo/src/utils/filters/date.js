import Vue from 'vue';
import moment from 'moment';

// 获取当前年份
Vue.filter('date_year', (value, suffix = '') => {
  if (!value) return '';
  return `${moment(value).year()}${suffix}`;
});

//
/**
 * 获取当前月份
 * suffix [String] --- 当前的月份后缀
 * examples:
 *   {{date | date_month('月')}}     =>   1月
 *   {{date | date_month}}          =>   1
 */
Vue.filter('date_month', (value, suffix = '') => {
  if (!value) return '';
  return `${moment(value).month() + 1}${suffix}`;
});

/**
 * 获取当前日期
 * suffix [String] --- 后缀
 * examples:
 *   {{date | date_date('日')}}     =>   9日
 *   {{date | date_date}}          =>   9
 */
Vue.filter('date_date', (value, suffix = '') => {
  if (!value) return '';
  return `${moment(value).date()}${suffix}`;
});
/**
 * 获取当前小时
 * suffix [String] --- 后缀
 * examples:
 *   {{date | date_date('日')}}     =>   9日
 *   {{date | date_date}}          =>   9
 */
Vue.filter('date_hour', (value, suffix = '') => {
  if (!value) return '';
  return `${moment(value).hour()}${suffix}`;
});
/**
 * 获取当前分钟
 * suffix [String] --- 后缀
 * examples:
 *   {{date | date_minute('日')}}     =>   9日
 *   {{date | date_minute}}          =>   9
 */
Vue.filter('date_minute', (value, suffix = '') => {
  if (!value) return '';
  return `${moment(value).minute()}${suffix}`;
});
/**
 * 获取当前秒
 * suffix [String] --- 后缀
 * examples:
 *   {{date | date_second('秒')}}     =>   9秒
 *   {{date | date_second}}          =>   9
 */
Vue.filter('date_second', (value, suffix = '') => {
  if (!value) return '';
  return `${moment(value).second()}${suffix}`;
});

/***********************************************
 ****************     格式化    *****************
 ************************************************/

/**
 * 时间格式化
 * @author guzhanghua
 * @param {*} value
 * @param {*} fmt 格式化格式
 * @example :
 *    {{date | date_format }}                   =>   2019-01-08 11:11:08
 *    {{date | date_format('YYYY-MM-DD') }}     =>   2019-01-08
 */
Vue.filter('date_format', (value, fmt = 'YYYY-MM-DD hh:mm:ss') => {
  if (!value) return '';
  return moment(value).format(fmt);
});

/**
 * 相对时间格式化
 * @author guzhanghua
 * @param {*} value
 * @example :
 *    {{date | date_format_start }}     =>   1 天前
 *    {{date | date_format_start }}     =>   11 小时前
 */
Vue.filter('date_format_start', value => {
  if (!value) return '';
  return moment(value)
    .locale('zh-cn')
    .fromNow();
});

/***********************************************
 ****************     转换      *****************
 ************************************************/
/**
 * 时间转换成数组
 * @author guzhanghua
 * @param {*} value
 * @example :
 *    {{date | date_to_array }}     =>   1 天前
 */
Vue.filter('date_to_array', value => {
  if (!value) return [];
  return moment(value).toArray();
});

/**
 * 时间转换成JSON
 * @author guzhanghua
 * @param {*} value
 * @example :
 *    {{date | date_to_array }}     =>   1 天前
 */
Vue.filter('date_to_json', value => {
  if (!value) return '';
  return moment(value).toJSON();
});

/**
 * 时间转换成ISO
 * @author guzhanghua
 * @param {*} value
 * @example :
 *    {{date | date_to_array }}     =>   1 天前
 */
Vue.filter('date_to_iso', value => {
  if (!value) return '';
  return moment(value).toISOString();
});

/**
 * 时间转换成对象
 * @author guzhanghua
 * @param {*} value
 * @example :
 *    {{date | date_to_array }}     =>   1 天前
 */
Vue.filter('date_to_object', value => {
  if (!value) return {};
  return moment(value).toObject();
});
