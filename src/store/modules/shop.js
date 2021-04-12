/* eslint-disable no-param-reassign */
import constants from '../../constants';
import instance from '../../helpers/axios';

export default {
  state: {
    shop: null,
    myShops: [],
  },
  mutations: {
    setShopData(state, data) {
      state.shop = data;
      localStorage.setItem(constants.CURRENT_SHOP_ID, data?.id);
    },
    setMyShops(state, data) {
      state.myShops = data;
    },
    addShop(state, data) {
      state.myShops = state.myShops || [];
      const shops = state.myShops?.splice(0);
      state.myShops = [...shops, data];
    },
    updateShop(state, data) {
      const idx = state.myShops.findIndex((s) => s.id === data.id);
      if (idx >= 0) {
        const shops = state.myShops.splice(0);
        shops[idx] = data;
        state.myShops = shops;
        if (state.shop.id === data.id) {
          state.shop = data;
        }
      }
    },
  },
  actions: {
    async UPDATE_SHOP_BY_SHOP_ID({ commit }, payload = { shopId: '', update: '' }) {
      try {
        const { shopId, update } = payload;
        const { data } = await instance.patch(`/shop/id/${shopId}`, update);
        commit('updateShop', data.data);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async DASHBOARD_BY_SHOP_ID({ state }, payload) {
      try {
        const id = state.shop?.id || payload;
        if (!id) return {};
        const { data } = await instance.get(`/shop/dashboard/${id}`);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async SHOP_BY_ID_REQUEST({ commit }, id) {
      try {
        const { data } = await instance.get(`/shop/id/${id}`);
        commit('setShopData', data?.data);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async CREATE_SHOP_REQUEST({ commit }, payload) {
      try {
        const { data } = await instance.post('/shop/create', payload);
        commit('addShop', data?.data?.shop);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async MY_SHOPS_REQUEST({ commit }) {
      try {
        const { data } = await instance.get('/shop/myshops');
        commit('setMyShops', data?.data);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    MyShops: (state) => state.myShops,
    CurrentShop: (state) => state.shop,
  },
};
