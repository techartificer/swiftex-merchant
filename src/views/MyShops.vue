<template>
  <div class="my-shops">
    <div class="my-shops-head"
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

export default {
  components: {
    CreateShopCard,
    ShopCard,
  },
  data: () => ({
    shops: [
      { name: 'Fresh Agric', address: 'Dahak, Bangladesh', phone: '01710027639' },
      { name: 'Fresh Agric', address: 'Dahak, Bangladesh', phone: '01710027639' },
      { name: 'Fresh Agric', address: 'Dahak, Bangladesh', phone: '01710027639' },
      { name: 'Fresh Agric', address: 'Dahak, Bangladesh', phone: '01710027639' },
      { name: 'Fresh Agric', address: 'Dahak, Bangladesh', phone: '01710027639' },
      { name: 'Fresh Agric', address: 'Dahak, Bangladesh', phone: '01710027639' },
    ],
  }),
  computed: {
    ...mapGetters(['MyShops']),
  },
};
</script>
<style lang="scss" scoped>
.my-shops {
    padding-left: 10px;
    &-head {
    color: #454446;
    width: fit-content;
    margin: 20px 0px;
    font-size: 28px;
    border-bottom: 3px solid #c83843;
    font-weight: 400;
  }
}
</style>
