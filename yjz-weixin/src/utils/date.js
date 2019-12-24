import moment from 'moment/moment.js';
import config from '@/common/config.js';

export const formatTime = (value, fmt = config.data_format) => {
  if (!value) return '';
  return moment(value).format(fmt);
};

export { moment };

export const formateDateLocal = timestamp => {
  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num;
  }

  var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
  var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

  var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
  var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

  var Y = tmDate.getFullYear(),
    m = tmDate.getMonth() + 1,
    d = tmDate.getDate();
  var H = tmDate.getHours(),
    i = tmDate.getMinutes(),
    s = tmDate.getSeconds();

  if (timestampDiff < 60) {
    // 一分钟以内
    return '刚刚';
  } else if (timestampDiff < 3600) {
    // 一小时前之内
    return Math.floor(timestampDiff / 60) + '分钟前';
  } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
    return `${H}:${zeroize(i)}`;
  } else {
    var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
    if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
      return `昨天 ${H}:${zeroize(i)}`;
    } else if (curDate.getFullYear() == Y) {
      return `${m}月${d}日 ${H}:${zeroize(i)}`;
    } else {
      return `${Y}年${m}月${d}日 ${H}:${zeroize(i)}`;
    }
  }
};

/**
 * 是否为闫年
 * @return {Boolse} true|false
 */
export const isLeapYear = function(y) {
  return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
};

/**
 * 返回星期数
 * @return {Number}
 */
export const getWhatDay = function(year, month, day) {
  let date = new Date(year + '/' + month + '/' + day);
  let index = date.getDay();
  let dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return dayNames[index];
};

/**
 * 返回星期数
 * @return {Number}
 */
export const getMonthPreDay = function(year, month) {
  var date = new Date(year + '/' + month + '/01');
  var day = date.getDay();
  if (day == 0) {
    day = 7;
  }
  return day;
};

/**
 * 返回月份天数
 * @return {Number}
 */
export const getMonthDays = function(year, month) {
  if (/^0/.test(month)) {
    month = month.split('')[1];
  }
  return [0, 31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

/**
 * 补齐数字位数
 * @return {string}
 */
export const getNumTwoBit = function(n) {
  return (n > 9 ? '' : '0') + n;
};

/**
 * 日期对象转成字符串
 * @return {string}
 */
export const date2Str = function(date, split) {
  if (typeof date == 'string') return date;
  split = split || '-';
  let y = date.getFullYear();
  let m = getNumTwoBit(date.getMonth() + 1);
  let d = getNumTwoBit(date.getDate());
  return [y, m, d].join(split);
};

/**
 * 返回日期格式字符串
 * @param {Number} 0返回今天的日期、1返回明天的日期，2返回后天得日期，依次类推
 * @return {string} '2014-12-31'
 */
export const getDay = function(i) {
  i = i || 0;
  let date = new Date();
  let diff = i * (1000 * 60 * 60 * 24);
  date = new Date(date.getTime() + diff);
  return date2Str(date);
};

/**
 * 时间戳转换为日期格式
 * @return {String}
 */
export const timestampToDate = function(timestamp) {
  let date = new Date(timestamp);
  return date.getFullYear() + '-' + getNumTwoBit(date.getMonth() + 1) + '-' + getNumTwoBit(date.getDate());
};

/**
 * 时间比较
 * @return {Boolean}
 */
export const compareDate = function(date1, date2) {
  let startTime = new Date(date1.replace('-', '/').replace('-', '/'));
  let endTime = new Date(date2.replace('-', '/').replace('-', '/'));
  if (startTime >= endTime) {
    return false;
  }
  return true;
};
/**
 * 时间是否相等
 * @return {Boolean}
 */
export const isEqual = function(date1, date2) {
  let startTime = new Date(date1).getTime();
  let endTime = new Date(date2).getTime();
  if (startTime == endTime) {
    return true;
  }
  return false;
};
