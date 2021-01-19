<template>
  <v-card
    class="card-comp mb-3"
    max-width="300"
    height="180"
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
export default {
  props: ['shop'],
  methods: {
    setCurrentShop() {
      console.log('setCurrentShop');
    },
    editShop() {
      console.log('editShop');
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
