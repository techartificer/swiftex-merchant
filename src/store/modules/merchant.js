import instance from '../../helpers/axios';

export default {
  state: {},
  mutations: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async IS_USERNAME_AVAILABLE({ commit }, payload) {
      try {
        const { data } = await instance.get(`/merchant/is-available/${payload}`);
        return data.data.available;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async REGISTER({ commit }, { body, token }) {
      try {
        const { data } = await instance.post('/merchant/register/', body, {
          headers: { FirebaseToken: token },
        });
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {},
};
