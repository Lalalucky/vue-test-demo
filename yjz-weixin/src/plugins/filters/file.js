import Vue from 'vue';

/**
 *   文件大小过滤器
 *
 *   如   {{ 1024 | size_format }}    =>  1KB
 *
 *  @param value    文件大小
 *  @param unitArr  文件大小转换 单位数组
 */
Vue.filter('size_format', (value, unitArr) => {
  if (!Array.isArray(unitArr)) {
    unitArr = new Array('B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
  }
  return renderSize(value, unitArr);
});

//格式化文件大小
function renderSize(value, unitArr) {
  if (null == value || value == '') {
    return '0 B';
  }
  var index = 0;
  var srcsize = parseFloat(value);
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  var size = srcsize / Math.pow(1024, index);
  size = size.toFixed(2); //保留的小数位数
  return size + unitArr[index];
}
