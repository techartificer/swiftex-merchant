<template>
  <div>

    <v-card width="450" class="mx-auto head pa-10" outlined>
      <v-card-text>
          <div class="login">
            <img src="../../assets/logo.png" alt="logo" class="log-img">
          </div>
          <div v-if="!isOTPVerified">
            <v-text-field
              autocomplete="off"
              ref="phone"
              :disabled="showOTP"
              :prefix="prefixText"
              @focus="focusEvent"
              @blur="focusEvent"
              dense
              outlined
              v-model="phone"
              :rules="[() => !!phone || 'This field is required', validatePhoneNumber]"
              label="Phone"
              type="tel"
              required
            ></v-text-field>
            <v-text-field
              v-if="showOTP"
              autocomplete="off"
              ref="otp"
              dense
              outlined
              v-model="code"
              :rules="[() => !!code || 'This field is required']"
              label="OTP"
              required
            ></v-text-field>
            <div id="recaptcha-container"></div>
            <div class="login">
              <v-btn color="primary"
              v-if="!showOTP"
              :block="!isLoading"
              :fab="isLoading"
              :loading="isLoading"
              :small="isLoading"
              @click="initPhoneNumberVerification"
              >Get OTP</v-btn>
              <v-btn color="primary"
              v-if="showOTP"
              :block="!isLoading"
              :fab="isLoading"
              :loading="isLoading"
              :small="isLoading"
              @click="verifyOTP"
              >Verify OTP</v-btn>
            </div>
          </div>
          <div v-else>
            <v-text-field
              autocomplete="off"
              ref="phone"
              disabled
              dense
              outlined
              v-model="phone"
              label="Phone"
              type="tel"
              required
            ></v-text-field>
            <v-text-field
              autocomplete="off"
              autofocus
              ref="name"
              dense
              outlined
              v-model="name"
              label="Name"
              validate-on-blur
              :rules="[() => !!name || 'This field is required']"
              required
            ></v-text-field>
            <v-text-field
              autocomplete="off"
              ref="email"
              dense
              outlined
              v-model="email"
              label="Email"
              :rules="[() => !!email || 'This field is required']"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              autocomplete="off"
              ref="password"
              dense
              outlined
              v-model="password"
              label="Password"
              :rules="[() => !!password || 'This field is required']"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              autocomplete="off"
              ref="conPassword"
              dense
              outlined
              v-model="conPassword"
              label="Confirm Password"
              :rules="[() => !!conPassword || 'This field is required']"
              type="password"
              required
            ></v-text-field>
            <div class="login">
              <v-btn color="primary"
                :block="!isLoading"
                :fab="isLoading"
                :loading="isLoading"
                :small="isLoading"
                @click="registerHandle"
                >Register</v-btn>
            </div>
          </div>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>

import firebaseMod from '../../plugins/firebase';
import { formatNumber } from '../../helpers/phoneNumber';

const { firebase, initialize } = firebaseMod;
export default {
  data: () => ({
    phone: '01710027639',
    showOTP: false,
    verificationId: '',
    code: '',
    isLoading: false,
    prefixText: '',
    isOTPVerified: false,
    name: '',
    email: '',
    password: '',
    conPassword: '',
  }),
  computed: {
    validatePhoneNumber() {
      const { isValid } = formatNumber(`+88${this.phone}`);
      if (!isValid) return 'Phone number should be valid';
      return true;
    },
    form() {
      return {
        name: this.name,
        email: this.email,
        phone: `88${this.phone}`,
        password: this.password,
      };
    },
  },
  mounted() {
    initialize();
  },
  methods: {
    focusEvent(e) {
      if (e.type === 'blur' && !this.phone) {
        this.prefixText = '';
      } else {
        this.prefixText = '+88';
      }
    },
    async registerHandle() {
      console.log(this.form);
      return null;
    },
    async verifyOTP() {
      try {
        this.isLoading = true;
        const { user } = await window.confirmationResult.confirm(this.code);
        console.log('Verified phone number: ', user.phoneNumber);
        this.isOTPVerified = true;
      } catch (err) {
        console.log(err.code);
        switch (err.code) {
          case 'auth/invalid-verification-code':
            this.$toast.error('Invalid verification code');
            break;
          case 'auth/code-expired':
            this.$toast.error('Verification code expired');
            break;
          default:
            this.$toast.error(err.message);
            break;
        }
      }
      this.isLoading = false;
    },
    async initPhoneNumberVerification() {
      this.isLoading = true;
      const { number, isValid } = formatNumber(`+88${this.phone}`);
      if (isValid) {
        try {
          // TODO: check is username already exist or not
          await this.sendOtp(`+${number}`);
        } catch (err) {
          this.$toast.error('Something wen wrong, try again');
        }
      }
      this.isLoading = false;
    },
    async sendOtp(phoneNumber) {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        // eslint-disable-next-line no-unused-vars
        callback: (resp) => {},
      });
      try {
        window.confirmationResult = await firebase.auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier);
        this.showOTP = true;
      } catch (err) {
        console.log(err);
        switch (err.code) {
          case 'auth/too-many-requests':
            this.$toast.error('Too many request. Try again later');
            break;
          case 'auth/invalid-phone-number':
            this.$toast.error('Invalid phone number');
            break;
          default:
            this.$toast.error(err.message);
            break;
        }
      }
      this.isLoading = false;
    },

  },
};
</script>
<style lang="scss" scoped>
.login {
  text-align: center;
}
.head {
  margin-top: 8%;
}
img.log-img {
    margin: 30px;
    margin-top: 0px;
    height: 70px;
}
</style>
