<template>
  <div class="g2-calendar">
    <span class="calendar-wrapper">
      <div class="calendar-content">
        <g2CalendarHeader></g2CalendarHeader>
        <g2DatePicker :months="months"></g2DatePicker>
      </div>
    </span>
  </div>
</template>

<script>
import g2CalendarHeader from "./calendar/calendar-header.vue";
import g2DatePicker from "./date-picker/index.vue";
import emitterMixins from "@/utils/emitter.js";
import propsMixins from "./calendarProps.js";
import { formatDate } from "./date-picker/utils.js";
import SelectType from "../models/SelectType.js";

export default {
  name: "g2Calendar",
  componentName: "g2Calendar",
  mixins: [emitterMixins, propsMixins],
  components: {
    g2CalendarHeader,
    g2DatePicker
  },
  data() {
    return {
      minDate: new Date(2019, 0, 24),
      maxDate: new Date(2019, 5, 24),
      startDate: new Date(2019, 1, 5),
      endDate: new Date(2019, 1, 5),
      disConfirmBtn: false,
      showTimePicker: false,
      weekComponent: [],
      visibleMonth: [],
      months: []
    };
  },
  created() {
    this.initMonth();
    this.$on("cell-click", this.fnCellClick);
  },
  methods: {
    /**
     * 点击了 某一天的开始处理函数
     * 
     */
    fnCellClick(cellVm) {
      debugger;
      console.log(cellVm);
      const { value, onSelect, startDate, endDate } = this;
      const { date } = cellVm;
      if (onSelect) {
        let value = onSelect(date, [startDate, endDate]);
        // if (value) {
        //   this.shortcutSelect(value[0], value[1]);
        //   return;
        // }
      }
      this.selectDate(date, false, { startDate, endDate });
      // this.selectDateRange()
    },
    selectDate(date, useDateTime = false, oldState = {}, props) {
      if (!date) return {};

      const { type, pickTime, defaultTimeValue, locale = {} } = this;
      const newDate =
        pickTime && !useDateTime ? mergeDateTime(date, defaultTimeValue) : date;
      const { startDate, endDate } = oldState;

      switch (type) {
        case "one":
          this.startDate = newDate;
          this.disConfirmBtn = false;

          if (pickTime) {
            this.timePickerTitle = locale.selectTime;
            this.showTimePicker = true;
          }
          break;

        case "range":
          if (!startDate || endDate) {
            this.startDate = newDate;
            this.endDate = undefined;
            this.disConfirmBtn = true;

            if (pickTime) {
              this.timePickerTitle = locale.selectStartTime;
              this.showTimePicker = true;
            }
          } else {
            this.timePickerTitle =
              +newDate >= +startDate
                ? locale.selectEndTime
                : locale.selectStartTime;
            this.disConfirmBtn = false;
            this.endDate =
              pickTime && !useDateTime && +newDate >= +startDate
                ? new Date(+mergeDateTime(newDate, startDate) + 3600000)
                : newDate;
          }
          break;
      }
    },

    initMonth() {
      debugger;
      const { initalMonths = 6, defaultDate } = this;
      for (let i = 0; i < initalMonths; i++) {
        this.canLoadNext() && this.genMonthData(defaultDate, i);
      }
      this.visibleMonth = [...this.months];
    },
    /**
     * 点击选中日期
     */
    onSelectedDate(date) {
      const { startDate, endDate, onSelect } = this;
      if (onSelect) {
        let value = onSelect(date, [startDate, endDate]);
        if (value) {
          this.shortcutSelect(value[0], value[1]);
          return;
        }
      }
      this.selectDate(date, false, { startDate, endDate });
    },

    genMonthData(date, addMonth) {
      if (!date) {
        date =
          addMonth >= 0
            ? this.months[this.months.length - 1].firstDate
            : this.months[0].firstDate;
      }
      if (!date) {
        date = new Date();
      }
      const { locale } = this;

      // 获取此月的 第一天和最后一天
      const { firstDate, lastDate } = this.getMonthDate(date, addMonth);
      // 获取此月的 日 -> 周 二维数组
      const weeks = this.genWeekData(firstDate);
      const title = formatDate(
        firstDate,
        locale ? locale.monthTitle : "yyyy/MM",
        this.locale
      );
      const data = {
        title,
        firstDate,
        lastDate,
        weeks
      };
      // data.component = this.genMonthComponent(data);
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

    canLoadPrev() {
      const { minDate } = this;
      return (
        !minDate ||
        this.months.length <= 0 ||
        +this.getMonthDate(minDate).firstDate < +this.months[0].firstDate
      );
    },

    canLoadNext() {
      const { maxDate } = this;
      return (
        !maxDate ||
        this.months.length <= 0 ||
        +this.getMonthDate(maxDate).firstDate >
          +this.months[this.months.length - 1].firstDate
      );
    },
    /**
     * 获取此月 和 下几个月的  第一天和最后一天
     * @author guzhanghua
     * @param {*} [date=new Date]
     * @param {number} [addMonth=0]
     * @returns
     */
    getMonthDate(date = new Date(), addMonth = 0) {
      const y = date.getFullYear(),
        m = date.getMonth();
      return {
        firstDate: new Date(y, m + addMonth, 1),
        lastDate: new Date(y, m + 1 + addMonth, 0)
      };
    },
    /**
     * 获取日期的 time
     */
    getDateWithoutTime(date) {
      if (!date) return 0;
      //  === new Date(2019,2,1).getTime();    === 1551369600000
      return +new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },
    /**
     * 处理当月 获取当月以周-日为单位组成的二维数组，其前面以空的 {} 为填充
     *
     *  @param { Date }   月份的第一天
     *  @returns { Array[]}         [[{},{},{ ,},{},{},{},{}],[],[]]
     */
    genWeekData(firstDate) {
      const DEFAULT_DAY_MODEL = {
        // 时间
        tick: 0,
        // 存放 日期
        dayOfMonth: 0,
        // 存放的星期
        dayOfWeek: 0,
        // 默认没有被选中
        selected: SelectType.None,
        // 是否是一个月的第一天
        isFirstOfMonth: false,
        // 是否是一个月的最后一天
        isLastOfMonth: false,
        // 是否超出范围
        outOfDate: false
      };
      const minDateTime = this.getDateWithoutTime(this.minDate);
      const maxDateTime =
        this.getDateWithoutTime(this.maxDate) || Number.POSITIVE_INFINITY;

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
          currentWeek.push(DEFAULT_DAY_MODEL);
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
          // 存放的星期
          dayOfWeek: currentDay.getDay(),
          // 默认没有被选中
          selected: SelectType.None,
          // 是否是一个月的第一天
          isFirstOfMonth: dayOfMonth === 1,
          // 是否是一个月的最后一天
          isLastOfMonth: false,
          // 是否超出范围
          outOfDate: tick < minDateTime || tick > maxDateTime
        });
        // 加一天
        currentDay = new Date(currentDay.getTime() + 3600 * 24 * 1000);
      }
      // 最后一天 设置其 isLastOfMonth 为true 表示是最后一天
      currentWeek[currentWeek.length - 1].isLastOfMonth = true;
      return weeks;
    },

    /**
     *
     *
     */
    selectDateRange(startDate, endDate, clear = false) {
      debugger;
      const { getDateExtra, type, onSelectHasDisableDate } = this;
      // 如果是单选 则直接 endDate = undefiend
      if (type === "one") {
        endDate = undefined;
      }
      const time1 = this.getDateWithoutTime(startDate),
        time2 = this.getDateWithoutTime(endDate);
      const startDateTick = !time2 || time1 < time2 ? time1 : time2;
      const endDateTick = time2 && time1 > time2 ? time1 : time2;

      const startMonthDate = this.getMonthDate(new Date(startDateTick))
        .firstDate;
      const endMonthDate = endDateTick
        ? new Date(endDateTick)
        : this.getMonthDate(new Date(startDateTick)).lastDate;

      let unuseable = [],
        needUpdate = false;
      this.months
        .filter(m => {
          return m.firstDate >= startMonthDate && m.firstDate <= endMonthDate;
        })
        .forEach(m => {
          m.weeks.forEach(w =>
            w
              .filter(d => {
                if (!endDateTick) {
                  return d.tick && this.inDate(startDateTick, d.tick);
                } else {
                  return (
                    d.tick && d.tick >= startDateTick && d.tick <= endDateTick
                  );
                }
              })
              .forEach(d => {
                const oldValue = d.selected;
                if (clear) {
                  d.selected = SelectType["None"];
                } else {
                  const info =
                    (getDateExtra && getDateExtra(new Date(d.tick))) || {};
                  if (d.outOfDate || info.disable) {
                    unuseable.push(d.tick);
                  }
                  if (this.inDate(startDateTick, d.tick)) {
                    if (type === "one") {
                      d.selected = SelectType.Single;
                    } else if (!endDateTick) {
                      d.selected = SelectType.Only;
                    } else if (startDateTick !== endDateTick) {
                      d.selected = SelectType.Start;
                    } else {
                      d.selected = SelectType.All;
                    }
                  } else if (this.inDate(endDateTick, d.tick)) {
                    d.selected = SelectType.End;
                  } else {
                    d.selected = SelectType.Middle;
                  }
                }
                needUpdate = needUpdate || d.selected !== oldValue;
              })
          );
          // if (needUpdate && m.componentRef) {
          //   m.componentRef.updateWeeks();
          //   m.componentRef.forceUpdate();
          // };
        });
      if (unuseable.length > 0) {
        if (onSelectHasDisableDate) {
          onSelectHasDisableDate(unuseable.map(tick => new Date(tick)));
        } else {
          console.warn(
            "Unusable date. You can handle by onSelectHasDisableDate.",
            unuseable
          );
        }
      }
    },
    inDate(date, tick) {
      return date <= tick && tick < date + 24 * 3600000;
    }
  }
};
</script>

<style lang="scss" scoped>
.g2-calendar .calendar-content {
  position: fixed;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: #fff;
  .date-picker {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    background: #eee;
  }
}
</style>

