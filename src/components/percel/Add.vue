<template>
  <v-card flat>
    <v-card-text>
      <div
      class="create-shop"
      >
      </div>
        <v-card
        outlined
        max-width="700"
        class="mx-auto card-border"
        >
          <v-card-text class="pt-10">
          <v-row>
            <v-col>
              <v-text-field
              ref="recipientName"
              v-model="name"
              label="Recipient Name"
              dense
              :rules="[() => !!name || 'This field is required' ]"
              outlined>
              </v-text-field>
              <v-autocomplete
              :rules="[() => !!pickupArea || 'This field is required' ]"
              ref="pickHub"
              :items="coverageAreas"
              outlined
              v-model="pickupArea"
              dense
              label="Pickup area"
            ></v-autocomplete>
            <v-autocomplete
              ref="paymetStatus"
              :rules="[() => !!paymetStatus || 'This field is required' ]"
              :items="paymetStatuses"
              outlined
              v-model="paymetStatus"
              dense
              label="Payment Status"
            ></v-autocomplete>
            <v-autocomplete
              ref="recipientArea"
              :rules="[() => !!deliveryZone || 'This field is required' ]"
              :items="coverageAreas"
              outlined
              v-model="deliveryZone"
              dense
              label="Delivery Zone"
            ></v-autocomplete>
            <v-text-field
              :rules="[
                () => !!price || 'This field is required'
              ]"
              ref="price"
              v-model="price"
              label="Price"
              type="number"
              dense
              outlined>
            </v-text-field>
            <v-text-field
              :rules="[
                () => !!totalNumberOfItems || 'This field is required'
              ]"
              ref="numberOfItems"
              v-model="totalNumberOfItems"
              label="Total Number of Items"
              type="number"
              dense
              outlined>
            </v-text-field>
            <v-textarea
              ref="comments"
              outlined
              v-model="comments"
              dense
              rows="1"
              auto-grow
              label="Comments"> </v-textarea>
            </v-col>
            <v-col>
              <v-text-field
              :rules="[
                () => !!phone || 'This field is required',
                validatePhoneNumber
              ]"
              ref="recipientPhone"
              v-model="phone"
              label="Phone Number"
              dense
              outlined>
              </v-text-field>
              <v-text-field
              ref="recipientCity"
              :rules="[() => !!city || 'This field is required']"
              v-model="city"
              label="City"
              dense
              type="city"
              outlined>
              </v-text-field>
              <v-text-field
              :rules="[() => !!thana || 'This field is required' ]"
              ref="recipientThana"
              v-model="thana"
              label="Delivery Thana"
              type="text"
              dense
              outlined>
              </v-text-field>
              <v-text-field
              :rules="[
                () => !!zip || 'This field is required'
              ]"
              ref="recipientZip"
              v-model="zip"
              label="Zip"
              dense
              outlined>
            </v-text-field>
            <v-autocomplete
              :rules="[() => !!percelType || 'This field is required' ]"
              ref="percelType"
              :items="percelTypes"
              outlined
              v-model="percelType"
              dense
              label="Percel type"
            ></v-autocomplete>
            <v-autocomplete
              :rules="[() => !!deliveryType || 'This field is required' ]"
              ref="deliveryType"
              :items="deliveryTypes"
              outlined
              v-model="deliveryType"
              dense
              label="Delvery type"
            ></v-autocomplete>
            <v-textarea
              :rules="[() => !!recipientAddress || 'This field is required' ]"
              ref="recipientAddress"
              outlined
              v-model="recipientAddress"
              dense
              rows="1"
              auto-grow
              label="Recipient Address"> </v-textarea>
            </v-col>
          </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            text
            rounded
            color="secondary"
            @click="closeAddPercel">Cancel</v-btn>
            <v-btn
            depressed
            rounded
            color="secondary"
            @click="handleAction"
            :loading="isLoading"
            >
            Create
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
import constants from '../../constants';
import eventBus from '../../helpers/eventBus';
import { formatNumber } from '../../helpers/phoneNumber';

export default {
  data: () => ({
    thana: '',
    city: '',
    phone: '',
    recipientArea: '',
    recipientName: '',
    name: '',
    percelType: '',
    recipientAddress: '',
    deliveryType: '',
    zip: '',
    comments: '',
    paymetStatus: '',
    deliveryZone: '',
    pickupArea: '',
    price: '',
    totalNumberOfItems: '',
    isLoading: false,
  }),
  computed: {
    coverageAreas() {
      return constants.COVERAGE_AREAS;
    },
    percelTypes() {
      return ['Documents', 'Products'];
    },
    paymetStatuses() {
      return ['COD', 'PAID'];
    },
    deliveryTypes() {
      return ['Regular', 'Express'];
    },
    validatePhoneNumber() {
      const { isValid } = formatNumber(`+88${this.phone}`);
      if (!isValid) return 'Phone number should be valid';
      return true;
    },
    form() {
      return {
        // TODO: fix ref with form key
        deliveryType: this.deliveryType,
        numberOfItems: this.totalNumberOfItems,
        percelType: this.percelType,
        paymetStatus: this.paymetStatus,
        // pickrecipientAddress:
        pickHub: this.pickupArea,
        recipientAddress: this.recipientAddress,
        recipientArea: this.deliveryZone,
        recipientCity: this.city,
        recipientName: this.name,
        recipientPhone: this.phone,
        recipientThana: this.thana,
        recipientZip: this.zip,
        comments: this.comments,
        price: this.price,
      };
    },
  },
  methods: {
    validdateForm() {
      let isValid = true;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) isValid = false;
        this.$refs[f].validate(true);
      });
      return isValid;
    },
    handleAction() {
      const isValid = this.validdateForm();
      console.log(isValid);
    },
    closeAddPercel() {
      eventBus.$emit(constants.events.SHOW_ADD_PERCEL_DIALOG, false);
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
