<template>
  <div>
    <template>
      <v-data-table
        :headers="headers"
        :items="Orders"
        class="elevation-0"
        :loading="isInit"
      >
        <template v-slot:item.recipientPhone="{ item }">
          {{item.recipientPhone.substr(2)}}
        </template>
        <template v-slot:item.isAccepted="{ item }">
          <v-chip
            :color="getColor(item.isAccepted)"
            dark
          >
            {{ item.isAccepted ? 'Yes' : 'No' }}
          </v-chip>
        </template>
        <template v-slot:item.requestedDeliveryTime="{ item }">
          {{getTime(item.requestedDeliveryTime)}}
        </template>
        <template v-slot:item.deliverdAt="{ item }">
          <v-chip
            :color="getDeliveredAt(item.deliverdAt).color"
            dark
          >
          {{getDeliveredAt(item.deliverdAt).time}}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="viewPercel(item)"
          >
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  data: () => ({
    isInit: true,
  }),
  computed: {
    ...mapGetters(['Orders', 'CurrentShop']),
    headers() {
      return [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'recipientName',
        },
        { text: 'Phone', value: 'recipientPhone' },
        { text: 'Track ID', value: 'trackId' },
        { text: 'Accepted', value: 'isAccepted' },
        { text: 'Area', value: 'recipientArea' },
        { text: 'Thana', value: 'recipientThana' },
        { text: 'City', value: 'recipientCity' },
        { text: 'Price', value: 'price' },
        { text: 'Type', value: 'parcelType' },
        { text: 'Delivery Time', value: 'requestedDeliveryTime' },
        { text: 'Delivery Type', value: 'deliveryType' },
        { text: '# of Items', value: 'numberOfItems' },
        { text: 'Delivered', value: 'deliverdAt' },
        { text: 'Actions', value: 'actions' },
      ];
    },
  },
  mounted() {
    this.intialize();
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    CurrentShop(val) {
      this.intialize();
    },
  },
  methods: {
    ...mapActions(['ORDERS_REQUEST']),
    viewPercel(item) {
      console.log(item);
    },
    async intialize() {
      if (!this.CurrentShop) return;
      try {
        await this.ORDERS_REQUEST({ shopId: this.CurrentShop.id });
      } catch (err) {
        // err
      }
      this.isInit = false;
    },
    getColor(flag) {
      return flag ? 'success' : 'info';
    },
    getTime(t) {
      const constDate = '0001-01-01T00:00:00Z';
      if (t && t !== constDate) { return moment(t).format('DD MMM YYYY'); }
      return 'N/A';
    },
    getDeliveredAt(t) {
      // const constDate = '0001-01-01T00:00:00Z';
      if (t && new Date(t) > new Date('2020-12-31 00:00:00')) {
        return {
          time: moment(t).format('DD MMM YYYY'),
          color: 'success',
        };
      }
      return { time: 'Not Yet', color: 'secondary' };
    },
  },
};
</script>
