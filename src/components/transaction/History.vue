<template>
  <div>
    <v-dialog
    width="300"
    v-model="trxCodeModal">
      <v-card>
        <v-card-title>
          TRX Code
        </v-card-title>
        <v-card-text>
          <div v-if="prompt===1">
           Do you want to generate new code?
            <v-text-field
            label="Amount"
            outlined
            dense
            class="mt-2"
            v-model="amount"
            type="number"
            ></v-text-field>
            <div>
              <v-btn depressed color="primary"
              @click="confirmGenCode">Yes</v-btn>
              <v-btn depressed class="ml-2"
              @click="trxCodeModal=false,prompt=1">No</v-btn>
            </div>
          </div>
          <div v-else-if="prompt===2">
            <div class="trx-code">
              <div class="trx-code-text">{{trxCode}}</div>
            </div>
            <div class="mt-5">
              Expires at: {{expireTime}}
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          {{hint}}
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row no-gutters class="pa-5">
      <v-col
        lg="8"
        md="8"
        sm="12"
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
              {{balance}} : {{Math.abs(Trx.balance) || 0}}
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
      <v-col
      lg="4"
      md="4"
      sm="12">
        <v-card outlined min-height="217">
        <v-card-title>Cash Out request</v-card-title>
        <v-card-text v-if="Trx.amount">
          <div class="amount">Cash out request amount: {{Trx.amount}}</div>
          <div class="request-time mt-2">{{requestTime}}</div>
          <v-btn depressed class="mt-5" color="secondary"
          @click="cancelRequest"
          >Cancel</v-btn>
        </v-card-text>
        <v-card-text v-else>
          <v-btn
            class="gen-code"
            color="primary"
            depressed
            rounded
            outlined
            small
            @click="genTrxCode">
            Generate Trx COde
            </v-btn>
        </v-card-text>
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
    trxCodeModal: false,
    prompt: 1,
    hint: 'Your previous code will be destroyed',
    amount: '',
    trxCode: '',
  }),
  computed: {
    ...mapGetters(['CurrentShop', 'Histories', 'Trx']),
    headers() {
      return [
        {
          text: 'Payment Type',
          value: 'paymentType',
          align: 'start',
        },
        {
          text: 'Transaction ID',
          sortable: false,
          value: 'id',
        },
        { text: 'Payment', value: 'payment' },
        { text: 'Transaction Time', value: 'createdAt' },
        { text: 'Order', value: 'orderId' },
      ];
    },
    balance() {
      return this.Trx?.balance < 0 ? 'DUE' : 'BALANCE';
    },
    requestTime() {
      return moment(this.Trx.updatedAt).format('dddd DD-MM-YYYY mm:hh A');
    },
  },
  watch: {
    CurrentShop(val) {
      this.fetchTrxHistories(val?.id);
    },
    trxCodeModal(val) {
      if (!val) {
        this.prompt = 1;
        this.amount = '';
      }
    },
  },
  mounted() {
    this.fetchTrxHistories(this.CurrentShop?.id);
  },
  methods: {
    ...mapActions(['HISTORIES_BY_SHOP_ID', 'GENERATE_TRX_CODE_BY_SHOP_ID']),
    genTrxCode() {
      this.trxCodeModal = true;
    },
    async cancelRequest() {
      try {
        await this.GENERATE_TRX_CODE_BY_SHOP_ID({ amount: 0 });
      } catch (err) {
        console.log(err);
      }
    },
    async confirmGenCode() {
      try {
        if (+this.amount === 0) return;
        this.hint = 'Don\'t share your code with anyone.';
        const { trxCode } = await this.GENERATE_TRX_CODE_BY_SHOP_ID({ amount: +this.amount });
        this.trxCode = trxCode;
        this.prompt = 2;
        this.expireTime = moment(new Date()).add(3, 'days').format('DD, MMM YYYY hh:mmA');
      } catch (err) {
        console.log(err);
      }
    },
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
<style lang="scss" scoped>
.paymentType {
  font-size: larger;
  font-weight: 500;
}
.gen-code {
    text-align: center;
    position: absolute;
    left: 32%;
    top: 50%;
}
.amount {
    font-size: medium;
    font-weight: 500;
    color: #454446;
}
.trx-code {
    width: 120px;
    position: relative;
    left: 32%;

    &-text {
      font-size: x-large;
      font-weight: 600;
      font-family: monospace;
      border: 2px solid gray;
      padding: 5px 10px;
      width: 98px;
      border-radius: 20px;
    }
}
</style>
