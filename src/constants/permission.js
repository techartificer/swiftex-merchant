const moderator = [
  { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/' },
  { icon: 'mdi-format-list-checks', title: 'Order', to: '/orders' },
  { icon: 'mdi-account-details', title: 'Merchant', to: '/merchant' },
  { icon: 'mdi-moped', title: 'Rider', to: '/rider' },
  { icon: 'mdi-map', title: 'Area', to: '/area' },
];
const superAdmin = [
  { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/' },
  { icon: 'mdi-format-list-checks', title: 'My Shops', to: '/my-shops' },
  { icon: 'mdi-cash-usd', title: 'Payments', to: '/payments' },
  { icon: 'mdi-account-details', title: 'Merchant', to: '/merchant' },
  { icon: 'mdi-account-group', title: 'Moderator', to: '/moderator' },
  { icon: 'mdi-bike', title: 'Transport', to: '/transport' },
  { icon: 'mdi-ticket-percent', title: 'Coupon', to: '/coupon' },
  { icon: 'mdi-map', title: 'Area', to: '/area' },
];
const admin = [
  { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/' },
  { icon: 'mdi-format-list-checks', title: 'Order', to: '/orders' },
  { icon: 'mdi-moped', title: 'Rider', to: '/rider' },
  { icon: 'mdi-account-details', title: 'Merchant', to: '/merchant' },
  { icon: 'mdi-bike', title: 'Transport', to: '/transport' },
  { icon: 'mdi-ticket-percent', title: 'Coupon', to: '/coupon' },
  { icon: 'mdi-cash-usd', title: 'Payments', to: '/payments' },
  { icon: 'mdi-map', title: 'Area', to: '/area' },
];
const common = [];

module.exports = {
  admin, superAdmin, moderator, common,
};
