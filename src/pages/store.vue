<template lang="pug">
f7-page(name="store")
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
      .bg-color-primary(:style="{height: '300px'}")
        f7-card-header.display-block(text-color='white') {{product.estate}}
          p
            small(:style='{opacity: 0.7}') {{ $t("strings.with_maintenance") }}
            br
            strong ${{product.maintenance_price}} (MXN)

            br
            br
            small(:style='{opacity: 0.7}') {{ $t("strings.without_maintenance") }}
            br
            strong ${{product.price}}  (MXN)
        f7-link.card-opened-fade-in(card-close='' color='black' :style="{position: 'absolute', right: '15px', top: '15px'}" icon-f7='xmark_circle_fill')
      .card-content-padding
        f7-row
          f7-col(v-for="(image, key) in product.images" )
            img.width-100(:src="$store.state.assets + 'products/' + image.src" :alt="image.name")
        f7-row
          f7-col
            p
              strong {{ $t("strings.details") }}
        f7-row
          f7-col
            strong Municipality:
          f7-col
            span {{product.municipality}}
        f7-row
          f7-col
            strong Estate Size:
          f7-col
            span {{product.size}}
        f7-row
          f7-col
            strong Plant Age:
          f7-col
            span {{product.age}}
        f7-row
          f7-col
            strong Quantity:
          f7-col
            span {{product.quantity}}
        f7-row
          f7-col
            strong Planted At:
          f7-col
            span {{moment(product.planted_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}
        f7-row
          f7-col
            strong Jimado At:
          f7-col
            span {{moment(product.jimado_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}
        f7-row
          f7-col
            f7-link(@click="openBrowser('https://www.google.com/maps/search/' + product.location )") {{ $t("buttons.show_in_maps") }}
        f7-row
          f7-col
            p
              strong {{ $t("strings.description") }}

        f7-row
          f7-col(v-html="product.description" )

</template>
<script>
import {useStore} from 'framework7-vue';
import store from '../js/store'
import moment from 'moment'
export default {
  setup() {
    return {};
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
      this.axios.get(this.$store.state.api + 'get/store/products').then((response) => {
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
