import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/my-shops',
    name: 'My Shops',
    component: () => import('../views/MyShops'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/parcels',
    name: 'Parcels',
    component: () => import('../views/Parcels'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register     ',
    component: () => import('../views/Register'),
  },
  // {
  //   path: '/*',
  //   name: '404',
  //   redirect: '/',
  // },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store?.getters?.IsLoggedIn) {
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
});

export default router;
