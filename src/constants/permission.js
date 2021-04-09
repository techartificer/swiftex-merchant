const MODERATOR = [
  { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/' },
  { icon: 'mdi-format-list-checks', title: 'Parcels', to: '/parcels' },
  { icon: 'mdi-store', title: 'My Shops', to: '/my-shops' },
  { icon: 'mdi-account-group', title: 'Moderator', to: '/moderator' },
  { icon: 'mdi-ticket-percent', title: 'Coupon', to: '/coupon' },
  { icon: 'mdi-map', title: 'Coverage Area', to: '/area' },
  { icon: 'mdi-alert-octagon', title: 'Raise Issue', to: '/issue' },
  { icon: 'mdi-alert-octagon', title: 'Logout', to: '/logout' },
];
const OWNER = [
  { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/' },
  { icon: 'mdi-format-list-checks', title: 'Parcels', to: '/parcels' },
  { icon: 'mdi-store', title: 'My Shops', to: '/my-shops' },
  // { icon: 'mdi-credit-card-outline', title: 'Payment', to: '/payment' },
  { icon: 'mdi-cash-usd', title: 'Transaction', to: '/transactions' },
  // { icon: 'mdi-account-group', title: 'Moderator', to: '/moderator' },
  // { icon: 'mdi-ticket-percent', title: 'Coupon', to: '/coupon' },
  // { icon: 'mdi-map', title: 'Coverage Area', to: '/area' },
  // { icon: 'mdi-alert-octagon', title: 'Raise Issue', to: '/issue' },
  { icon: 'mdi-logout', title: 'Logout', to: '/logout' },
];
const COMMON = [];

module.exports = {
  OWNER, MODERATOR, COMMON,
};
