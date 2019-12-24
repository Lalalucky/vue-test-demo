import Vue from 'vue';
import Vuex from 'vuex';

import base from './modules/base';
import profile from './modules/profile';
import crm from './modules/crm';
import calendar from './modules/calendar';
import report from './modules/report';
import home from './modules/home';
import project from './modules/project';
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    base,
    profile,
    crm,
    calendar,
    report,
    home,
    project
  }
  // strict: debug
  // plugins: debug ? [createLogger()] : []
});
