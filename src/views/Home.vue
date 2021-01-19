<template>
  <div>
    <Login v-if="!IsLoggedIn"/>
    <div v-else> {{CurrentShop}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import Login from '../components/Login.vue';

export default {
  name: 'Home',
  components: {
    Login,
  },
  computed: {
    ...mapGetters(['IsLoggedIn', 'CurrentShop']),
  },
};
</script>
