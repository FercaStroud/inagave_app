<template lang="pug">
f7-page(name="plants")
  f7-navbar.navbar-bg-white()
    f7-nav-left
    f7-nav-title()
      img(src="../assets/images/logo.svg" alt="Logo INAGAVE" style="height:32px")
    f7-nav-right
      f7-link(icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right")

  //f7-tabs
  //  f7-tab(
  //    class="page-content ptr-content tab-active"
  //    @ptr:refresh.native="onPullToRefresh"
  //
  //  )
  //    .ptr-preloader
  //      .preloader
  //      .ptr-arrow

  f7-list(media-list v-if="isLoading")
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

  f7-list(media-list v-if="isLoading")
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

  f7-card(
    expandable
    swipe-to-close
    v-if="!isLoading"
    v-for="(product, key) in products"
    :key="key"
  )
    f7-card-content(:padding='false')
      .bg-color-white
        f7-card-header.display-block.roboto-thin.color-black() {{product.estate}}
        f7-block
          f7-row
            f7-col(style="margin-top:-10px")
              strong {{ $t("strings.municipality") }}:
              span(style="margin-left:7px") {{product.municipality}}
          f7-row
            f7-col
              strong {{ $t("strings.estate_size") }}:
              span(style="margin-left:7px") {{product.size}}
          f7-row
            f7-col
              strong {{ $t("strings.plant_age") }}:
              span(style="margin-left:7px") {{product.age}}
          f7-row
            f7-col
              strong {{ $t("strings.quantity") }}:
              span(style="margin-left:7px") {{product.quantity}}
          f7-row
            f7-col
              strong {{ $t("strings.planted_at") }}:
              br/
              span(style="margin-left:7px") {{moment(product.planted_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}
          f7-row
            f7-col
              strong {{ $t("strings.jimado_at") }}:
              br/
              span(style="margin-left:7px") {{moment(product.jimado_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}
          f7-row
            f7-col
              strong {{ $t("strings.created_at") }}:
              br/
              span(style="margin-left:7px") {{moment(product.created_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}
          f7-row
            f7-col
              strong {{ $t("strings.for_sale") }}:
              span(style="margin-left:7px" v-if="product.available === 1" ) {{ $t("strings.true") }}
              span(style="margin-left:7px" v-else ) {{ $t("strings.false") }}
          f7-link.card-opened-fade-in(card-close='' color='black' :style="{position: 'absolute', right: '15px', top: '15px'}" icon-f7='xmark_circle_fill')
      .card-content-padding
        f7-row
          f7-col
            p
              strong {{ $t("strings.details") }}
        f7-row
          f7-col
            f7-link(@click="openBrowser('https://www.google.com/maps/search/' + product.location )") {{ $t("buttons.show_in_maps") }}
        f7-row
          f7-col
            p
              strong {{ $t("strings.description") }}
        f7-row
          f7-col(v-html="product.description" )

        f7-row(v-if="(product.maintenances).length > 0" )
          f7-col
            p
              strong {{ $t("pages.payments") }}
        f7-row
          f7-col
            f7-card.bg-color-gray(style="padding:9px")
              ul(v-for="(maintenance,key) in product.maintenances" :key="key")
                li
                  span Payment ID: {{ maintenance.id }}
                li
                  span Price: {{ maintenance.price }}
                li
                  span Quantity: {{ maintenance.quantity }}
                li
                  span Total: {{ maintenance.total }}
                li
                  span Collection ID: {{ maintenance.collection_id }}
                li
                  span Collection Status: {{ maintenance.collection_status }}
                li
                  span Payment ID: {{ maintenance.payment_id }}
                li
                  span Status: {{ maintenance.status }}
                li
                  span Payment Type: {{ maintenance.payment_type }}
                li
                  span External Reference: {{ maintenance.external_reference }}
                li
                  span Merchant Order ID: {{ maintenance.merchant_order_id }}
                li
                  span Preference ID: {{ maintenance.preference_id }}
                li
                  span Processing Mode": {{ maintenance.processing_mode }}
                li
                  span Merchant Account ID: {{ maintenance.merchant_account_id }}
                li
                  span Start Date: {{moment(maintenance.start_date).format("ddd MMM DD, YYYY [at] HH:mm a") }}
                li
                  span End Date: {{moment(maintenance.end_date).format("ddd MMM DD, YYYY [at] HH:mm a") }}

</template>
<script>
import {useStore} from 'framework7-vue';
import store from '../js/store'
import moment from 'moment'

export default {
  setup() {
    return {
    };
  },
  data() {
    return {
      moment: null,
      isLoading: false,
      modal: false,
      products: [],
      product: {},
    }
  },
  created: function () {
    this.moment = moment;
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    onPageInit() {
      this.getProducts();
    },
    onPullToRefresh(e, done) {
      this.getProducts();
      e.detail();
    },
    getProducts() {
      let vm = this;
      let t = this.$t;
      this.isLoading = true;
      this.axios.post(this.$store.state.api + 'get/user/products?user_id='+ vm.$store.state.user.id).then((response) => {
        vm.products = response.data;
      }).catch(function (error) {
        console.log(error)

      }).finally(function () {
        vm.isLoading = false;

      });
    },
    openBrowser(url) {
      let options = "location=no,clearcache=yes,clearsessioncache=yes,zoom=yes,EnableViewPortScale=yes"
      let ref = cordova.InAppBrowser.open(url, '_system', options);
    },
  },
};
</script>
