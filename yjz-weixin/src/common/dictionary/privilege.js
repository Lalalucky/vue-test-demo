
export const translatorKeyAndValue = obj => {
  let arr = [];
  Object.keys(obj).forEach(key => {
    let item = obj[key];
    arr.push({
      key: item.value,
      value: item.label
    });
  });
  return arr;
};

export const PRIVILEGE_TYPES = {
  menuitem: '页面权限',
  operation: '操作权限'
  // '0' : '页面权限',
  // '1' : '操作权限',
};
// 男女性别
export const BASIC_SEX_TYPES = {
  0: {
    label: '未知',
    color: '#c4e3f5',
    value: 0
  },
  1: {
    label: '男',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '女',
    color: '#08B712',
    value: 2
  }
};
export const BASIC_SEX_TYPES_OPTIONS = translatorKeyAndValue(BASIC_SEX_TYPES);

// 血型
export const BASIC_BLOOD_TYPES = {
  1: {
    label: 'AB',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: 'A',
    color: '#08B712',
    value: 2
  },
  3: {
    label: 'O',
    color: '#08B712',
    value: 3
  },
  4: {
    label: 'B',
    color: '#08B712',
    value: 4
  },
};
export const BASIC_BLOOD_TYPES_OPTIONS = translatorKeyAndValue(BASIC_BLOOD_TYPES);

