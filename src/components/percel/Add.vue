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
              ref="name"
              v-model="name"
              label="Recipient Name"
              dense
              :rules="[() => !!name || 'This field is required' ]"
              outlined>
              </v-text-field>
              <v-autocomplete
              :rules="[() => !!pickupArea || 'This field is required' ]"
              ref="pickupArea"
              :items="coverageAreasz"
              outlined
              v-model="pickupArea"
              dense
              label="Pickup area"
            ></v-autocomplete>
            <v-autocomplete
              ref="deliveryZone"
              :rules="[() => !!deliveryZone || 'This field is required' ]"
              :items="coverageAreasz"
              outlined
              v-model="deliveryZone"
              dense
              label="Preferred Delivery Zone"
            ></v-autocomplete>
            <v-autocomplete
              ref="deliveryZone"
              :rules="[() => !!deliveryZone || 'This field is required' ]"
              :items="coverageAreasz"
              outlined
              v-model="deliveryZone"
              dense
              label="Preferred Delivery Zone"
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
              ref="totalNumberOfItems"
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
              ref="phone"
              v-model="phone"
              label="Phone Number"
              dense
              outlined>
              </v-text-field>
              <v-text-field
              ref="city"
              :rules="[() => !!city || 'This field is required']"
              v-model="city"
              label="City"
              dense
              type="city"
              outlined>
              </v-text-field>
              <v-text-field
              :rules="[() => !!thana || 'This field is required' ]"
              ref="thana"
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
              ref="zip"
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
            <v-textarea
              :rules="[() => !!address || 'This field is required' ]"
              ref="address"
              outlined
              v-model="address"
              dense
              rows="1"
              auto-grow
              label="Address"> </v-textarea>
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

export default {
  data: () => ({
    thana: '',
    city: '',
    recipientArea: '',
    recipientName: '',
    name: '',
    recipientPhone: '',
    percelType: '',
  }),
  computed: {
    coverageAreas() {
      return constants.COVERAGE_AREAS;
    },
    percelTypes() {
      return ['Documents', 'Products'];
    },
  },
  methods: {
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
