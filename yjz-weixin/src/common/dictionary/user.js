import { translatorKeyAndValue } from "./crm"
/* 
    项目员工性别
*/

export const USER_SEX = {
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
export const USER_SEX_OPTIONS = translatorKeyAndValue(USER_SEX);

export const USER_SEX_HASNODATA = {
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
export const USER_SEX_HASNODATA_OPTIONS = translatorKeyAndValue(USER_SEX_HASNODATA);

/* 
    员工学历
*/
export const USER_EDU = {
  0: '小学',
  1: '初中',
  2: '高中',
  3: '大学专科',
  4: '大学本科',
  5: '研究生',
  6: '博士'
};

export const USER_EDU_OBJ = {
  0: {
    label: '小学',
    color: '#c4e3f5',
    value: 0
  },
  1: {
    label: '初中',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '高中',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '大学专科',
    color: '#c4e3f5',
    value: 3
  },
  4: {
    label: '大学本科',
    color: '#c4e3f5',
    value: 4
  },
  5: {
    label: '研究生',
    color: '#08B712',
    value: 5
  },
  6: {
    label: '博士',
    color: '#08B712',
    value: 6
  }
};
export const USER_EDU_OBJ_OPTIONS = translatorKeyAndValue(USER_EDU_OBJ);


/* 
  员工离职情况
*/
export const USER_DISMISSION = {
  0: '在职',
  1: '离职'
};

export const USER_DISMISSION_OBJ = {
  0: {
    label: '在职',
    color: '#c4e3f5',
    value: 0
  },
  1: {
    label: '离职',
    color: '#c4e3f5',
    value: 1
  }
};

/* 
  员工离职情况
*/
export const USER_CATEGORY = {
  0: '农业户口',
  1: '非农业户口'
};

export const USER_CATEGORY_OBJ = {
  0: {
    label: '农业户口',
    color: '#c4e3f5',
    value: 0
  },
  1: {
    label: '非农业户口',
    color: '#c4e3f5',
    value: 1
  }
};

/* 
  证件类型
*/
export const USER_CERTIFICATE_TYPE = {
  1: {
    label: '身份证',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '军官证',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '护照',
    color: '#0010cc',
    value: 3
  }
};

/* 
    员工民族
*/
export const USER_NATION = {
  0: '汉族',
  1: '壮族',
  2: '满族',
  3: '回族',
  4: '苗族',
  5: '维吾尔族',
  6: '土家族',
  7: '彝族',
  8: '蒙古族',
  9: '藏族',
  10: '布依族',
  11: '侗族',
  12: '瑶族',
  13: '朝鲜族',
  14: '白族',
  15: '哈尼族',
  16: '哈萨克族',
  17: '黎族',
  18: '傣族',
  19: '畲族',
  20: '傈僳族',
  21: '仡佬族',
  22: '东乡族',
  23: '高山族',
  24: '拉祜族',
  25: '水族',
  26: '佤族',
  27: '纳西族',
  28: '羌族',
  29: '土族',
  30: '仫佬族',
  31: '锡伯族',
  32: '柯尔克孜族',
  33: '达斡尔族',
  34: '景颇族',
  35: '毛南族',
  36: '撒拉族',
  37: '布朗族',
  38: '塔吉克族',
  39: '阿昌族',
  40: '普米族',
  41: '鄂温克族',
  42: '怒族',
  43: '京族',
  44: '基诺族',
  45: '德昂族',
  46: '保安族',
  47: '俄罗斯族',
  48: '裕固族',
  49: '乌兹别克族',
  50: '门巴族',
  51: '鄂伦春族',
  52: '独龙族',
  53: '塔塔尔族',
  54: '赫哲族',
  55: '珞巴族'
};

export const USER_NATION_OBJ = {
  0: {
    label: '汉族',
    value: 0
  },
  1: {
    label: '壮族',
    value: 1
  },
  2: {
    label: '满族',
    value: 2
  },
  3: {
    label: '回族',
    value: 3
  },
  4: {
    label: '苗族',
    value: 4
  },
  5: {
    label: '维吾尔族',
    value: 5
  },
  6: {
    label: '土家族',
    value: 6
  },
  7: {
    label: '彝族',
    value: 7
  },
  8: {
    label: '蒙古族',
    value: 8
  },
  9: {
    label: '藏族',
    value: 9
  },
  10: {
    label: '布依族',
    value: 10
  },
  11: {
    label: '侗族',
    value: 11
  },
  12: {
    label: '瑶族',
    value: 12
  },
  13: {
    label: '朝鲜族',
    value: 13
  },
  14: {
    label: '白族',
    value: 14
  },
  15: {
    label: '哈尼族',
    value: 15
  },
  16: {
    label: '哈萨克族',
    value: 16
  },
  17: {
    label: '黎族',
    value: 17
  },
  18: {
    label: '傣族',
    value: 18
  },
  19: {
    label: '畲族',
    value: 19
  },
  20: {
    label: '傈僳族',
    value: 20
  },
  21: {
    label: '仡佬族',
    value: 21
  },
  22: {
    label: '东乡族',
    value: 22
  },
  23: {
    label: '高山族',
    value: 23
  },
  24: {
    label: '拉祜族',
    value: 24
  },
  25: {
    label: '水族',
    value: 25
  },
  26: {
    label: '佤族',
    value: 26
  },
  27: {
    label: '纳西族',
    value: 27
  },
  28: {
    label: '羌族',
    value: 28
  },
  29: {
    label: '土族',
    value: 29
  },
  30: {
    label: '仫佬族',
    value: 30
  },
  31: {
    label: '锡伯族',
    value: 31
  },
  32: {
    label: '柯尔克孜族',
    value: 32
  },
  33: {
    label: '达斡尔族',
    value: 33
  },
  34: {
    label: '景颇族',
    value: 34
  },
  35: {
    label: '毛南族',
    value: 35
  },
  36: {
    label: '撒拉族',
    value: 36
  },
  37: {
    label: '布朗族',
    value: 37
  },
  38: {
    label: '塔吉克族',
    value: 38
  },
  39: {
    label: '阿昌族',
    value: 39
  },
  40: {
    label: '普米族',
    value: 40
  },
  41: {
    label: '鄂温克族',
    value: 41
  },
  42: {
    label: '怒族',
    value: 42
  },
  43: {
    label: '京族',
    value: 43
  },
  44: {
    label: '基诺族',
    value: 44
  },
  45: {
    label: '德昂族',
    value: 45
  },
  46: {
    label: '保安族',
    value: 46
  },
  47: {
    label: '俄罗斯族',
    value: 47
  },
  48: {
    label: '裕固族',
    value: 48
  },
  49: {
    label: '乌兹别克族',
    value: 49
  },
  50: {
    label: '门巴族',
    value: 50
  },
  51: {
    label: '鄂伦春族',
    value: 51
  },
  52: {
    label: '独龙族',
    value: 52
  },
  53: {
    label: '塔塔尔族',
    value: 53
  },
  54: {
    label: '赫哲族',
    value: 54
  },
  55: {
    label: '珞巴族',
    value: 55
  }
};
export const USER_NATION_OBJ_OPTIONS = translatorKeyAndValue(USER_NATION_OBJ);

