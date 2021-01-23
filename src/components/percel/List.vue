<template>
  <div>
    <transition name="fade">
      <add-percel v-if="showAddPercel"/>
    </transition>
    <template v-if="!showAddPercel">
    <transition name="fade">
      <v-card
      class="mr-2 mb-8"
      outlined>
        <v-card-text>
          <v-row dense>
            <v-col>
              <v-text-field
              v-model="phone"
              single-line
              outlined
              dense
              label="Phone"> </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
              v-model="trackId"
              single-line
              outlined
              dense
              label="Track ID"> </v-text-field>
            </v-col>
            <v-col>
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
            </v-col>
            <v-col cols="lg-4">
                <v-btn
                depressed
                class="mr-1"
                color="primary">Search</v-btn>
                <v-btn
                class="mr-1"
                @click="resetSearchField"
                depressed
                color="primary">Reset</v-btn>
                <v-btn
                @click="addPercelInit"
                depressed
                color="primary">Add Percel</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      </transition>

      <v-data-table
        :headers="headers"
        :items="Orders"
        class="elevation-0"
        :loading="isInit"
      >

        <template v-slot:item.recipientPhone="{ item }">
          {{item.recipientPhone.substr(2)}}
        </template>
        <template v-slot:item.trackId="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                small
                @click="getColor"
                color="black"
                dark
                v-bind="attrs"
                v-on="on"
              >
                {{item.trackId.substr(2)}}
              </v-chip>
            </template>
            <span>Track percel</span>
          </v-tooltip>
        </template>
        <template v-slot:item.isAccepted="{ item }">
          <v-chip
            :color="getColor(item.isAccepted)"
            dark
            small
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
            small
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
      <div class="text-center pt-2">
        <v-btn
        :disabled="!hasMore"
        color="secondary"
        rounded
        small>Load More</v-btn>
    </div>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import AddPercel from './Add.vue';
import eventBus from '../../helpers/eventBus';
import constants from '../../constants';

export default {
  components: {
    AddPercel,
  },
  data: () => ({
    showAddPercel: false,
    phone: '',
    trackId: '',
    dates: [],
    modal: false,
    hasMore: false,
    isInit: true,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
  }),
  computed: {
    ...mapGetters(['Orders', 'CurrentShop']),
    dateRangeText() {
      return this.dates.join(' ~ ');
    },
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
        { text: 'City', value: 'recipientCity' },
        { text: 'Price', value: 'price' },
        { text: 'Type', value: 'parcelType' },
        { text: 'Delivery Type', value: 'deliveryType' },
        { text: '# of Items', value: 'numberOfItems' },
        { text: 'Delivered', value: 'deliverdAt' },
        { text: 'Actions', value: 'actions' },
      ];
    },
  },
  mounted() {
    this.intialize();
    eventBus.$on(constants.events.SHOW_ADD_PERCEL_DIALOG, (flag) => {
      this.showAddPercel = flag;
    });
  },
  watch: {
    CurrentShop() {
      this.intialize();
    },
    phone() {
      this.trackId = '';
    },
    trackId() {
      this.phone = '';
    },
    dates() {
      this.trackId = '';
    },
  },
  methods: {
    addPercelInit() {
      // eventBus.$emit(constants.events.SHOW_ADD_PERCEL_DIALOG);
      this.showAddPercel = true;
    },
    ...mapActions(['ORDERS_REQUEST']),
    viewPercel(item) {
      console.log(item);
    },
    resetSearchField() {
      this.dates = [];
      this.phone = '';
      this.trackId = '';
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
<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
