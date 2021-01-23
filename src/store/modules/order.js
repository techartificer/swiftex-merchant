import instance from '../../helpers/axios';

export default {
  state: {
    orders: [],
  },
  mutations: {
    SET_ORDERS(state, data) {
      state.orders = data || [];
    },
    ADD_ORDER(state, data) {
      state.orders = [data, ...state.orders];
    },
  },
  actions: {
    async ORDER_CREATE({ commit, rootState }, payload) {
      try {
        console.log(rootState?.shop?.shop?.id);
        const shopId = rootState?.shop?.shop?.id;
        const { data } = await instance.post(`/order/create/${shopId}`, payload);
        commit('ADD_ORDER', data?.data);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
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
