import g2Calendar from './src/calendar.vue';

g2Calendar.install = Vue => {
  Vue.component(g2Calendar.name, g2Calendar);
};

export default g2Calendar;
