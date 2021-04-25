<template>
  <div>
    <transition name="fade">
      <add-parcel v-if="showAddPercel" :parcel="editParcel"/>
    </transition>
    <template v-if="!showAddPercel">
    <transition name="fade">
      <v-card
      class="mr-2 mb-8"
      outlined>
        <v-card-text>
          <v-row dense>
            <v-col lg="3" md="6" sm="12" cols="12">
              <v-text-field
              v-model="phone"
              single-line
              outlined
              dense
              label="Phone"> </v-text-field>
            </v-col>
            <v-col lg="3" md="6" sm="12" cols="12">
              <v-text-field
              v-model="trackId"
              single-line
              outlined
              dense
              label="Track ID"> </v-text-field>
            </v-col>
            <v-col lg="3" md="6" sm="12" cols="12">
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
            <v-col lg="3" md="6" sm="12" cols="12">
                <v-btn
                :disabled="searchDisabled"
                depressed
                class="mr-1"
                @click="searchHandle"
                :loading="searchInit"
                color="primary">Search</v-btn>
                <v-btn
                :disabled="searchDisabled"
                class="mr-1"
                @click="resetSearchField"
                depressed
                color="primary">Reset</v-btn>
                <v-btn
                @click="addPercelInit"
                depressed
                color="primary">Add {{isMobile ? '' : 'Parcel'}}</v-btn>
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
        :items-per-page="1000000"
        hide-default-footer
      >
        <template v-slot:item.recipientPhone="{ item }">
          {{item.recipientPhone.substr(2)}}
        </template>
        <template v-slot:item.trackId="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                small
                color="black"
                dark
                v-bind="attrs"
                v-on="on"
                @click="trackParcel(item.trackId)"
              >
                {{item.trackId}}
              </v-chip>
            </template>
            <span>Track parcel</span>
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
        <template v-slot:item.deliveredAt="{ item }">
          <v-chip
            :color="getDeliveredAt(item.deliveredAt).color"
            dark
            small
          >
          {{getDeliveredAt(item.deliveredAt).time}}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
          v-if="!item.isPicked"
          x-small
          text
          fab
          @click="editItem(item)">
            <v-icon > mdi-pencil </v-icon>
          </v-btn>
          <v-btn
          x-small
          text
          fab
           @click="viewPercel(item)">
            <v-icon > mdi-eye </v-icon>
          </v-btn>
          <v-btn
          x-small
          text
          fab
          @click="copyToClipboard(item)">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
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
/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable vue/valid-v-slot */
import copy from 'copy-to-clipboard';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import AddParcel from './Add.vue';
import eventBus from '../../helpers/eventBus';
import constants from '../../constants';

export default {
  components: {
    AddParcel,
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
    searchInit: false,
    isSearched: false,
    isSearching: false,
    editParcel: null,
  }),
  computed: {
    ...mapGetters(['Orders', 'CurrentShop']),
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true;
        case 'sm': return true;
        default: return false;
      }
    },
    searchDisabled() {
      return !this.phone && !this.trackId && this.dates.length !== 2;
    },
    allEmpty() {
      return this.phone === '' && this.dates.length === 0 && this.trackId === '';
    },
    dateRangeText() {
      if (this.dates.length === 2) {
        const [dts, dte] = this.dates;
        if (new Date(dts) > new Date(dte)) {
          this.dates[0] = dte;
          this.dates[1] = dts;
        }
      }
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
        { text: 'Collectable Amount', value: 'price' },
        { text: 'Current Status', value: 'currentStatus' },
        { text: 'Delivery Type', value: 'deliveryType' },
        { text: 'Delivered', value: 'deliveredAt' },
        { text: 'Actions', value: 'actions' },
      ];
    },
  },
  mounted() {
    this.intialize();
    eventBus.$on(constants.events.SHOW_ADD_PERCEL_DIALOG, (flag) => {
      if (!flag) this.editParcel = null;
      this.showAddPercel = flag;
    });
  },
  watch: {
    CurrentShop() {
      this.intialize();
    },
    allEmpty(val) {
      if (val) {
        this.intialize();
      }
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
    ...mapActions(['ORDERS_REQUEST', 'TRACK_ORDER']),
    ...mapMutations(['setViewOrder']),
    copyToClipboard(order) {
      copy(`Hello ${order.recipientName},\n\nYour order track ID is: ${order.trackId}\nClick the URL to track https://swiftex.app?track=${order.trackId}\n\nThanks,\n${this.CurrentShop.name}`);
      this.$toast('Copied to clipboard');
    },
    addPercelInit() {
      this.showAddPercel = true;
    },
    editItem(item) {
      this.editParcel = item;
      this.showAddPercel = true;
    },
    async trackParcel(id) {
      try {
        if (this.isSearching) return;
        this.isSearching = true;
        await this.TRACK_ORDER(id);
      } catch (err) {
        // err
      }
      this.isSearching = false;
    },
    viewPercel(item) {
      this.setViewOrder(item);
    },
    async searchHandle() {
      this.isSearched = true;
      this.searchInit = true;
      if (!this.CurrentShop) return;
      try {
        let startDate;
        let endDate;
        if (this.dates.length === 2) {
          const stts = new Date(this.dates[0]).valueOf();
          const ents = new Date(this.dates[1]).valueOf();
          const startDateTS = Math.min(stts, ents);
          const endDateTS = Math.max(stts, ents);
          startDate = new Date(startDateTS).setHours(0, 0, 0, 0);
          endDate = new Date(endDateTS).setHours(23, 59, 59);
        }
        await this.ORDERS_REQUEST({
          shopId: this.CurrentShop.id,
          phone: this.phone,
          trackId: this.trackId,
          startDate,
          endDate,
        });
      } catch (err) {
        // err
      }
      this.searchInit = false;
    },
    resetSearchField() {
      this.dates = [];
      this.phone = '';
      this.trackId = '';
      if (this.isSearched) {
        this.intialize();
      }
      this.isSearched = false;
    },
    async intialize() {
      if (!this.CurrentShop) {
        this.isInit = false;
        return;
      }
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
      if (t) {
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
