<template>
  <div class="root">
    <div class="head">
      Dashboard
    </div>
    <div v-if="isFetching">
      <v-card class="mx-auto" width="150" flat>
        <v-card-text class="loading">
          <v-progress-circular
          :size="70"
          :width="5"
          color="primary"
          indeterminate
        ></v-progress-circular>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <v-layout row wrap class="pa-12">
        <v-flex sm6 xs12 md4 lg3
        v-for="d, idx in dashaboardData" :key="idx">
          <card :data="d"/>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Card from './Card.vue';

export default {
  components: {
    Card,
  },
  data: () => ({
    dashboard: {},
    isFetching: false,
  }),
  computed: {
    ...mapGetters(['CurrentShop']),
    successfulDelivery() {
      const rate = (Number(this.dashboard?.delivered) / Number(this.dashboard?.total)) * 100;
      if (Number.isNaN(rate)) return `${0}%`;
      if (rate === 100 || rate === 0) return `${100}%`;
      return `${rate?.toFixed(2)}%`;
    },
    dashaboardData() {
      const dashboard = [
        {
          text: 'Orders placed', color: 'teal', icon: 'mdi-clipboard-list-outline', count: this.dashboard?.total,
        },
        {
          text: 'Orders pending', color: '#350d36', icon: 'mdi-progress-clock', count: this.dashboard?.pending,
        },
        {
          text: 'Orders In Transit', color: 'orange', icon: 'mdi-bike-fast', count: this.dashboard?.inTransit,
        },
        {
          text: 'Orders Cancelled', color: 'black', icon: 'mdi-playlist-remove', count: this.dashboard?.cancelled,
        },
        {
          text: 'Orders returned', color: '#1264a3', icon: 'mdi-reload', count: this.dashboard?.returned,
        },
        {
          text: 'Orders Delivered', color: 'green', icon: 'mdi-playlist-check', count: this.dashboard?.delivered,
        },
        {
          text: 'Orders rejected', color: 'red', icon: 'mdi-close-outline', count: this.dashboard?.declined,
        },
        {
          text: 'SUCCESSFUL DELIVERY', color: 'blue', icon: 'mdi-brightness-percent', count: this.successfulDelivery,
        },
      ];
      return dashboard;
    },
  },
  watch: {
    CurrentShop(val) {
      this.dashboardData(val?.id);
    },
  },
  mounted() {
    this.dashboardData();
  },
  methods: {
    ...mapActions(['DASHBOARD_BY_SHOP_ID']),
    async dashboardData(id) {
      try {
        this.isFetching = true;
        this.dashboard = await this.DASHBOARD_BY_SHOP_ID(id);
      } catch (err) {
        // err
      }
      this.isFetching = false;
    },
  },
};
</script>
<style scoped>
.loading {
    margin-top: 35vh;
}

</style>
