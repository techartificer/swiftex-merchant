import instance from '../../helpers/axios';

export default {
  state: {
    histories: [],
    trx: {},
  },
  mutations: {
    setHistories(state, { transaction, transactionHistory, makeEmpty = false }) {
      state.trx = transaction;
      if (makeEmpty) state.histories = [];
      state.histories = state.histories || [];
      const histories = state.histories.splice(0);
      state.histories = [...histories, ...transactionHistory];
    },
    updateTrxAmount(state, payload) {
      state.trx = { ...state.trx, ...payload };
    },
  },
  actions: {
    async GENERATE_TRX_CODE_BY_SHOP_ID({ rootState, commit }, payload = {}) {
      try {
        const { amount } = payload;
        const { id: shopId } = rootState.shop.shop;
        if (!shopId) return {};
        const { data } = await instance.patch(`/transaction/generate-trx-code/${shopId}`, { amount });
        commit('updateTrxAmount', { amount });
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async HISTORIES_BY_SHOP_ID({ commit }, payload = {}) {
      try {
        const { shopId, lastId } = payload;
        if (!shopId) return {};
        const { data } = await instance.get(`/transaction/shopId/${shopId}?lastId=${lastId || ''}`);
        commit('setHistories', { ...data.data, makeEmpty: !lastId });
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    Histories: (state) => state.histories,
    Trx: (state) => state.trx,
  },
};
