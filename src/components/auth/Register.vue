<template>
  <div class="root">
    <div class="login-bg">
    <img class="login-img" src="../../assets/delivery-login-page.svg" alt="">
    <div class="login-txt">
      <h1>
        Ensure the safest & <br>
        Fastest delivery in town.
      </h1>
    </div>
  </div>
    <v-row :justify="isMobile?'center': 'end'" class="cmt-12 ml-20">
    <v-col
      cols="12"
      sm="8"
      md="4"
      lg="4"
      class="login-field"
    >
    <v-card ref="form" class="mt-16" min-height="400"
     :class="{'pa-10': !isMobile}" outlined max-width="500">
      <v-card-text>
          <div class="login" @click="$router.push('/')">
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
              :rules="[() => !!phone || 'This field is required',isAvilable, validatePhoneNumber]"
              label="Phone"
              type="tel"
              @keyup.enter="initPhoneNumberVerification"
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
              :error-messages="otpErrMsg"
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
              >Request OTP</v-btn>
              <v-btn
              v-if="!showOTP && !isLoading"
              color="secondary"
              block
              class="mt-2"
              @click="$router.push('/')"
              >already have an account</v-btn>

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
              label="Your Name"
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
              :rules="[
                () => !!password || 'This field is required',
                lengthCheck
              ]"
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
              :rules="[
                () => !!conPassword || 'This field is required',
                lengthCheck
              ]"
              type="password"
              :error-messages="conPassErrMsg"
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
    </v-col>
    </v-row>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import firebaseMod from '../../plugins/firebase';
import { formatNumber } from '../../helpers/phoneNumber';

const { firebase, initialize } = firebaseMod;
export default {
  data: () => ({
    phone: '',
    showOTP: false,
    verificationId: '',
    code: '',
    isLoading: false,
    prefixText: '',
    isOTPVerified: false,
    name: '',
    email: '',
    password: '',
    otpErrMsg: '',
    conPassword: '',
    notAvailable: [],
    conPassErrMsg: '',
    token: '',
  }),
  computed: {
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true;
        case 'sm': return true;
        default: return false;
      }
    },
    isAvilable() {
      const avilable = this.notAvailable && this.notAvailable.includes(`88${this.phone}`);
      return !avilable ? true : 'Username already exist';
    },
    lengthCheck() {
      return this.password.length <= 5 ? 'Length should be at least 6' : true;
    },
    validatePhoneNumber() {
      const { isValid } = formatNumber(`+88${this.phone}`);
      if (!isValid) return 'Phone number should be valid';
      return true;
    },
    form() {
      return {
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password,
      };
    },
  },
  mounted() {
    initialize();
  },
  watch: {
    password(val) {
      if (this.password && this.conPassword && val !== this.conPassword) {
        this.conPassErrMsg = 'Password not matched';
      } else { this.conPassErrMsg = ''; }
    },
    conPassword(val) {
      if (this.password && this.conPassword && val !== this.password) {
        this.conPassErrMsg = 'Password not matched';
      } else { this.conPassErrMsg = ''; }
    },
    code(val) {
      if (val?.length === 6) {
        this.otpErrMsg = '';
      }
    },
  },
  methods: {
    ...mapActions(['IS_USERNAME_AVAILABLE', 'REGISTER']),
    focusEvent(e) {
      if (e.type === 'blur' && !this.phone) {
        this.prefixText = '';
      } else {
        this.prefixText = '+88';
      }
    },
    validdateForm() {
      let formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) formHasErrors = true;
        this.$refs[f].validate(true);
      });
      return formHasErrors;
    },
    async registerHandle() {
      this.isLoading = true;
      const formHasErrors = this.validdateForm();
      if (formHasErrors) return;
      try {
        await this.REGISTER({ body: this.form, token: this.token });
        this.$toast.success('Registration successful');
        this.$router.push('/');
      } catch (err) {
        // err
      }
      this.isLoading = false;
    },
    async verifyOTP() {
      try {
        if (this.code?.length !== 6) {
          this.otpErrMsg = 'Code length should be 6';
          return;
        }
        this.isLoading = true;
        const data = await window.confirmationResult.confirm(this.code);
        this.token = await data.user.getIdToken();
        const { user } = data;
        this.phone = user.phoneNumber.substr(1);
        this.isOTPVerified = true;
      } catch (err) {
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
      if (isValid && this.isAvilable === true) {
        try {
          const isAvilable = await this.IS_USERNAME_AVAILABLE(number);
          if (!isAvilable) {
            this.notAvailable.push(number);
            this.$toast.error('Username already exist');
            this.isLoading = false;
            return;
          }
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
  cursor: pointer;
}
.head {
  margin-top: 8%;
}
img.log-img {
    margin: 30px;
    margin-top: 0px;
    height: 70px;
}
img.log-img {
    margin: 30px;
    margin-top: 10px;
    height: 70px;
}
.btns-forgot {
  padding-top: 10px;
  color: #c83843;
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
  cursor: pointer;
  // text-decoration: underline;
}
.signup-header {
  color: #c83843;
  display: flex;
  justify-content: center;
}
.cmt-12 {
  display: flex;
  justify-content: center;
}
.root {

  height: 100vh;
  /* background-image: url("../assets/swiftex_back.webp"); */
  /* background-position: center; Center the image
  background-repeat: no-repeat; Do not repeat the image */
  /* background-size: cover; Resize the background image to cover the entire container */
  display: flex;
  justify-content: space-between;

}
.login-field {
text-align: center;
  margin-top: 12vh;
}

.login-bg {
  background-image: linear-gradient(to right top, #e51414, #cf1c1d,
   #b92224, #a32628, #8d292a, #822b33, #752e3a,
    #67313e, #5d3747, #533c4b, #4a414b, #454446);
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-img {
  width: 60%;
  margin-top: -100px;
}

.login-txt {
  width: 100%;
  color: #fff;
  font-family: inherit;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  margin-top: 100px;
  letter-spacing: 2px;
  font-size: 16px;
}

.ml-20 {
  margin-right: 7%;
}

@media screen and (max-width: 960px) {
  .ml-20 {
    margin-right: 0;
  }

  .login-bg {
  display: none;
}
  }

</style>
