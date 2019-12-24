import g2SingleDay from "./single-day.vue";

export default {
  name: 'g2SingleWeek',
  components: {
    g2SingleDay
  },
  props: {
    week: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  render(h){
    return (
      <div class="row">
        {this.week.map(day => {
          if(day){
            return <g2SingleDay date={day.tick} selected={day.selected} day={day.dayOfMonth} dayOfWeek={day.dayOfWeek} outOfDate={day.outOfDate} />
          }else{
            return ''
          }

        })}
      </div>
      
    )
  }
};
