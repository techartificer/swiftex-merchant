<template>
  <div id="inspire">
    <v-navigation-drawer
    v-if="true"
      v-model="drawer"
      app
      clipped
    >
     <v-list
        dense
        rounded
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="goToRoute(item.to)"
        >
          <v-list-item-icon>
            <v-icon :class="{active: item.to===routePath}">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content :class="{active: item.to===routePath}">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-bottom-navigation
      fixed
      v-show="isMobile"
    >
      <v-text-field
        v-model="searchItem"
        class="fixed-width"
        single-line
        outlined
        dense
        label="Type parcel id here"
        color="secondary"
        :loading="isSearching"
        ></v-text-field>
        <v-btn
        dark
        class="ml_-1"
        color="secondary"
        depressed
        >Track Parcel</v-btn>
    </v-bottom-navigation>
    <v-app-bar
      app
      clipped-left
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title  @click="goToHome">
          <img src="../../assets/logo.png" alt="Logo"
          class="logo">
      </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
        v-if="!isMobile"
        v-model="searchItem"
        class="mt-6 fixed-width"
        single-line
        outlined
        dense
        label="Type parcel id here"
        color="secondary"
        :loading="isSearching"
        ></v-text-field>
        <v-btn
        v-show="!isMobile"
        dark
        class="ml_-1"
        color="black"
        elevation="0"
        >Track Parcel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
        small
        fab
        class="ml-0 mr-1"
        color="primary"
        rounded
        text
        icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-menu
        v-if="CurrentShop"
        open-on-hover
        bottom
        transition="slide-y-transition"
        offset-y
        rounded
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            class="ml-0 mr-0"
            color="secondary"
            rounded
            text
            outlined
            v-bind="attrs"
            v-on="on"
            >
              {{CurrentShop.name}} <v-icon> mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list
          dense
          rounded>
            <v-list-item
              v-for="(item, index) in MyShops"
              :key="index"
              link
              @click="setShop(item.id)"
              color="error"
            >
              <v-list-item-content>
                <v-list-item-title
                :class="{'list-tile': item.id === CurrentShop.id}"
                >{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              link
              @click="createNewShop"
            >
              <v-list-item-content>
                <v-list-item-title>Create New</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
        v-if="!CurrentShop"
        class="ml-0 mr-0"
        color="secondary"
        rounded
        text
        outlined
        :loading="isInit"
        @click="createNewShop"
        >
          Create <v-icon> mdi-plus</v-icon>
        </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import constants from '../../constants';
import permission from '../../constants/permission';
import eventBus from '../../helpers/eventBus';

export default {
  components: {
  },
  data: () => ({
    isSearching: false,
    searchItem: '',
    timeoutId: null,
    drawer: true,
    bottomNav: true,
    isInit: true,
  }),
  created() {
    this.$vuetify.theme.dark = false;
    this.initialize();
  },
  computed: {
    ...mapGetters(['IsLoggedIn', 'Permission', 'MyShops', 'CurrentShop']),
    items() {
      switch (this.Permission) {
        case constants.roles.OWNER:
          return permission.OWNER;
        case constants.roles.MODERATOR:
          return permission.MODERATOR;
        default:
          break;
      }
      return permission.common;
    },
    routePath() {
      return this.$route.path;
    },
    isMobile() {
      // eslint-disable-next-line default-case
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true;
        case 'sm': return true;
      }
      return false;
    },
    user() {
      if (!this.profile || !this.profile.name) return '';
      if (this.profile.name.length > 10) {
        const [fn] = this.profile.name.split(' ');
        return fn.substr(0, 10);
      }
      return this.profile.name.substr(0, 10);
    },
  },
  methods: {
    ...mapActions(['MY_SHOPS_REQUEST', 'SHOP_BY_ID_REQUEST', 'ORDERS_REQUEST']),
    async initialize() {
      const currentShopId = localStorage.getItem(constants.CURRENT_SHOP_ID);
      await this.MY_SHOPS_REQUEST();
      if (!currentShopId) {
        if (!this.MyShops?.length) {
          this.isInit = false;
          return;
        }
        await this.SHOP_BY_ID_REQUEST(this.MyShops[0]?.id);
      } else {
        await this.SHOP_BY_ID_REQUEST(currentShopId);
      }
      this.isInit = false;
    },
    createNewShop() {
      if (this.$route.path === '/my-shops') {
        eventBus.$emit(constants.events.SHOW_SHOP_CU_DIALOG, null);
      } else {
        this.goToRoute('/my-shops?create=true');
      }
    },
    goToRoute(r) {
      if (this.$route.path !== r) {
        this.$router.push(r);
      }
    },
    async setShop(id) {
      await this.SHOP_BY_ID_REQUEST(id);
    },
    goToHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
      this.initialize();
    },
  },
};
</script>
<style lang="scss" scoped>
.v-bottom-navigation.v-item-group.theme--light.v-bottom-navigation--fixed {
    display: flex;
    justify-content: flex-end;
}
.badge-fix {
  margin-left: -22px;
}
i.v-icon.notranslate.cart-down.mdi.mdi-chevron-down.theme--light {
    position: relative;
    margin-top: 10px;
}
.bounce-enter-active {
  animation: bounce-in .4s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.75);
  }
  50% {
    transform: scale(0.90);
  }
  50% {
    transform: scale(1.15);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
span.light {
    color: #fff;
}
.place-order {
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
    background: #56b342;
    color: #ffff;
    width: 400px;
    align-self: auto;
    padding: 14px;
}
img.logo {
  margin-left: -20px;
  height: 50px;
  margin-top: 10px;
  cursor: pointer;
}
.list-tile {
  color: #c83843;
}
.active {
  color: #c83843 !important;
}
.ml_-1 {
  height: 40px !important;
  margin-left: -4px;
  margin-bottom: 2px;
  color: #fff !important;
}
.ml_-1:hover {
  color: #fff !important;
}
.fixed-width {
  width: 30px;
  border-color: #c83843 !important;
  color: #c83843 !important;
}
</style>
