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
          Track ID 474174
        </div>
      </v-card-title>
    </v-card>
    <v-card-text class="py-0">
      <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="4">
              <div>09:11am</div>
            </v-col>
            <v-col>
              <strong>Finish Home Screen</strong>
              <div class="caption">
                Web App
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
import { mapGetters, mapMutations } from 'vuex';

export default {
  data: () => ({
  }),
  computed: {
    ...mapGetters(['ShowTrackDialog', 'TrcakedOrder']),
    showModal: {
      get() {
        return this.ShowTrackDialog;
      },
      set() {
        this.closeTrackDialog();
      },
    },
  },
  methods: {
    ...mapMutations(['closeTrackDialog']),
  },
};
</script>
