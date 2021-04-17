<template>
  <div>
    <v-card
      @click="crateNewShop"
      class="mb-3 card-comp"
      max-width="300"
      min-width="180"
      min-height="205"
      outlined>
      <v-card-text class="text--primary center">
        <v-icon color="secondary" x-large>mdi-plus-circle-outline</v-icon>
        <div class="card-inner-text">Create New Shop</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import eventBus from '../../helpers/eventBus';
import constants from '../../constants';

export default {
  data: () => ({
    show: true,
  }),
  methods: {
    crateNewShop() {
      eventBus.$emit(constants.events.SHOW_SHOP_CU_DIALOG, null);
    },
  },
};
</script>
<style lang="scss" scoped>
.text-field{
  // position: absolute;
  // left: 40%;
  width: 300px;
}
.card-comp {
  border-color: #c83843;
  border-width: 2px;
  border-radius: 10px;
  cursor: pointer;
}
.v-card__text.text--primary.center {
    text-align: center;
    padding: 19%;
}
.card-inner-text {
    padding-top: 40px;
    font-size: large;
    font-weight: 600;
    color: #c83843;
}
</style>
