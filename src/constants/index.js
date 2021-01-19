// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
  errorCodes: {
    LOGGED_OUT: '404002',
    EXPIRED_JWT: '401003',
  },
  roles: {
    OWNER: 'Owner',
    MODERATOR: 'Moderator',
  },
  events: {
    SHOW_SHOP_CU_DIALOG: 'showShopCreateUpdateDialog',
  },
  PERMISSION: 'permission',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  CURRENT_SHOP_ID: 'currentShopId',
  EMAIL_REGEX: re,
};
