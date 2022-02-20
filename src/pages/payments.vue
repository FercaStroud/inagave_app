<template lang="pug">
f7-popup(class="payments-popup" swipe-to-close)
  f7-page(name="payments")
    f7-navbar.navbar-bg-white()
      f7-nav-left
      f7-nav-title()
        span  {{ $t("pages.payments") }}
      f7-nav-right
        f7-link(popup-close) {{ $t("buttons.close") }}

    f7-list(media-list v-if="$store.state.isLoading")
      f7-list-item(
        v-for="n in 3"
        :key="n"
        :class="'skeleton-text skeleton-effect-wave'"
        title="Full Name"
        subtitle="Position"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
      )
      template#media
        f7-skeleton-block(
          style="width: 40px; height: 40px; border-radius: 50%"
        )
    f7-block-title(
      v-if="!$store.state.isLoading"
    ) {{ $t("strings.my_wallet_transactions") }}
    f7-list(
      accordion-list
      inset
      v-if="!$store.state.isLoading"
    )
      f7-list-item(
        v-for="(data, key) in $store.state.payments"
        :key="key"
        :class="data._rowVariant"
        accordion-item
        :title="moment(data.created_at).format('DD MMM YYYY') + ' / $ ' + data.total + ' (MXN)'"
      )
        f7-accordion-content
          f7-block
            f7-row
              f7-col
                strong {{ $t("strings.created_at") }}
              f7-col
                span {{ moment(data.created_at).format('DD MMM YYYY') }}
            f7-row
              f7-col
                strong {{ $t("strings.estate") }}
              f7-col
                span {{ data.estate }}
            f7-row
              f7-col
                strong {{ $t("strings.price") }}
              f7-col
                span {{ data.price }}
            f7-row
              f7-col
                strong {{ $t("strings.quantity") }}
              f7-col
                span {{ data.quantity }}
            f7-row
              f7-col
                strong ID
              f7-col
                span {{ data.preference_id }}

</template>
<script>
import moment from 'moment'

export default {
  setup() {
    return {
    };
  },
  data() {
    return {
      moment: null,
    }
  },
  created: function () {
    this.moment = moment;
  },
  methods: {
  },
};
</script>

<style scoped>
.danger{
  background: rgba(255, 17, 10, 0.1);
}
.info{
  background: rgba(255, 276, 0, .3);
  color: black !important;
}
.success{
  background: rgba(76, 217, 100, 0.3);
}
</style>
