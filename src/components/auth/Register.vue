<template>
  <div>
    <v-card>
      <v-card-text>
        <v-text-field
        v-model="phone"
        dense
        outlined
        > </v-text-field>
      </v-card-text>
      <div id="recaptcha-container"></div>
      <v-btn @click="initPhoneNumberVerification"
      :loading="isLoading">Verify</v-btn>

      <v-text-field
        v-model="code"
        dense
        label="OTP"
        outlined
        > </v-text-field>
      <v-btn @click="verifyOTP">Verify OTP</v-btn>
    </v-card>
  </div>
</template>

<script>

import firebaseMod from '../../plugins/firebase';

const { firebase, initialize } = firebaseMod;
export default {
  data: () => ({
    phone: '+8801710027639',
    showOTP: false,
    verificationId: '',
    code: '',
    isLoading: false,
  }),
  mounted() {
    initialize();
  },
  methods: {
    async verifyOTP() {
      try {
        const { user } = await window.confirmationResult.confirm(this.code);
        console.log(user.phoneNumber);
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
    },
    async initPhoneNumberVerification() {
      this.isLoading = true;
      // TODO: check is username already exist or not
      await this.sendOtp();
    },
    async sendOtp() {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        // eslint-disable-next-line no-unused-vars
        callback: (resp) => {},
      });
      try {
        window.confirmationResult = await firebase.auth()
          .signInWithPhoneNumber(this.phone, appVerifier);
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
