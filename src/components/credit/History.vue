<template>
  <div>
    <v-row no-gutters class="pa-5">
      <v-col
        cols="12"
      >
        <v-card
          class="pa-2"
          outlined
          tile
          min-height="500"
        >
        <v-card-title>
          <div>Transaction History</div>
          <v-spacer></v-spacer>
          <div>
            <v-chip color="secondary" class="pl-5 pr-5">
              {{balance}} : {{Math.abs(Trx.balance)}}
            </v-chip>
          </div>
        </v-card-title>
        <v-data-table
        :page="page"
        :headers="headers"
        :items="Histories"
        :items-per-page="15"
        height="800"
      ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <div class="pb-16"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    page: 1,
  }),
  computed: {
    ...mapGetters(['CurrentShop', 'Histories', 'Trx']),
    headers() {
      return [
        {
          text: 'Transaction ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Payment', value: 'payment' },
        { text: 'Payment Type', value: 'paymentType' },
        { text: 'Transaction Time', value: 'createdAt' },
        { text: 'Show Order', value: 'orderId' },
      ];
    },
    balance() {
      return this.Trx?.balance < 0 ? 'DUE' : 'BALANCE';
    },
  },
  watch: {
    CurrentShop(val) {
      this.fetchTrxHistories(val?.id);
    },
  },
  mounted() {
    this.fetchTrxHistories(this.CurrentShop.id);
  },
  methods: {
    ...mapActions(['HISTORIES_BY_SHOP_ID']),
    loadMore() {
      this.page += 1;
    },
    async fetchTrxHistories(shopId, lastId = '') {
      try {
        await this.HISTORIES_BY_SHOP_ID({ shopId, lastId });
      } catch (err) {
        // err
      }
    },
  },
};
</script>
