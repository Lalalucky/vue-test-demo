export default {

  props:{
    // 一周几天从星期天开始  0 -6
    initalMonths :{
      type:Number,
      default : 6
    },

    defaultDate : {
      type:Date,
      default : new Date()
    },
    /** 最小日期 */
    minDate: {
      type:Date,
      default : ''
    },
     /** 最大日期 */
    maxDate: {
      type:Date,
      default : ''
    },
    locale:{
      type:Object,
      default(){
        return {

        }
      }
    }
  },
  date(){
    return {
      weeks : [],
      months : []
    }
  },
  methods: {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !shallowEqual(this.props, nextProps, ['startDate', 'endDate']) ||
        !shallowEqual(this.state, nextState) ||
        !shallowEqual(this.context, nextContext);
    },
  
    componentWillReceiveProps(nextProps) {
      const oldValue = this.props;
      const newValue = nextProps;
  
      if (oldValue.startDate !== newValue.startDate || oldValue.endDate !== newValue.endDate) {
        if (oldValue.startDate) {
          this.selectDateRange(oldValue.startDate, oldValue.endDate, true);
        }
        if (newValue.startDate) {
          this.selectDateRange(newValue.startDate, newValue.endDate);
        }
      }
    },
  
    componentWillMount() {
      const { initalMonths = 6, defaultDate } = this;
      for (let i = 0; i < initalMonths; i++) {
        this.canLoadNext() && this.genMonthData(defaultDate, i);
      }
      this.visibleMonth = [...this.state.months];
    },
    
    /**
     * 获取此月 和 下几个月的  第一天和最后一天
     * @author guzhanghua
     * @param {*} [date=new Date]
     * @param {number} [addMonth=0]
     * @returns
     */
    getMonthDate(date = new Date, addMonth = 0) {
      const y = date.getFullYear(), m = date.getMonth();
      return {
        firstDate: new Date(y, m + addMonth, 1),
        lastDate: new Date(y, m + 1 + addMonth, 0),
      };
    },
  
    canLoadPrev() {
      const { minDate } = this.props;
      return !minDate || this.state.months.length <= 0 || +this.getMonthDate(minDate).firstDate < +this.state.months[0].firstDate;
    },
  
    canLoadNext() {
      const { maxDate } = this.props;
      return !maxDate || this.state.months.length <= 0 || +this.getMonthDate(maxDate).firstDate > +this.state.months[this.state.months.length - 1].firstDate;
    },
    
    /**
     * 获取日期的 time
     */
    getDateWithoutTime = (date) => {
      if (!date) return 0;
      //  === new Date(2019,2,1).getTime();    === 1551369600000
      return +new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      );
    },
    
    /**
     * 处理当月 获取当月以周-日为单位组成的二维数组，其前面以空的 {} 为填充
     * 
     *  @param { Date }   月份的第一天
     *  @returns { Array[]}         [[{},{},{ ,},{},{},{},{}],[],[]]
     */
    genWeekData = (firstDate) => {
      const minDateTime = this.getDateWithoutTime(this.props.minDate);
      const maxDateTime = this.getDateWithoutTime(this.props.maxDate) || Number.POSITIVE_INFINITY;
  
      const weeks = [];
      // 获取下一个月的第一天时间
      const nextMonth = this.getMonthDate(firstDate, 1).firstDate;
      let currentDay = firstDate;
      let currentWeek = [];
      weeks.push(currentWeek);
      // 获取此月第一天是星期几
      let startWeekday = currentDay.getDay();
      // 如果不是星期天  那就在数组中添加相应的空对象
      if (startWeekday > 0) {
        for (let i = 0; i < startWeekday; i++) {
          currentWeek.push({});
        }
      }

      // 循环遍历当月  
      while (currentDay < nextMonth) {
        if (currentWeek.length === 7) {
          currentWeek = [];
          weeks.push(currentWeek);
        }
        // 获取当月日期
        const dayOfMonth = currentDay.getDate();
        const tick = +currentDay;
        currentWeek.push({
          // 时间
          tick,
          // 存放 日期
          dayOfMonth,
          // 默认没有被选中
          selected: Models.SelectType.None,
          // 是否是一个月的第一天
          isFirstOfMonth: dayOfMonth === 1,
          // 是否是一个月的最后一天
          isLastOfMonth: false,
          // 是否超出范围
          outOfDate: tick < minDateTime || tick > maxDateTime,
        });
        // 加一天
        currentDay = new Date(currentDay.getTime() + 3600 * 24 * 1000);
      }
      // 最后一天 设置其 isLastOfMonth 为true 表示是最后一天
      currentWeek[currentWeek.length - 1].isLastOfMonth = true;
      return weeks;
    },
  
    genMonthData(date, addMonth) {
      if (!date) {
        date = addMonth >= 0 ? this.months[this.months.length - 1].firstDate : this.months[0].firstDate;
      }
      if (!date) {
        date = new Date;
      }
      const { locale } = this;

      // 获取此月的 第一天和最后一天
      const { firstDate, lastDate } = this.getMonthDate(date, addMonth);
      // 获取此月的 日 -> 周 二维数组
      const weeks = this.genWeekData(firstDate);
      const title = formatDate(firstDate, locale ? locale.monthTitle : 'yyyy/MM', this.locale);
      const data = {
        title,
        firstDate,
        lastDate,
        weeks,
      };
      data.component = this.genMonthComponent(data);
      if (addMonth >= 0) {
        this.months.push(data);
      } else {
        this.months.unshift(data);
      }
      const { startDate, endDate } = this;
      if (startDate) {
        this.selectDateRange(startDate, endDate);
      }
      return data;
    },
  
    inDate(date, tick) {
      return date <= tick && tick < date + 24 * 3600000;
    },
  
    selectDateRange = (startDate, endDate, clear = false) => {
      const { getDateExtra, type, onSelectHasDisableDate } = this;
      if (type === 'one') {
        endDate = undefined;
      }
      const time1 = this.getDateWithoutTime(startDate), time2 = this.getDateWithoutTime(endDate);
      const startDateTick = !time2 || time1 < time2 ? time1 : time2;
      const endDateTick = time2 && time1 > time2 ? time1 : time2;
  
      const startMonthDate = this.getMonthDate(new Date(startDateTick)).firstDate;
      const endMonthDate = endDateTick ? new Date(endDateTick) : this.getMonthDate(new Date(startDateTick)).lastDate;
  
      let unuseable= [], needUpdate = false;
      this.state.months
        .filter(m => {
          return m.firstDate >= startMonthDate && m.firstDate <= endMonthDate;
        })
        .forEach(m => {
          m.weeks.forEach(w => w
            .filter(d => {
              if (!endDateTick) {
                return d.tick && this.inDate(startDateTick, d.tick);
              } else {
                return d.tick && d.tick >= startDateTick && d.tick <= endDateTick;
              }
            })
            .forEach(d => {
              const oldValue = d.selected;
              if (clear) {
                d.selected = Models.SelectType.None;
              } else {
                const info = getDateExtra && getDateExtra(new Date(d.tick)) || {};
                if (d.outOfDate || info.disable) {
                  unuseable.push(d.tick);
                }
                if (this.inDate(startDateTick, d.tick)) {
                  if (type === 'one') {
                    d.selected = Models.SelectType.Single;
                  } else if (!endDateTick) {
                    d.selected = Models.SelectType.Only;
                  } else if (startDateTick !== endDateTick) {
                    d.selected = Models.SelectType.Start;
                  } else {
                    d.selected = Models.SelectType.All;
                  }
                } else if (this.inDate(endDateTick, d.tick)) {
                  d.selected = Models.SelectType.End;
                } else {
                  d.selected = Models.SelectType.Middle;
                }
              }
              needUpdate = needUpdate || d.selected !== oldValue;
            })
          );
          if (needUpdate && m.componentRef) {
            m.componentRef.updateWeeks();
            m.componentRef.forceUpdate();
          };
        });
      if (unuseable.length > 0) {
        if (onSelectHasDisableDate) {
          onSelectHasDisableDate(unuseable.map(tick => new Date(tick)));
        } else {
          console.warn('Unusable date. You can handle by onSelectHasDisableDate.', unuseable);
        }
      }
    },
  
    computeVisible = (clientHeight, scrollTop) => {
      let needUpdate = false;
      const MAX_VIEW_PORT = clientHeight * 2;
      const MIN_VIEW_PORT = clientHeight;
  
      // 大缓冲区外过滤规则
      const filterFunc = (vm) => vm.y && vm.height && (vm.y + vm.height > scrollTop - MAX_VIEW_PORT && vm.y < scrollTop + clientHeight + MAX_VIEW_PORT);
  
      if (this.props.infiniteOpt && this.visibleMonth.length > 12) {
        this.visibleMonth = this.visibleMonth.filter(filterFunc).sort((a, b) => +a.firstDate - +b.firstDate);
      }
  
      // 当小缓冲区不满时填充
      if (this.visibleMonth.length > 0) {
        const last = this.visibleMonth[this.visibleMonth.length - 1];
        if (last.y !== undefined && last.height && last.y + last.height < scrollTop + clientHeight + MIN_VIEW_PORT) {
          const lastIndex = this.state.months.indexOf(last);
          for (let i = 1; i <= 2; i++) {
            const index = lastIndex + i;
            if (index < this.state.months.length && this.visibleMonth.indexOf(this.state.months[index]) < 0) {
              this.visibleMonth.push(this.state.months[index]);
            } else {
              this.canLoadNext() && this.genMonthData(undefined, 1);
            }
          }
          needUpdate = true;
        }
  
        const first = this.visibleMonth[0];
        if (first.y !== undefined && first.height && first.y > scrollTop - MIN_VIEW_PORT) {
          const firstIndex = this.state.months.indexOf(first);
          for (let i = 1; i <= 2; i++) {
            const index = firstIndex - i;
            if (index >= 0 && this.visibleMonth.indexOf(this.state.months[index]) < 0) {
              this.visibleMonth.unshift(this.state.months[index]);
              needUpdate = true;
            }
          }
        }
      } else if (this.state.months.length > 0) {
        this.visibleMonth = this.state.months.filter(filterFunc);
        needUpdate = true;
      }
  
      return needUpdate;
    },
  
    createOnScroll = () => {
      let timer;
      let clientHeight = 0, scrollTop = 0;
  
      return (data = { full, client, top }) => {
        const { client, top } = data;
        clientHeight = client;
        scrollTop = top;
  
        if (timer) {
          return;
        }
  
        timer = setTimeout(() => {
          timer = undefined;
          if (this.computeVisible(clientHeight, scrollTop)) {
            this.forceUpdate();
          }
        }, 64);
      };
    },
  
    onCellClick = (day) => {
      if (!day.tick) return;
      this.props.onCellClick && this.props.onCellClick(new Date(day.tick));
    }
  }
}