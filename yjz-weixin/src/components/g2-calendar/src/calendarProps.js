import { oneOf } from '@/utils/index.js';

export default {
  props: {
    /** 入场方向，default: vertical，vertical: 垂直，horizontal: 水平 */
    enterDirection: {
      type: [String],
      default: 'vertical'
      // validator: (val) => {
      //   retrun oneOf(val , ['horizontal' , 'vertical'])
      // }
    },
    /** 本地化 */
    locale: {
      type: Object,
      default() {
        return {
          monthTitle: 'yyyy/MM'
        };
      }
    },
    /** 关闭时回调 */
    onCancel: Function,
    /** 清除时回调 */
    onClear: Function,
    /** 确认时回调 */
    onConfirm: Function,
    /** 是否选择时间，default: false */
    pickTime: {
      type: Boolean,
      default: false
    },
    /** (web only) 样式前缀，default: rmc-calendar */
    prefixCls: {
      type: String,
      default: 'g2-calendar'
    },
    // /** 替换快捷选择栏，需要设置showShortcut: true */
    // renderShortcut?: (select: (startDate?: Date, endDate?: Date) => void) => React.ReactNode;
    // /** 替换标题栏 */
    // renderHeader?: (prop: HeaderPropsType) => React.ReactNode;
    // /** 快捷日期选择， default: false */
    // showShortcut?: boolean;
    // style?: React.CSSProperties;
    // /** header title, default: {locale.title} */
    title: {
      type: String,
      default: ''
    },
    /** 选择类型，default: range，one: 单日，range: 日期区间 */
    type: {
      type: [String],
      default: 'range'
      // validator(val){
      //   retrun oneOf(val , ['one' , 'range']);
      // }
    },
    /** 是否显示，default: false */
    visible: {
      type: Boolean,
      default: false
    },
    /** 默认选择值，开始时间、结束时间 */
    defaultValue: {
      type: Date,
      default() {
        return new Date();
      }
    },

    // DatePicker
    /** 显示开始日期，default: today */
    defaultDate: {
      type: Date,
      default() {
        return new Date();
      }
    },

    value: {
      type: [Date, Array],
      default() {
        return new Date();
      }
    },
    /** 日期扩展数据 */
    // getDateExtra?: (date: Date) => Models.ExtraData;
    // /** 无限滚动优化（大范围选择），default: false */
    // infiniteOpt?: boolean;
    // /** 初始化月个数，default: 6 */
    // initalMonths?: number;
    /** 最大日期 */
    // maxDate?: Date;
    // /** 最小日期 */
    // minDate?: Date;
    // /** 选择区间包含不可用日期 */
    // onSelectHasDisableDate?: (date: Date[]) => void;
    // /** 选择日期回调，如果有返回值，选择范围将使用返回值 */
    onSelect: Function
    // /** 行大小，default: normal */
    // rowSize?: 'normal' | 'xl';

    // // TimePicker
    // /** 默认时间选择值 */
    // defaultTimeValue?: Date;
    // timePickerPrefixCls?: string;
    // timePickerPickerPrefixCls?: string;
  }
};
