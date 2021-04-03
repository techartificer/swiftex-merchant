<template>
  <v-dialog v-model="showModal"
  max-width="400"
  >
    <v-card
    class="mx-auto"
    min-height="200"
  >
    <v-card
      dark
      flat
    >
      <v-card-title class="pa-3 lighten-3">
        <div class="title text-center grow">
          Track ID {{ShowTrackDialog}}
        </div>
      </v-card-title>
    </v-card>
    <v-card-text class="py-0">
      <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          v-for="status in statuses"
          :key="status.id"
          small
          :color="status.color"
        >
          <v-row class="pt-1">
            <v-col cols="4">
              <div> {{status.time}}</div>
            </v-col>
            <v-col>
              <strong>{{status.text}}</strong>
              <div class="caption">
                {{status.date}}
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapMutations } from 'vuex';
import constants from '../../constants';

export default {
  data: () => ({
  }),
  computed: {
    ...mapGetters(['ShowTrackDialog', 'TrcakedOrder']),
    showModal: {
      get() {
        return !!this.ShowTrackDialog;
      },
      set() {
        this.closeTrackDialog();
      },
    },
    statuses() {
      const colors = ['teal', 'secondary', 'primary', 'yellow', 'pink', 'black'];
      return this.TrcakedOrder?.map((s, idx) => {
        if (s.status === constants.orderStatus.DELIVERED) {
          return {
            ...s,
            color: 'green',
            time: moment(s.time).format('MM:HH A'),
            date: moment(s.time).format('ddd, DD-MM-YYYY'),
          };
        }
        return {
          ...s,
          color: colors[idx % colors.length],
          time: moment(s.time).format('MM:HH A'),
          date: moment(s.time).format('ddd, DD-MM-YYYY'),
        };
      });
    },
  },
  methods: {
    ...mapMutations(['closeTrackDialog']),
  },
};
</script>
