import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import admin from './modules/admin';
import shop from './modules/shop';
import order from './modules/order';
import merchant from './modules/merchant';
import credit from './modules/credit';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    credit,
    merchant,
    order,
    shop,
    admin,
    auth,
  },
});
