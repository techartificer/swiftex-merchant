/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import admin from './modules/admin';
import shop from './modules/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shop,
    admin,
    auth,
  },
});
