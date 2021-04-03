import instance from '../../helpers/axios';

export default {
  state: {
    histories: [],
    trx: {},
  },
  mutations: {
    setHistories(state, { transaction, transactionHistory, makeEmpty = false }) {
      console.log(makeEmpty);
      state.trx = transaction;
      if (makeEmpty) state.histories = [];
      state.histories = state.histories || [];
      const histories = state.histories.splice(0);
      state.histories = [...histories, ...transactionHistory];
    },
  },
  actions: {
    async HISTORIES_BY_SHOP_ID({ commit }, payload = {}) {
      try {
        const { shopId, lastId } = payload;
        console.log(lastId);
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
