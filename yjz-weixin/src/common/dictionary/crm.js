/***************************************
        CRM相关
*****************************************/

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

// 客户的关系
export const CRM_CLIENT_RELATION = {
  1: {
    label: '经销商',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '商超',
    color: '#08B712',
    value: 2
  },
  3: {
    label: 'A类客户',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '无返利客户',
    color: '#00CC99',
    value: 4
  },
  5: {
    label: '密切',
    color: '#00CC99',
    value: 5
  },
  6: {
    label: '较好',
    color: '#00CC99',
    value: 6
  },
  7: {
    label: '一般',
    color: '#00CC99',
    value: 7
  },
  8: {
    label: '较差',
    color: '#00CC99',
    value: 8
  }
};

export const CRM_CLIENT_RELATION_OPTIONS = translatorKeyAndValue(CRM_CLIENT_RELATION);

// 客户的阶段
export const CRM_CLIENT_STAGE = {
  1: {
    label: '售前跟踪',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '合同执行',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '售后服务',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '合同期满',
    color: '#00CC99',
    value: 4
  }
};
export const CRM_CLIENT_STAGE_OPTIONS = translatorKeyAndValue(CRM_CLIENT_STAGE);

/**
 * 客户类型
 */
export const CRM_CLIENT_TYPE = {
  1: {
    label: '潜在客户',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '普通客户',
    color: '#08B712',
    value: 2
  },
  3: {
    label: 'vip用户',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '代理商',
    color: '#00CC99',
    value: 4
  },
  5: {
    label: '合作伙伴',
    color: '#00CC99',
    value: 5
  },
  6: {
    label: '失效客户',
    color: '#00CC99',
    value: 6
  }
};
export const CRM_CLIENT_TYPE_OPTIONS = translatorKeyAndValue(CRM_CLIENT_TYPE);


/**
 * 客户来源
 */
export const CRM_CLIENT_SOURCE = {
  1: {
    label: '独立开发',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '广告推广',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '客户介绍',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '促销活动',
    color: '#00CC99',
    value: 4
  },
  5: {
    label: '电话来访',
    color: '#00CC99',
    value: 5
  },
  6: {
    label: '公开招标',
    color: '#00CC99',
    value: 6
  },
  7: {
    label: '互联网',
    color: '#00CC99',
    value: 7
  },
  8: {
    label: '老客户',
    color: '#00CC99',
    value: 8
  },
  9: {
    label: '合作伙伴',
    color: '#00CC99',
    value: 9
  },
  10: {
    label: '代理商',
    color: '#00CC99',
    value: 10
  }
};
export const CRM_CLIENT_SOURCE_OPTIONS = translatorKeyAndValue(CRM_CLIENT_SOURCE);


/**
 * 客户等级
 */
export const CRM_CLIENT_LEVEL = {
  1: {
    label: '一星级',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '二星级',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '三星级',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '四星级',
    color: '#00CC99',
    value: 4
  },
  5: {
    label: '五星级',
    color: '#00CC99',
    value: 5
  }
};
export const CRM_CLIENT_LEVEL_OPTIONS = translatorKeyAndValue(CRM_CLIENT_LEVEL);

/**
 * 热点客户
 */
export const CRM_CLIENT_HOT = {
  1: {
    label: '是',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '否',
    color: '#08B712',
    value: 2
  }
};
export const CRM_CLIENT_HOT_OPTIONS = translatorKeyAndValue(CRM_CLIENT_HOT);


/********************************
 ****** COMPANY 企业信息 *********
 ********************************/

/**
 * 企业行业
 */
export const CRM_COMPANY_INDUSTRY = {
  1: {
    label: '金融',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '电子',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '冶金',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '重工业',
    color: '#00CC99',
    value: 4
  },
  5: {
    label: '轻工业',
    color: '#00CC99',
    value: 5
  }
};

export const CRM_COMPANY_INDUSTRY_OPTIONS = translatorKeyAndValue(CRM_COMPANY_INDUSTRY);

/**
 * 企业规模
 */
export const CRM_COMPANY_SCALE = {
  1: {
    label: '少于20人',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '20-99人',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '100-499人',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '500-1000人',
    color: '#00CC99',
    value: 4
  },
  5: {
    label: '1000-9999人',
    color: '#00CC99',
    value: 5
  }
};
export const CRM_COMPANY_SCALE_OPTIONS = translatorKeyAndValue(CRM_COMPANY_SCALE);

/**
 * 信用额度
 */
export const CRM_CREDIT_LIMIT = {
  1: {
    label: '低',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '中',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '高',
    color: '#0010cc',
    value: 3
  }
};
export const CRM_CREDIT_LIMIT_OPTIONS = translatorKeyAndValue(CRM_CREDIT_LIMIT);

// 客户的状态
export const CRM_CLIENT_STATUS = {
  1: {
    label: '基础',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '潜在',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '成功',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '冻结',
    color: '#00CC99',
    value: 4
  },
  5: {
    label: '失败',
    color: '#00CC99',
    value: 5
  }
};
export const CRM_CLIENT_STATUS_OPTIONS = translatorKeyAndValue(CRM_CLIENT_STATUS);

// // 客户的行业
// export const CRM_CLIENT_TYPE = {
//   1: {
//     label: '客户',
//     color: '#08B712',
//     value: 1
//   },
//   2: {
//     label: '供应商',
//     color: '#0010cc',
//     value: 2
//   },
//   3: {
//     label: '代理商',
//     color: '#00CC99',
//     value: 3
//   },
//   4: {
//     label: '合作伙伴',
//     color: '#00CC99',
//     value: 4
//   },
//   5: {
//     label: '竞争对手',
//     color: '#00CC99',
//     value: 5
//   },
//   6: {
//     label: '公关媒体',
//     color: '#00CC99',
//     value: 6
//   },
//   7: {
//     label: '银行',
//     color: '#00CC99',
//     value: 7
//   },
//   8: {
//     label: '中介机构',
//     color: '#00CC99',
//     value: 8
//   },
//   9: {
//     label: '外部资源',
//     color: '#00CC99',
//     value: 9
//   }
// };

/**
 * 联系人的种类
 */
export const CRM_CONTACT_KINDS = {
  1: {
    label: '非常重要',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '重要',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '普通',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '失效',
    color: '#00CC99',
    value: 4
  }
};
export const CRM_CONTACT_KINDS_OPTIONS = translatorKeyAndValue(CRM_CONTACT_KINDS);

/**
 * 联系人的类型
 */
export const CRM_CONTACT_TYPE = {
  1: {
    label: '联系人',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '主要联系人',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '供应商',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '经销商',
    color: '#00CC99',
    value: 4
  }
};
export const CRM_CONTACT_TYPE_OPTIONS = translatorKeyAndValue(CRM_CONTACT_TYPE);
