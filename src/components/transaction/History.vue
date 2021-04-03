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
        :loading="isFetching"
        :page="page"
        :headers="headers"
        :items="Histories"
        :items-per-page="1000000"
        hide-default-footer
      >
      <template v-slot:item.paymentType="{ item }">
        <v-chip :color="getColor(item)" dark class="pl-6 pr-6" small>
          <div class="paymentType" >Cash {{item.paymentType}}</div>
        </v-chip>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{getTime(item)}}
      </template>
      <template v-slot:item.orderId="{ item }">
        <v-btn @click="showOrder(item)"
        depressed
        color="primary"
        roundeditem
        small
        >View Order</v-btn>
      </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-btn
        :disabled="!hasMore"
        color="secondary"
        rounded
        @click="loadMore"
        :loading="isFetching"
        small>Load More</v-btn>
    </div>
        </v-card>
      </v-col>
    </v-row>
    <div class="pb-16"></div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import constants from '../../constants';

export default {
  data: () => ({
    page: 1,
    isFetching: false,
    hasMore: false,
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
        { text: 'Order', value: 'orderId' },
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
    this.fetchTrxHistories(this.CurrentShop?.id);
  },
  methods: {
    ...mapActions(['HISTORIES_BY_SHOP_ID']),
    showOrder(order) {
      console.log(order);
    },
    getTime({ createdAt }) {
      return moment(createdAt).format('DD-MM-YYYY HH:MM:SS A');
    },
    getColor({ paymentType }) {
      return paymentType === constants.paymentType.IN ? 'green' : 'red';
    },
    async loadMore() {
      const lastId = this.Histories[this.Histories?.length - 1]?.id;
      await this.fetchTrxHistories(this.CurrentShop?.id, lastId);
    },
    async fetchTrxHistories(shopId, lastId = '') {
      try {
        this.isFetching = true;
        const { transactionHistory } = await this.HISTORIES_BY_SHOP_ID({ shopId, lastId });
        if (transactionHistory.length < 15) this.hasMore = false;
        else this.hasMore = true;
        this.page += 1;
      } catch (err) {
        // err
      }
      this.isFetching = false;
    },
  },
};
</script>
<style scoped>
.paymentType {
  font-size: larger;
  font-weight: 500;
}
</style>
