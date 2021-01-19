import instance from '../../helpers/axios';

export default {
  state: {
    shop: null,
    myShops: [],
  },
  mutations: {
    SET_SHOP_DATA(state, data) {
      state.shop = data;
      localStorage.setItem('currentShopId', data?.id);
    },
    SET_MY_SHOPS(state, data) {
      state.myShops = data;
    },
  },
  actions: {
    async SHOP_BY_ID_REQUEST({ commit }, id) {
      try {
        const { data } = await instance.get(`/shop/id/${id}`);
        commit('SET_SHOP_DATA', data?.data);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async CREATE_SHOP_REQUEST({ commit }, payload) {
      try {
        const { data } = await instance.post('/shop/create', payload);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async MY_SHOPS_REQUEST({ commit }) {
      try {
        const { data } = await instance.get('/shop/myshops');
        commit('SET_MY_SHOPS', data?.data);
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
