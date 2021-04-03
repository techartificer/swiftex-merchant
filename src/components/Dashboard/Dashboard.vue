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
      <v-flex>

      </v-flex>
      <v-layout row wrap class="pa-12">
        <v-flex sm6 xs12 md6 lg4>
          <v-card class="ma-3" outlined color="#f5f5f5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="teal" width="80" height="80" elevation="10">
                  <v-icon dark large>mdi-clipboard-list-outline</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">
                  Orders Placed
                </div>
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-list-item-title class="headline mb-1 text-right">
                  {{dashboard.total || 0}}
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg4>
          <v-card class="ma-3" outlined color="#f5f5f5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="green" width="80" height="80" elevation="10">
                  <v-icon dark large>mdi-playlist-check</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">
                  Orders Delivered
                </div>
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-list-item-title class="headline mb-1 text-right">
                  {{dashboard.delivered || 0}}
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg4>
          <v-card class="ma-3" outlined color="#f5f5f5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="orange" width="80" height="80" elevation="10">
                  <v-icon dark large>mdi-bike-fast</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">
                  Orders In Transit
                </div>
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-list-item-title class="headline mb-1 text-right">
                  {{dashboard.inTransit || 0}}
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg4>
          <v-card class="ma-3" outlined color="#f5f5f5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="secondary" width="80" height="80" elevation="10">
                  <v-icon dark large>mdi-playlist-remove</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">
                  Orders Returned
                </div>
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-list-item-title class="headline mb-1 text-right">
                  {{dashboard.returned || 0}}
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg4>
          <v-card class="ma-3" outlined color="#f5f5f5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="blue" width="80" height="80" elevation="10">
                  <v-icon dark large>mdi-brightness-percent</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">
                  Successful Delivery
                </div>
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-list-item-title class="headline mb-1 text-right">
                  {{successfulDelivery}}%
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg4>
          <v-card class="ma-3" outlined color="#f5f5f5">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="red" width="80" height="80" elevation="10">
                  <v-icon dark large>mdi-close-outline</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">
                  Orders Cancelled
                </div>
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-list-item-title class="headline mb-1 text-right">
                  0
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    dashboard: {},
    isFetching: false,
  }),
  computed: {
    ...mapGetters(['CurrentShop']),
    successfulDelivery() {
      const rate = (Number(this.dashboard?.delivered) / Number(this.dashboard?.total)) * 100;
      if (Number.isNaN(rate)) return 0;
      if (rate === 100 || rate === 0) return 100;
      return rate?.toFixed(2);
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
