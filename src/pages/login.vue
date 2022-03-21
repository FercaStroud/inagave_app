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

          f7-list(inset)
            f7-list-button(:title="$t('buttons.spanish')" @click="$i18n.locale = 'es'")
            f7-list-button(:title="$t('buttons.english')" @click="$i18n.locale = 'en'")
    f7-popup(
      v-model:opened="registerModal"
    )
      f7-navbar()
        f7-nav-left(@click='registerModal = false')
          .padding() {{$t("buttons.cancel")}}
        f7-nav-title
        f7-nav-right(@click="register")
          .padding {{$t("buttons.submit")}}
      f7-page.bg-color-white(style="")
        f7-block()
          f7-block-header {{$t("pages.register")}}
          f7-list()
            f7-list-input(type='text' v-model:value="form.name" :placeholder='$t("strings.form_name")')
            f7-list-input(type='text' v-model:value="form.lastname" :placeholder='$t("strings.form_lastname")')
            f7-list-input(type='text' v-model:value="form.second_lastname" :placeholder='$t("strings.form_second_lastname")')
            f7-list-input(type='email' v-model:value="form.email" :placeholder='$t("strings.form_email")')
            f7-list-input(type='textarea' v-model:value="form.address" :placeholder='$t("strings.form_address")')
            f7-list-input(type='text' v-model:value="form.municipality" :placeholder='$t("strings.form_municipality")')
            f7-list-input(type='text' v-model:value="form.city"  :placeholder='$t("strings.form_city")')
            f7-list-input(type='text' v-model:value="form.country"  :placeholder='$t("strings.form_country")')
            f7-list-input(type='text' v-model:value="form.state"  :placeholder='$t("strings.form_state")')
            f7-list-input(type='password' v-model:value="form.password"  :placeholder='$t("strings.your_password")')
            f7-list-input(type='password' v-model:value="form.password_confirmation" :placeholder='$t("strings.password_confirmation")')
          f7-block-footer
            br
            | {{ $t("strings.privacy_policy") }}
            br
            | inagave.com
</template>
<script>
import {useStore} from 'framework7-vue';
import store from '../js/store'
import {f7} from 'framework7-vue';

export default {
  setup() {
    return {};
  },
  data() {
    return {
      email: '',
      password: '',
      registerModal: false,
      form: {
        name: '',
        lastname: '',
        second_lastname: '',
        email: '',
        address: '',
        municipality: '',
        city: '',
        country: '',
        state: '',
        password: '',
        password_confirmation: '',
      }
    };
  },
  methods: {
    checkUser() {
      let t = this.$t;

      f7.dialog.preloader('');
      this.axios.post(this.$store.state.api + 'login', {
        email: this.email,
        password: this.password,
      }).then((response) => {
        if (response.data.errors === undefined) {
          this.$store.commit('setUser', response.data);
          console.log(this.$store.state.user)
        } else {
          f7.dialog.alert(response.data.errors.email[0], response.data.message);
        }
      }).catch(function (error) {
        f7.dialog.alert(t("strings.host_not_available"));
      }).finally(function () {
        f7.dialog.close();
      });
    },
    register() {
      let vm = this;
      let t = this.$t;
      f7.dialog.preloader('');

      this.axios.post(this.$store.state.api + 'register', this.form).then((response) => {
          if(response.data.errors === undefined){
            f7.dialog.alert(t("strings.successful_registration"));
            vm.registerModal = false;
          } else{
            f7.dialog.alert(t("strings.please_check_required_fields"));
          }
      }).catch(function (error) {
        f7.dialog.alert(t("strings.host_not_available"));
      }).finally(function () {
        f7.dialog.close();
      });
    },
  },
};
</script>
