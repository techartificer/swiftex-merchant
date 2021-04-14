import instance from '../../helpers/axios';

export default {
  state: {
    orders: [],
    trcakedOrder: null,
    showTrackDialog: '',
  },
  mutations: {
    setOrders(state, data) {
      state.orders = data || [];
    },
    addOrders(state, data) {
      state.orders = [data, ...state.orders];
    },
    closeTrackDialog(state) {
      state.showTrackDialog = false;
      state.trcakedOrder = null;
    },
    setTrackData(state, data) {
      state.trcakedOrder = data;
    },
    updateOrder(state, data) {
      const idx = state.orders.findIndex((o) => o.id === data.id);
      const orders = state.orders?.splice(0);
      orders[idx] = { ...orders[idx], ...data };
      setImmediate(() => {
        state.orders = orders;
      });
    },
  },
  actions: {
    async TRACK_ORDER({ commit, state }, trackId = '') {
      try {
        if (!trackId) return {};
        const { data } = await instance.get(`order/track/${trackId}`);
        commit('setTrackData', data.data);
        state.showTrackDialog = trackId;
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async UPDATE_ORDER({ commit, rootState }, payload = {}) {
      try {
        const { id, update } = payload;
        const shopId = rootState?.shop?.shop?.id;
        const { data } = await instance.patch(`order/id/${id}/shopId/${shopId}`, update);
        commit('updateOrder', data.data);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async ORDER_CREATE({ commit, rootState }, payload) {
      try {
        const shopId = rootState?.shop?.shop?.id;
        const { data } = await instance.post(`/order/create/${shopId}`, payload);
        commit('addOrders', data?.data);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async ORDERS_REQUEST({ commit }, payload) {
      try {
        const {
          lastId, shopId, phone, trackId, startDate, endDate,
        } = payload;
        const limit = 10;
        const query = `limit=${limit}&lastId=${lastId || ''}&phone=${phone || ''}&trackId=${trackId || ''}`;
        const dateQuery = `&startDate=${startDate || ''}&endDate=${endDate || ''}`;
        const { data } = await instance.get(`/order/all/${shopId}?${query}${dateQuery}`);
        commit('setOrders', data?.data);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    Orders: (state) => state.orders,
    ShowTrackDialog: (state) => state.showTrackDialog,
    TrcakedOrder: (state) => state.trcakedOrder,
  },
};
