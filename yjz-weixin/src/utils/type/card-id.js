/******************************************
 **********   严格的身份证校验   ***************
 ******************************************/
import TypeMsg from './typeMsg';

//身份证城市
const aCity = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外'
};

/**
 * 身份证格式严格校验
 * @param {*} sId   身份证号码
 * @returns  {Object}
 *      status: 0   ,   msg :  '您输入的身份证号正确'
 *      status: 1   ,   msg :  '你输入的身份证长度或格式错误'
 *      status: 2   ,   msg :  '你的身份证地区非法'
 *      status: 3   ,   msg :  '身份证上的出生日期非法'
 *      status: 4   ,   msg :  '你输入的身份证号非法'
 */
export const isCardID = sId => {
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
    return new TypeMsg(1, '你输入的身份证长度或格式错误');
  }

  if (!aCity[parseInt(sId.substr(0, 2))]) {
    return new TypeMsg(2, '你的身份证地区非法');
  }

  // 出生日期验证
  var sBirthday = (sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))).replace(
      /-/g,
      '/'
    ),
    d = new Date(sBirthday);
  if (sBirthday != d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()) {
    return new TypeMsg(3, '身份证上的出生日期非法');
  }

  // 身份证号码校验
  var sum = 0,
    weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
    codes = '10X98765432';
  for (var i = 0; i < sId.length - 1; i++) {
    sum += sId[i] * weights[i];
  }
  var last = codes[sum % 11]; //计算出来的最后一位身份证号码
  if (sId[sId.length - 1] != last) {
    return new TypeMsg(4, '你输入的身份证号非法');
  }

  return new TypeMsg(0, '您输入的身份证号正确');
};
