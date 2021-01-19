<template>
  <v-bottom-sheet
    v-model="show"
    scrollable
    >
      <v-card height="900">
        <v-card-text>
          <div
          class="create-shop"
          >
          {{isCreateForm ? 'Create New Shop' : 'Update Shop'}}
          </div>
            <v-card
            outlined
            max-width="700"
            class="mx-auto mt-5 card-border"
            >
              <v-card-text class="pt-10">
              <v-row>
                <v-col>
                  <v-text-field
                  ref="name"
                  v-model="name"
                  label="Name"
                  dense
                  :rules="[() => !!name || 'This field is required' ]"
                  outlined>
                  </v-text-field>
                  <v-textarea
                  ref="address"
                  :rules="[() => !!address || 'This field is required' ]"
                  rows="2"
                  auto-grow
                  outlined
                  v-model="address"
                  label="Address"
                  dense> </v-textarea>
                  <v-autocomplete
                  :rules="[() => !!pickupArea || 'This field is required' ]"
                  ref="pickupArea"
                  :items="pickupAreas"
                  outlined
                  v-model="pickupArea"
                  dense
                  label="Pickup area"
                ></v-autocomplete>
                <v-autocomplete
                  ref="deliveryZone"
                  :rules="[() => !!deliveryZone || 'This field is required' ]"
                  :items="pickupAreas"
                  outlined
                  v-model="deliveryZone"
                  dense
                  label="Preferred Delivery Zone"
                ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-text-field
                  :rules="[
                    () => !!phone || 'This field is required',
                    validatePhoneNumber
                  ]"
                  ref="phone"
                  v-model="phone"
                  label="Phone Number"
                  dense
                  outlined>
                  </v-text-field>
                  <v-textarea
                  ref="pickupAddress"
                  rows="2"
                  auto-grow
                  :rules="[() => !!pickupAddress || 'This field is required' ]"
                  outlined
                  v-model="pickupAddress"
                  label="Pickup Address"
                  dense> </v-textarea>
                  <v-text-field
                  ref="email"
                  :rules="[() => !!email || 'This field is required' ]"
                  v-model="email"
                  label="Email"
                  dense
                  type="email"
                  outlined>
                  </v-text-field>
                  <v-text-field
                  :rules="[() => !!fbPage || 'This field is required' ]"
                  ref="fbPage"
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
                @click="handleAction"
                :loading="isLoading"
                >
                {{isCreateForm ? 'Create' : 'Update'}}
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
</template>
<script>
import { mapActions } from 'vuex';
import { formatNumber } from '../../helpers/phoneNumber';
import eventBus from '../../helpers/eventBus';
import constants from '../../constants';

export default {
  data: () => ({
    show: false,
    name: '',
    address: '',
    deliveryZone: '',
    phone: '',
    email: '',
    fbPage: '',
    shopMongoId: '',
    pickupAddress: '',
    pickupArea: '',
    isCreateForm: false,
    isLoading: false,
  }),
  computed: {
    pickupAreas() {
      return ['Uttara', 'Savar', 'Mohakhali', 'Banani', 'Dhaka'];
    },
    validatePhoneNumber() {
      const { isValid } = formatNumber(`+88${this.phone}`);
      if (!isValid) return 'Phone number should be valid';
      return true;
    },
    form() {
      return {
        name: this.name,
        address: this.address,
        deliveryZone: this.deliveryZone,
        phone: this.phone,
        email: this.email,
        fbPage: this.fbPage,
        pickupAddress: this.pickupAddress,
        pickupArea: this.pickupArea,
      };
    },
  },
  mounted() {
    eventBus.$on(constants.events.SHOW_SHOP_CU_DIALOG, (data) => {
      this.show = true;
      if (data) {
        console.log(data);
        const {
          name, address, pickupArea, phone, fbPage, pickupAddress, email, deliveryZone, id,
        } = data;
        this.name = name;
        this.shopMongoId = id;
        this.address = address;
        this.pickupArea = pickupArea;
        this.phone = phone?.substr(2, phone.length);
        this.fbPage = fbPage;
        this.pickupAddress = pickupAddress;
        this.email = email;
        this.deliveryZone = deliveryZone;
        this.isCreateForm = false;
      } else {
        if (!this.isCreateForm) {
          this.resetForm();
        }
        this.isCreateForm = true;
      }
    });
  },
  methods: {
    ...mapActions(['CREATE_SHOP_REQUEST']),
    crateNewShop() {
      this.show = true;
      if (!this.isCreateForm) {
        this.resetForm();
      }
      this.isCreateForm = true;
    },
    validdateForm() {
      let isValid = true;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) isValid = false;
        this.$refs[f].validate(true);
      });
      return isValid;
    },
    resetForm() {
      Object.keys(this.form).forEach((f) => {
        if (this.$refs[f]) { this.$refs[f].reset(); }
      });
    },
    async handleAction() {
      try {
        this.isLoading = true;
        const v = this.validdateForm();
        const { isValid, number } = formatNumber(`+88${this.phone}`);
        if (v && isValid) {
          this.form.phone = number;
          if (this.isCreateForm) {
            await this.CREATE_SHOP_REQUEST(this.form);
            this.resetForm();
            this.show = false;
            this.$toast.success('Shop created successfully');
          }
        }
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.create-shop {
    padding-top: 20px;
    padding-bottom: 5px;
    color: #454446;
    width: fit-content;
    font-size: 28px;
    font-weight: 400;
}
.card-border {
  border-color: #c83843;
  border-width: 1px;
}
</style>
