import axios from 'axios';
import instance from '../../helpers/axios';
import { baseURL } from '../../constants/api';
import constants from '../../constants';

export default {
  state: {
    accessToken: localStorage.getItem(constants.ACCESS_TOKEN),
    refreshToken: localStorage.getItem(constants.REFRESH_TOKEN),
    permission: localStorage.getItem(constants.PERMISSION),
  },
  mutations: {
    SET_AUTH_DATA(state, { accessToken, refreshToken, permission }) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      if (accessToken) { localStorage.setItem(constants.ACCESS_TOKEN, accessToken); }
      if (refreshToken) { localStorage.setItem(constants.REFRESH_TOKEN, refreshToken); }
      if (permission) {
        state.permission = permission;
        localStorage.setItem(constants.PERMISSION, permission);
      }
    },
    CLEAR_AUTH_DATA(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem(constants.ACCESS_TOKEN);
      localStorage.removeItem(constants.REFRESH_TOKEN);
      localStorage.removeItem(constants.PERMISSION);
      localStorage.removeItem(constants.CURRENT_SHOP_ID);
    },
  },
  actions: {
    async FORGOT_PASSWORD({ commit }, payload = { token: '', phone: '', password: '' }) {
      try {
        const { data } = await instance.patch('merchant/forgot-password', payload);
        commit('SET_AUTH_DATA', data?.data);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async MERCHANT_LOGIN_REQUEST({ commit }, payload) {
      try {
        const { data } = await instance.post('/auth/merchant/login', payload);
        commit('SET_AUTH_DATA', data?.data);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async REFRESH_TOKEN_REQUEST({ commit, state }) {
      try {
        const { data } = await axios({
          method: 'patch',
          url: `${baseURL}/v1/auth/refresh-token`,
          headers: {
            agent: 'browser',
            authorization: state.accessToken ? `Bearer ${state.accessToken}` : undefined,
            RefreshToken: `${state.refreshToken}`,
          },
        });
        commit('SET_AUTH_DATA', data?.data);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async LOGOUT_REQUEST({ commit }) {
      try {
        await instance.delete('/auth/logout');
        commit('CLEAR_AUTH_DATA');
        window.location.replace('/');
        return 'done';
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    IsLoggedIn: (state) => !!state.accessToken && !!state.refreshToken,
    AccessToken: (state) => state.accessToken,
    RefreshToken: (state) => state.refreshToken,
    Permission: (state) => state.permission,
  },
};
