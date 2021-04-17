<template>
  <forgot-pass />
</template>
<script>
import { mapGetters } from 'vuex';
import ForgotPass from '../components/auth/ForgotPass.vue';

export default {
  components: {
    ForgotPass,
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
