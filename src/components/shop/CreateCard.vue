<template>
  <div>
    <v-bottom-sheet
    v-model="show"
    scrollable
    >
      <v-card height="900">
        <v-card-text>
          <div
          class="create-shop"
          >Create New Shop</div>
            <v-card
            outlined
            max-width="700"
            class="mx-auto mt-5 card-border"
            >
              <v-card-text class="pt-10">
              <v-row>
                <v-col>
                  <v-text-field
                  v-model="name"
                  label="Name"
                  dense
                  outlined>
                  </v-text-field>
                  <v-textarea
                  rows="2"
                  auto-grow="true"
                  outlined
                  v-model="address"
                  label="Address"
                  dense> </v-textarea>
                  <v-autocomplete
                  :items="pickupAreas"
                  outlined
                  dense
                  label="Pickup area"
                ></v-autocomplete>
                <v-autocomplete
                  :items="pickupAreas"
                  outlined
                  dense
                  label="Preferred Delivery Zone"
                ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-text-field
                  v-model="phone"
                  label="Phone Number"
                  dense
                  outlined>
                  </v-text-field>
                  <v-textarea
                  rows="2"
                  auto-grow="true"
                  outlined
                  v-model="pickupAddress"
                  label="Pickup Address"
                  dense> </v-textarea>
                  <v-text-field
                  v-model="email"
                  label="Email"
                  dense
                  type="email"
                  outlined>
                  </v-text-field>
                  <v-text-field
                  v-model="fbPage"
                  label="Facebook Page URL"
                  type="url"
                  dense
                  outlined>
                  </v-text-field>
                </v-col>
              </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                text
                rounded
                color="secondary"
                @click="show=false">Cancel</v-btn>
                <v-btn
                depressed
                rounded
                color="secondary"
                >Create</v-btn>
              </v-card-actions>
            </v-card>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
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
  </div>
</template>

<script>
export default {
  data: () => ({
    show: true,
  }),
  methods: {
    crateNewShop() {
      this.show = true;
    },
  },
  computed: {
    pickupAreas() {
      return ['Uttara', 'Savar', 'Mohakhali', 'Banani'];
    },
  },
};
</script>
<style lang="scss" scoped>
.card-border {
  border-color: #c83843;
  border-width: 1px;
}
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
    padding: 15%;
}
.card-inner-text {
    padding-top: 40px;
    font-size: large;
    font-weight: 600;
    color: #c83843;
}
.create-shop {
    padding-top: 20px;
    padding-bottom: 5px;
    color: #454446;
    width: fit-content;
    font-size: 28px;
    font-weight: 400;
}
</style>
