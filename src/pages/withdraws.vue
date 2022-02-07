<template lang="pug">
f7-popup(class="withdraws-popup" swipe-to-close)
  f7-page(name="withdraws")
    f7-navbar.navbar-bg-white()
      f7-nav-left
      f7-nav-title()
        span  {{ $t("pages.withdraws") }}
      f7-nav-right
        f7-link(popup-close) {{ $t("buttons.close") }}
</template>
<script>
export default {
  setup() {
    return {
    };
  },
  data() {
    return {

    }
  },
  methods: {
  },
};
</script>
