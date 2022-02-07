<template lang="pug">
f7-login-screen(
  :opened="!$store.state.isLogged"
)
  f7-view
    f7-page(login-screen='')
      f7-login-screen-title
        img(src="../assets/images/logo.svg" alt="Logo INAGAVE" style="")
        .roboto-thin.color-primary(style="font-size:.5em") {{$t("strings.invest_in_agaves")}}
      f7-block
        f7-list(form='' inset)
          f7-list-input(type='text' :placeholder='$t("strings.your_email")' v-model:value='email')
          f7-list-input(type='password' :placeholder='$t("strings.your_password")' v-model:value='password')
        f7-list
          f7-list-button(:title='$t("buttons.login")' @click='checkUser')
          f7-list-button(:title='$t("buttons.register")' @click='registerModal = true')
        f7-block-footer(style="padding-top:40px")
          | {{ $t("strings.privacy_policy") }}
          br
          | inagave.com
  f7-popup(
    v-model:opened="registerModal"
  )
    f7-navbar()
      f7-nav-left(@click='registerModal = false')
        .padding() {{$t("buttons.cancel")}}
      f7-nav-title
      f7-nav-right()
        .padding {{$t("buttons.submit")}}
    f7-page.bg-color-white(style="")
      f7-block()
        f7-block-header {{$t("pages.register")}}
        f7-list()
          f7-list-input(type='text' :placeholder='$t("strings.form_name")')
          f7-list-input(type='text' :placeholder='$t("strings.form_lastname")')
          f7-list-input(type='text' :placeholder='$t("strings.form_second_lastname")')
          f7-list-input(type='email' :placeholder='$t("strings.form_email")')
          f7-list-input(type='textarea' :placeholder='$t("strings.form_address")')
          f7-list-input(type='text' :placeholder='$t("strings.form_municipality")')
          f7-list-input(type='text' :placeholder='$t("strings.form_city")')
          f7-list-input(type='text' :placeholder='$t("strings.form_country")')
          f7-list-input(type='text' :placeholder='$t("strings.form_state")')
          f7-list-input(type='password' :placeholder='$t("strings.your_password")')
        f7-block-footer
          br
          | {{ $t("strings.privacy_policy") }}
          br
          | inagave.com
</template>
<script>
import { useStore } from 'framework7-vue';
import store from '../js/store'
export default {
  setup() {
    return {
    };
  },
  data() {
    return {
      email: '',
      password: '',
      registerModal: false,
    };
  },
  methods: {
    checkUser(){
      this.axios.post(this.$store.state.api, {
        email: this.email,
        password: this.password,
      }).then((response) => {
        console.log(response.data)
      })
      //this.$store.commit('setUser');
    }
  },
};
</script>
