<template>
  <div>
    <v-dialog v-model="isOrderViewAble"
    width="900"
    >
      <v-card>
        <v-card-title>
          <div class="inv">
            <div class="inv-title">
              Invoice No: {{'xaAsw8'}}
            </div>
            <div class="inv-date">
              {{new Date().toString().substr(0, 24)}}
            </div>
          </div>
          <v-spacer></v-spacer>
          <div class="">
            <v-btn text color="secondary">Download</v-btn>
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
                    Delivered
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
                      Express
                    </v-chip>
                  </div>
                </div>
              </div>
              <div class="text-title">
                Payment Details
                <div class="payment">
                  <div class="payment-text">
                    <div>
                      Ammount to be collected:
                    </div>
                    <div>
                      <span class="title-bold-1">&#2547;</span>
                      1000
                    </div>
                  </div>
                  <div class="payment-text">
                    <div>
                      Delivery Charge:
                    </div>
                    <div>
                      <span class="title-bold-1">&#2547;</span>
                      60
                    </div>
                  </div>
                  <div class="payment-text">
                    <div>
                      COD Charge:
                    </div>
                    <div>
                      <span class="title-bold-1">&#2547;</span>
                      10
                    </div>
                  </div>
                  <div class="payment-text">
                    <div class="title-bold">
                      Total Payable amount:
                    </div>
                    <div>
                      <span class="title-bold-1">&#2547;</span>
                      920
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
                      Murad Khan
                    </div>
                  </div>
                  <div class="payment-text fix">
                    <div>
                      Phone No:
                    </div>
                    <div>
                      01710027639
                    </div>
                  </div>
                  <div class="payment-text fix">
                    <div>
                      Delivery Adreess:
                    </div>
                    <div>
                      13/16, Shisu Muhan, Boshak Lane, Warim, Dhaka - 1203
                    </div>
                  </div>
                  <div class="payment-text fix">
                    <div>
                      Delivery Zone:
                    </div>
                    <div>
                      Wari
                    </div>
                  </div>
                  <div class="payment-text fix">
                    <div>
                      Collectable Amount:
                    </div>
                    <div>
                      <span class="title-bold-1">&#2547;</span>
                      1014
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
  .payment-text.fix {
    grid-template-columns: 130px auto;
  }
}
.title-bold-1 {
  font-weight: 900;
}
</style>
