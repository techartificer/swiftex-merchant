import instance from '../../helpers/axios';

export default {
  state: {
    admins: [],
    profile: {},
  },
  mutations: {
    SET_ADMINS(state, admins) {
      state.admins = admins;
    },
    ADD_ADMIN(state, admin) {
      state.admins = [admin, ...state.admins];
    },
    SET_ADMIN_PROFILE(state, data) {
      state.profile = data;
    },
    UPDATE_ADMIN(state, admin) {
      const index = state.admins.findIndex((a) => a.id === admin.id);
      if (index > -1) {
        const admins = state.admins?.slice(0, state.admins.length);
        admins[index] = admin;
        state.admins = admins;
      }
    },
  },
  actions: {
    async UPDATE_ADMIN_REQUEST({ commit }, { id, updatedData }) {
      try {
        const { data } = await instance.patch(`/admin/update/${id}`, updatedData);
        commit('UPDATE_ADMIN', data?.data);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async ALL_ADMINS_REQUEST({ commit }) {
      try {
        const { data } = await instance.get('/admin/all');
        commit('SET_ADMINS', data?.data);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async ADMIN_PROFILE_REQUEST({ commit }) {
      try {
        const { data } = await instance.get('/admin/profile');
        commit('SET_ADMIN_PROFILE', data?.data);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async ADD_ADMIN_REQUEST({ commit }, payload) {
      try {
        const { data } = await instance.post('/admin/add', payload);
        commit('ADD_ADMIN', data?.data);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    Admins: (state) => state.admins,
    AdminProfile: (state) => state.profile,
  },
};
