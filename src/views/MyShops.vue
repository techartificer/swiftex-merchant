<template>
  <div class="root">
    <shop-dialog />
    <div class="head"
    >My Shops</div>
    <v-row dense>
      <v-col
      cols="lg-3">
        <create-shop-card/>
      </v-col>
      <v-col
      v-for="(item, idx) in MyShops" :key="idx"
      cols="lg-3">
        <shop-card :shop="item"/>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import CreateShopCard from '../components/shop/CreateCard.vue';
import ShopCard from '../components/shop/Card.vue';
import ShopDialog from '../components/shop/Dialog.vue';
import eventBus from '../helpers/eventBus';
import constants from '../constants';
// import eventBus from '../helpers/eventBus';

export default {
  components: {
    CreateShopCard,
    ShopCard,
    ShopDialog,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['MyShops']),
  },
  mounted() {
    const { query: { create } } = this.$route;
    if (create) {
      eventBus.$emit(constants.events.SHOW_SHOP_CU_DIALOG, null);
      this.$router.push('/my-shops');
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
