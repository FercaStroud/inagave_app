<template lang="pug">
f7-popup(class="settings-popup" swipe-to-close)
  f7-page(name="settings")
    f7-navbar.navbar-bg-white()
      f7-nav-left
      f7-nav-title()
        span  {{ $t("pages.settings") }}
      f7-nav-right
        f7-link(popup-close) {{ $t("buttons.close") }}

    f7-list(inset)
      f7-list-input(
        :label="$t('strings.form_name')"
        type="text"
        :placeholder="$t('strings.form_name')"
        clear-button
        v-model:value="$store.state.user.name"
      )
      f7-list-input(
        :label="$t('strings.form_lastname')"
        type="text"
        :placeholder="$t('strings.form_lastname')"
        clear-button
        v-model:value="$store.state.user.lastname"
      )
      f7-list-input(
        :label="$t('strings.form_second_lastname')"
        type="text"
        :placeholder="$t('strings.form_second_lastname')"
        clear-button
        v-model:value="$store.state.user.second_lastname"
      )
      f7-list-input(
        :label="$t('strings.form_address')"
        type="textarea"
        :placeholder="$t('strings.form_address')"
        clear-button
        v-model:value="$store.state.user.address"
      )
      f7-list-input(
        :label="$t('strings.form_municipality')"
        type="text"
        :placeholder="$t('strings.form_municipality')"
        clear-button
        v-model:value="$store.state.user.municipality"
      )
      f7-list-input(
        :label="$t('strings.form_city')"
        type="text"
        :placeholder="$t('strings.form_city')"
        clear-button
        v-model:value="$store.state.user.city"
      )
      f7-list-input(
        :label="$t('strings.form_country')"
        type="text"
        :placeholder="$t('strings.form_country')"
        clear-button
        v-model:value="$store.state.user.country"
      )
      f7-list-input(
        :label="$t('strings.form_state')"
        type="text"
        :placeholder="$t('strings.form_state')"
        clear-button
        v-model:value="$store.state.user.state"
      )
      f7-list-button(:title="$t('buttons.save')")

    f7-list(inset)
      f7-list-input(
        :label="$t('strings.form_password')"
        type="text"
        :placeholder="$t('strings.form_password')"
        clear-button
        v-model:value="password"
      )
      f7-list-button(:title="$t('buttons.save')")

    f7-list(inset)
      f7-list-button(:title="$t('buttons.spanish')" @click="$i18n.locale = 'es'")
      f7-list-button(:title="$t('buttons.english')" @click="$i18n.locale = 'en'")


</template>
<script>
export default {
  setup() {
    return {
    };
  },
  data() {
    return {
      password: '',
    }
  },
  methods: {
  },
};
</script>
