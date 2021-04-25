<template>
  <div>
    <v-dialog v-model="isOrderViewAble"
    width="900"
    >
      <v-card v-if="isOrderViewAble">
        <v-card-title>
          <div class="inv">
            <div class="inv-title">
              Invoice No: {{ViewOrder.trackId}}
            </div>
            <div class="inv-date">
              {{createdTime}}
            </div>
          </div>
          <v-spacer></v-spacer>
          <div class="">
            <v-btn text color="secondary"></v-btn>
          </div>
        </v-card-title>
        <v-card-text class="mt-3">
        <v-divider></v-divider>
          <v-row class="mt-3">
            <v-col lg="6" sm="6" cols="12">
              <div class="text-title">
                <div class="text-head">
                  Current Stateus:
                  <v-chip color="green" dark class="pb-2 pt-2">
                    {{ViewOrder.currentStatus}}
                  </v-chip>
                </div>
              </div>
              <div class="text-title">
                <div class="text-head">
                  <div>
                    Delivery Type:
                  </div>
                  <div>
                    <v-chip color="gray" dark class="pb-1 pt-1 pl-4 pr-4">
                      {{ViewOrder.deliveryType}}
                    </v-chip>
                  </div>
                </div>
              </div>
              <div class="text-title">
                Payment Details
                <div class="payment">
                  <div class="payment-text">
                    <div>
                      Amount to be collected:
                    </div>
                    <div>
                      {{ViewOrder.price}}<span class="title-bold-1">&#2547;</span>
                    </div>
                  </div>
                  <div class="payment-text">
                    <div>
                      Delivery Charge:
                    </div>
                    <div>
                      {{ViewOrder.charge}}<span class="title-bold-1">&#2547;</span>
                    </div>
                  </div>
                  <div class="payment-text">
                    <div>
                      COD Charge:
                    </div>
                    <div>
                      {{COD}}<span class="title-bold-1">&#2547;</span>
                    </div>
                  </div>
                  <div class="payment-text">
                    <div class="title-bold">
                      Total Payable amount:
                    </div>
                    <div>
                      {{payable}}<span class="title-bold-1">&#2547;</span>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col sm="6" lg="6" md="6" cols="12">
               <div class="text-title">
                Customer Details
                <div class="payment">
                  <div class="payment-text fix">
                    <div>
                     Name:
                    </div>
                    <div>
                     {{ViewOrder.recipientName}}
                    </div>
                  </div>
                  <div class="payment-text fix">
                    <div>
                      Phone No:
                    </div>
                    <div>
                      {{ViewOrder.recipientPhone.substr(2)}}
                    </div>
                  </div>
                  <div class="payment-text fix">
                    <div>
                      Delivery Adreess:
                    </div>
                    <div>
                      {{ViewOrder.recipientAddress}}
                    </div>
                  </div>
                  <div class="payment-text fix">
                    <div>
                      Delivery Zone:
                    </div>
                    <div>
                      {{ViewOrder.recipientArea}}
                    </div>
                  </div>
                  <div class="payment-text fix">
                    <div>
                      Collectable Amount:
                    </div>
                    <div>
                      {{ViewOrder.price}}<span class="title-bold-1">&#2547;</span>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import moment from 'moment';
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['ViewOrder']),
    isOrderViewAble: {
      get() {
        return !!this.ViewOrder;
      },
      set() {
        this.setViewOrder(null);
      },
    },
    createdTime() {
      return moment(this.ViewOrder?.createdAt).format('ddd, DD MMM, YYYY hh:mm A');
    },
    COD() {
      if (this.ViewOrder?.paymentStatus === 'COD') { return (this.ViewOrder?.price / 100) * 1; }
      return 0;
    },
    payable() {
      return (this.ViewOrder?.price - this.COD - this.ViewOrder?.charge).toFixed(2);
    },
  },
  methods: {
    ...mapMutations(['setViewOrder']),
  },
};
</script>
<style scoped>
.text-head {
  width: 70%;
  display: flex;
  justify-content: space-between;
}
.inv-title {
    font-size: 30px;
    font-weight: 400;
    padding: 10px 0;
}
.inv-date {
    font-weight: 400;
    color: #292828;
}
.text-title {
    font-size: large;
    font-weight: 600;
    color: black;
    padding: 5px 0px;
}
.payment {
    font-size: medium;
    font-weight: 400;
    padding: 3px 30px;
}
.payment-text {
    display: grid;
    grid-template-columns: 220px auto;
    padding: 6px 0px;
}
.payment-text.fix {
    grid-template-columns: 180px auto;
}
.title-bold {
  font-weight: 500;
}
@media only screen and (max-width: 600px) {
  .payment {
    font-size: medium;
    font-weight: 400;
    padding: 3px 10px;
  }
  .payment-text {
    grid-template-columns: 170px auto;
  }
  .payment-text.fix {
    grid-template-columns: 130px auto;
  }
}
.title-bold-1 {
  font-weight: 900;
}
</style>
