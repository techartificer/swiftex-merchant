<template>
  <div>
    <Register />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Register from '../components/auth/Register.vue';

export default {
  components: {
    Register,
  },
  computed: {
    ...mapGetters(['IsLoggedIn']),
  },
  mounted() {
    if (this.IsLoggedIn) {
      this.$router.push('/');
    }
  },
};
</script>
