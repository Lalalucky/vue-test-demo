/***************************************
        project相关
*****************************************/


/**
 * 项目查询类型
 */
export const QUERY_PROJECT_TYPE = {
    0: {
      label: '所有项目',
      color: '#c4e3f5',
      value: 0
    },
    1: {
      label: '我负责的项目',
      color: '#08B712',
      value: 1
    },
    2: {
      label: '我参与的项目',
      color: '#0010cc',
      value: 2
    }
  };
  /**
 * 项目状态 1.准备阶段 2.进行中 3.完成 4.取消
 */
export const PROJECT_STATUS = {
  1: {
    label: '准备阶段',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '进行中',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '已完成',
    color: '#0010cc',
    value: 3
  },
  4: {
    label: '已取消',
    color: '#0010cc',
    value: 4
  }
};
 /**
 * 项目状态 1.进行中 2.完成 3.取消 
 */
export const STAGE_STATUS  = {
  1: {
    label: '进行中',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '已完成',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '已取消',
    color: '#0010cc',
    value: 3
  }
};
 /**
 * 状态（1.待审核2.审核通过3.审核不通过）
 */
export const VISIT_STATUS  = {
  1: {
    label: '待审核',
    color: '#c4e3f5',
    value: 1
  },
  2: {
    label: '通过',
    color: '#08B712',
    value: 2
  },
  3: {
    label: '不通过',
    color: '#0010cc',
    value: 3
  }
};