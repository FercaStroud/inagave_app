<template lang="pug">
f7-panel(right='' reveal='' )
  f7-view
    f7-page
      f7-navbar.navbar-bg-white()
        f7-nav-left
        f7-nav-title()
          strong.roboto-thin {{$store.state.user.name}} {{$store.state.user.lastname}}, {{ $t("strings.welcome") }}
        f7-nav-right
      f7-list()
        f7-list-button(popup-open=".withdraws-popup" panel-close :text='$t("pages.withdraws")')
        f7-list-button(popup-open=".payments-popup" panel-close :text='$t("pages.payments")')
        f7-list-button(popup-open=".settings-popup" panel-close :text='$t("pages.settings")')
        f7-list-button(@click="clearUser" panel-close :text='$t("buttons.logout")')

</template>

<script>

export default {
  created: function () {
    //console.log('a is: ' + this.$store.state.count)
  },
  setup() {

  },
  data() {
    return {}
  },
  methods: {
    clearUser(){
      this.$store.commit('clearUser');
    }
  },
};
</script>
<style scoped>

</style>
