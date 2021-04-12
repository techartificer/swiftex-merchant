<template>
  <div>
    <Login v-if="!IsLoggedIn"/>
    <Dashboard v-else />
    <!-- <div v-else> {{CurrentShop}}</div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard/Dashboard.vue';

export default {
  name: 'Home',
  components: {
    Login,
    Dashboard,
  },
  computed: {
    ...mapGetters(['IsLoggedIn', 'CurrentShop']),
  },
};
</script>
