<template>
  <div></div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  async created() {
    try {
      await this.LOGOUT_REQUEST();
    } catch (err) {
      // console.log(err);
      this.$router.push('/');
    }
  },
  methods: {
    ...mapActions(['LOGOUT_REQUEST']),
  },
};
</script>
