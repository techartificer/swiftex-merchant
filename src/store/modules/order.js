import instance from '../../helpers/axios';

export default {
  state: {
    orders: [],
  },
  mutations: {
    SET_ORDERS(state, data) {
      state.orders = data || [];
    },
  },
  actions: {
    async ORDERS_REQUEST({ commit }, payload) {
      try {
        const { lastId, shopId } = payload;
        const limit = 10;
        const { data } = await instance.get(`/order/all/${shopId}?limit=${limit}&lastId=${lastId || ''}`);
        commit('SET_ORDERS', data?.data);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    Orders: (state) => state.orders,
  },
};
