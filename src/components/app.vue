<template lang="pug">
f7-app(v-bind='f7params')
  // Right panel with reveal effect
  f7-panel(right='' reveal='' )
    f7-view
      f7-page
        f7-navbar.navbar-bg-white()
          f7-nav-left
          f7-nav-title()
            img(src="../assets/images/logo.svg" alt="Logo INAGAVE" style="height:32px")
          f7-nav-right
        f7-list()
          f7-list-button(popup-open=".withdraws-popup" panel-close :text='$t("pages.withdraws")')
          f7-list-button(popup-open=".payments-popup" panel-close :text='$t("pages.payments")')
          f7-list-button(popup-open=".settings-popup" panel-close :text='$t("pages.settings")')

  // Views/Tabs container
  f7-views.safe-areas(tabs='')
    // Tabbar for switching views-tabs
    f7-toolbar(tabbar='' labels='' bottom='')
      f7-link(tab-link='#view-home' tab-link-active='' icon-f7='house_fill' :text='$t("pages.dashboard")')
      f7-link(tab-link='#view-store' icon-f7="rectangle_fill_on_rectangle_fill" :text='$t("pages.store")')
      f7-link(tab-link='#view-plants' icon-f7='heart_fill' :text='$t("pages.my_plants")')
    // Your main view/tab, should have "view-main" class. It also has "tab-active" class
    f7-view#view-home(main='' tab='' tab-active='' url='/')
    // Catalog View
    f7-view#view-store(name='catalog' tab='' url='/store/')
    // My Plants View
    f7-view#view-plants(name='plants' tab='' url='/plants/')
  login
  withdraws
  payments
  settings
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { f7, f7ready } from 'framework7-vue';
  import { getDevice }  from '../js/framework7-custom.js';
  import cordovaApp from '../js/cordova-app.js';


  import routes from '../js/routes.js';
  import store from '../js/store';
  import Login from "../pages/login.vue";
  import Withdraws from "../pages/withdraws.vue";
  import Payments from "../pages/payments.vue";
  import Settings from "../pages/settings.vue";

  export default{
    components: {Withdraws, Login, Payments, Settings},
    setup() {
      const device = getDevice();
      // Framework7 Parameters
      const f7params = {
        name: 'Inagave', // App name
        theme: 'ios', // Automatic theme detection

        id: 'com.inagave', // App bundle ID
        // App store
        store: store,
        // App routes
        routes: routes,


        // Input settings
        input: {
          scrollIntoViewOnFocus: device.cordova && !device.electron,
          scrollIntoViewCentered: device.cordova && !device.electron,
        },
        // Cordova Statusbar settings
        statusbar: {
          iosOverlaysWebView: false,
          androidOverlaysWebView: false,
        },
      };
      // Login screen data
      const username = ref('');
      const password = ref('');

      const alertLoginData = () => {
        f7.dialog.alert('Username: ' + username.value + '<br>Password: ' + password.value, () => {
          f7.loginScreen.close();
        });
      }
      onMounted(() => {
        f7ready(() => {
          // Init cordova APIs (see cordova-app.js)
          if (device.cordova) {
            cordovaApp.init(f7);
          }
        });
      });

      return {
        f7params,
        username,
        password,
        alertLoginData
      }
    }
  }
</script>
