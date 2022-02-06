<template lang="pug">
f7-app(v-bind='f7params')
  // Right panel with reveal effect
  f7-panel(right='' reveal='' theme-dark='')
    f7-view
      f7-page
        f7-navbar(title='Right Panel')
        f7-block Right panel content goes here
  // Views/Tabs container
  f7-views.safe-areas(tabs='')
    // Tabbar for switching views-tabs
    f7-toolbar(tabbar='' labels='' bottom='')
      f7-link(tab-link='#view-home' tab-link-active='' icon-ios='f7:house_fill' icon-aurora='f7:house_fill' icon-md='material:home'  text='Home')
      f7-link(tab-link='#view-store' icon-ios='f7:bag_fill' icon-md='f7:bag_fill' text='Store')
      f7-link(tab-link='#view-settings' icon-ios='f7:gear' icon-aurora='f7:gear' icon-md='material:settings' text='Settings')
    // Your main view/tab, should have "view-main" class. It also has "tab-active" class
    f7-view#view-home(main='' tab='' tab-active='' url='/')
    // Catalog View
    f7-view#view-store(name='catalog' tab='' url='/store/')
    // Settings View
    f7-view#view-settings(name='settings' tab='' url='/settings/')
  // Popup
  f7-popup#my-popup
    f7-view
      f7-page
        f7-navbar(title='Popup')
          f7-nav-right
            f7-link(popup-close='') {{ $t("buttons.close") }}
        f7-block
          p Popup content goes here.
  login

</template>
<script>
  import { ref, onMounted } from 'vue';
  import { f7, f7ready } from 'framework7-vue';
  import { getDevice }  from '../js/framework7-custom.js';
  import cordovaApp from '../js/cordova-app.js';


  import routes from '../js/routes.js';
  import store from '../js/store';
  import Login from "../pages/login.vue";

  export default{
    components: {Login},
    setup() {
      const device = getDevice();
      // Framework7 Parameters
      const f7params = {
        name: 'Inagave', // App name
        theme: 'auto', // Automatic theme detection

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
          iosOverlaysWebView: true,
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

          // Call F7 APIs here

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
