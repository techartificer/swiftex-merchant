<template>
  <v-card
    @click="crateNewShop"
    class="mb-3 card-comp"
    max-width="300"
    height="180"
    outlined>
    <v-card-text class="text--primary center">
      <v-icon color="secondary" x-large>mdi-plus-circle</v-icon>
      <div class="card-inner-text">Create New Shop</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  methods: {
    crateNewShop() {

    },
  },
};
</script>
<style lang="scss" scoped>
.card-comp {
  border-color: #c83843;
  border-width: 2px;
  border-radius: 10px;
  cursor: pointer;
}
.v-card__text.text--primary.center {
    text-align: center;
    padding: 15%;
}
.card-inner-text {
    padding-top: 40px;
    font-size: large;
    font-weight: 600;
    color: #c83843;
}
</style>
