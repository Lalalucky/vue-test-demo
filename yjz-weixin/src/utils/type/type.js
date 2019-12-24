/******************************************
 **********   数据类型检测   ****************
 ******************************************/

/**
 * 是否是字符串
 * @param {*}  值
 */
export const isString = o => {
  //是否字符串
  return Object.prototype.toString.call(o).slice(8, -1) === 'String';
};

/**
 * 是否是否数字
 * @param {*}  值
 */
export const isNumber = o => {
  //
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number';
};

/**
 * 是否是对象类型
 * @param {*}  值
 */
export const isObj = o => {
  //
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object';
};

export const isArray = o => {
  //是否数组
  return Object.prototype.toString.call(o).slice(8, -1) === 'Array';
};

export const isDate = o => {
  //是否时间
  return Object.prototype.toString.call(o).slice(8, -1) === 'Date';
};

export const isBoolean = o => {
  //是否boolean
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean';
};

export const isFunction = o => {
  //是否函数
  return Object.prototype.toString.call(o).slice(8, -1) === 'Function';
};

export const isNull = o => {
  //是否为null
  return Object.prototype.toString.call(o).slice(8, -1) === 'Null';
};

export const isUndefined = o => {
  //是否undefined
  return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined';
};

export const isFalse = o => {
  if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true;
  return false;
};

export const isTrue = o => {
  return !this.isFalse(o);
};
