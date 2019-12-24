import Vue from 'vue';
import { setStyle } from '@/utils/dom.js';

let innerHeight = window.innerHeight;

document.addEventListener('resize', _ => {
  innerHeight = window.innerHeight;
  Vue.prototype.$innerHeight = innerHeight;
});

Vue.prototype.$innerHeight = innerHeight;
if (document.querySelector('#app')) {
  setStyle(document.querySelector('body'), 'minHeight', `${innerHeight}px`);
}
