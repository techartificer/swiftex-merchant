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
        <div>
          Pick the date to analysis
        </div>
        <v-dialog
          light
          ref="dialog"
          v-model="modal"
          :return-value.sync="dates"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              single-line
              outlined
              dense
              label="Date range"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dates"
            scrollable
            range
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="modal = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dialog.save(dates)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-layout row wrap>
        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="purple" width="80" height="80" elevation="10">
                  <v-icon dark large>mdi-credit-card-multiple</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">
                  Swiftex credit
                </div>
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-list-item-title class="headline mb-1 text-right">
                0.00
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="yellow" width="80" height="80" elevation="10">
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
                  {{dashboard.total}}
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
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
                  {{dashboard.delivered}}
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="orange" width="80" height="80" elevation="10">
                  <v-icon dark large>mdi-format-list-text</v-icon>
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
                  {{dashboard.inTransit}}
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="red" width="80" height="80" elevation="10">
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
                  {{dashboard.returned}}
              </v-list-item-title>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="blue" width="80" height="80" elevation="10">
                  <v-icon dark large>mdi-list-status</v-icon>
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
