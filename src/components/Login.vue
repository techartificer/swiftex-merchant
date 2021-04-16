<template>
<div class="root">
  <div class="login-bg">
    <img class="login-img" src="../assets/delivery-login-page.svg" alt="">
    <div class="login-txt">
      <h1>
        Ensure the safest & <br>
        Fastest delivery in town.
      </h1>
    </div>
  </div>
  <v-row :justify="isMobile?'center': 'end ml-20'" class="cmt-12">
    <v-col
      cols="8"
      sm="10"
      md="4"
      lg="4"
      class="login-field"
    >
      <v-card ref="form" class="mt-16" outlined
      :class="{'pa-10': !isMobile}" max-width="500">
        <v-form>
          <v-card-text>
            <div class="login">
              <img src="../assets/logo.png" alt="logo" class="log-img">
            </div>
            <v-text-field
              autocomplete="off"
              single-line
              ref="phone"
              :prefix="prefixText"
              @focus="focusEvent"
              @blur="focusEvent"
              dense
              outlined
              placeholder="Phone"
              v-model="phone"
              :rules="[() => !!phone || 'This field is required', validatePhoneNumber]"
              type="tel"
              required
            ></v-text-field>
            <v-text-field
              autocomplete="off"
              single-line
              ref="password"
              dense
              outlined
              v-model="password"
              :rules="[() => !!password || 'This field is required']"
              placeholder="Password"
              type="password"
              required
              @keyup.enter="handleLogin"
            ></v-text-field>
            <div class="login">
              <v-btn color="primary"
              :block="!isLoading"
              :fab="isLoading"
              :loading="isLoading"
              :small="isLoading"
              @click="handleLogin"
              >Login</v-btn>
            </div>
            <!-- <div class="mt-4 signup-header">
              Don't Have An Account?
            </div> -->
            <div class="mt-2">
              <v-btn
                v-if="!showOTP && !isLoading"
                color="secondary"
                block
                class="mt-2"
                @click="$router.push('/register')"
              >
                Join as a merchant
              </v-btn>
            <div text class="mt-2 btns-forgot"
            @click="$router.push('/forgot-password')">
                Forgot Password?
            </div>
            </div>
          </v-card-text>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatNumber } from '../helpers/phoneNumber';

export default {
  name: 'Login',
  data() {
    return {
      prefixText: '',
      phone: '',
      password: '',
      isLoading: false,
      showOTP: false,
    };
  },
  computed: {
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true;
        case 'sm': return true;
        default: return false;
      }
    },
    loginForm() {
      return {
        password: this.password,
        phone: this.phone,
      };
    },
    validatePhoneNumber() {
      const { isValid } = formatNumber(`+88${this.phone}`);
      if (!isValid) return 'Phone number should be valid';
      return true;
    },
  },
  methods: {
    ...mapActions(['MERCHANT_LOGIN_REQUEST', 'REFRESH_TOKEN_REQUEST', 'LOGOUT_REQUEST']),
    focusEvent(e) {
      if (e.type === 'blur' && !this.phone) {
        this.prefixText = '';
      } else {
        this.prefixText = '+88';
      }
    },
    validdateLoginForm() {
      let formHasErrors = false;
      Object.keys(this.loginForm).forEach((f) => {
        if (!this.loginForm[f]) formHasErrors = true;
        this.$refs[f].validate(true);
      });
      return formHasErrors;
    },
    async handleLogin() {
      try {
        this.isLoading = true;
        const { number, isValid } = formatNumber(`+88${this.phone}`);
        const v = this.validdateLoginForm();
        if (this.phone && this.password && !v && isValid) {
          await this.MERCHANT_LOGIN_REQUEST({
            phone: number,
            password: this.password,
          });
        }
      } catch (err) {
        // console.log(err);
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
