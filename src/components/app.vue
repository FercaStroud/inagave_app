<template lang="pug">
f7-app(v-bind='f7params')
  // Left panel with cover effect when hidden
  f7-panel(left='' cover='' theme-dark='' :visible-breakpoint='960')
    f7-view
      f7-page
        f7-navbar(title='Left Panel')
        f7-block-title Left View Navigation
        f7-block
          pre {{ store.state.drawer.login }}
        f7-list
          f7-list-item(link='/left-page-1/' title='Left Page 1')
          f7-list-item(link='/left-page-2/' title='Left Page 2')
        f7-block-title Control Main View
        f7-list
          f7-list-item(link='/about/' view='.view-main' panel-close='' title='About')
          f7-list-item(link='/form/' view='.view-main' panel-close='' title='Form')
          f7-list-item(link='#' view='.view-main' back='' panel-close='' title='Back in history')
  // Right panel with reveal effect
  f7-panel(right='' reveal='' theme-dark='')
    f7-view
      f7-page
        f7-navbar(title='Right Panel')
        f7-block Right panel content goes here
  // Your main view, should have "view-main" class
  f7-view.safe-areas(main='' url='/')
  // Popup
  f7-popup#my-popup
    f7-view
      f7-page
        f7-navbar(title='Popup')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block
          p Popup content goes here.

  f7-login-screen(
    :opened="store.state.drawer.login"
  )
    login

</template>
<script>
  import { ref, onMounted } from 'vue';
  import { f7, f7ready } from 'framework7-vue';
  import { getDevice }  from 'framework7/lite-bundle';
  import cordovaApp from '../js/cordova-app.js';

  import routes from '../js/routes.js';
  import store from '../js/store';
  import login from '../pages/login.vue';

  export default {
    components: { login },
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
        store,
        f7params,
        username,
        password,
        alertLoginData
      }
    },
    created() {
      console.log()
    },
  }
</script>
