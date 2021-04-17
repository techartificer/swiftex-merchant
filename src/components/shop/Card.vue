<template>
  <v-card
    class="card-comp mb-3"
    max-width="300"
    min-width="180"
    height="200"
    outlined
  >
    <v-card-title @click="setCurrentShop" class="pointer">{{shop.name}}</v-card-title>
    <v-card-text class="text--primary pointer" @click="setCurrentShop">
      <div> {{shop.address}}</div>
      <div class="pt-1">+{{shop.phone}}</div>
    </v-card-text>
    <v-card-actions>
      <v-icon color="secondary">mdi-check-circle</v-icon>
      <v-spacer/>
      <v-btn
      @click="editShop"
      text
      fab
      small
      >
      <v-icon>mdi-circle-edit-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import constants from '../../constants';
import eventBus from '../../helpers/eventBus';

export default {
  props: ['shop'],
  methods: {
    ...mapActions(['SHOP_BY_ID_REQUEST']),
    async setCurrentShop() {
      await this.SHOP_BY_ID_REQUEST(this.shop.id);
      this.$router.push('/');
    },
    editShop() {
      eventBus.$emit(constants.events.SHOW_SHOP_CU_DIALOG, this.shop);
    },
  },
};
</script>
<style lang="scss" scoped>
.card-comp {
  border-color: #c83843;
  border-width: 2px;
  border-radius: 10px;
}
.pointer {
  cursor: pointer;
}
</style>
