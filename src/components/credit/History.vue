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
        :page="page"
        :headers="headers"
        :items="Histories"
        :items-per-page="15"
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
<style scoped>
.paymentType {
  font-size: larger;
  font-weight: 500;
}
</style>
