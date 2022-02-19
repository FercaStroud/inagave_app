<template lang="pug">
f7-page(name="store")
  f7-navbar.navbar-bg-white()
    f7-nav-left
    f7-nav-title()
      img(src="../assets/images/logo.svg" alt="Logo INAGAVE" style="height:32px")
    f7-nav-right
      f7-link(icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right")
  .mp-container
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
  f7-card(
    expandable
    swipe-to-close
    v-if="!$store.state.isLoading"
    v-for="(product, key) in $store.state.products"
    :key="key"
    style="background: transparent !important"
  )
    f7-card-content(:padding='false')
      .bg-color-primary(:style="{height: '60px'}")
        f7-card-header.display-block(text-color='white') {{product.estate}}
          //p
            small(:style='{opacity: 0.7}') {{ $t("strings.with_maintenance") }}
            br
            strong ${{product.maintenance_price}} (MXN)

            br
            br
            small(:style='{opacity: 0.7}') {{ $t("strings.without_maintenance") }}
            br
            strong ${{product.price}}  (MXN)
        f7-link.card-opened-fade-in(card-close='' color='black' :style="{position: 'absolute', right: '15px', top: '15px'}" icon-f7='xmark_circle_fill')
      .card-content-padding.glass
        f7-row
          f7-col(v-for="(image, key) in product.images" )
            img.width-100(:src="$store.state.assets + 'products/' + image.src" :alt="image.name")
        f7-row
          f7-col
            p
              strong {{ $t("strings.details") }}
        f7-row
          f7-col
            strong {{ $t("strings.form_municipality") }} :
          f7-col
            span {{product.municipality}}
        f7-row
          f7-col
            strong {{ $t("strings.form_size") }} :
          f7-col
            span {{product.size}}
        f7-row
          f7-col
            strong  {{ $t("strings.form_age") }} :
          f7-col
            span {{product.age}}
        f7-row
          f7-col
            strong  {{ $t("strings.form_quantity") }} :
          f7-col
            span {{product.quantity}}
        f7-row
          f7-col
            strong  {{ $t("strings.planted_at") }} :
          f7-col
            span {{moment(product.planted_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}
        f7-row
          f7-col
            strong {{ $t("strings.jimado_at") }} :
          f7-col
            span {{moment(product.jimado_at).format("ddd MMM DD, YYYY [at] HH:mm a") }}
        f7-row
          f7-col
            strong {{ $t("strings.owner") }} :
          f7-col
            span {{ product.user.name }}
        f7-row
          f7-col
            f7-link(@click="openBrowser('https://www.google.com/maps/search/' + product.location )") {{ $t("buttons.show_in_maps") }}
        f7-row
          f7-col
            p
              strong {{ $t("strings.description") }}

        f7-row
          f7-col(v-html="product.description" )

        f7-row.margin-top
          f7-col.bg-color-primary(style="height:2px;")
        f7-row.margin-top
          f7-col
            f7-list(inset)
              f7-list-input(
                :label="$t('strings.quantity')"
                type="number"
                :placeholder="$t('strings.quantity')"
                clear-button
                v-model:value="product.checkoutQty"
              )
        f7-row.margin-top
          f7-col()
            strong {{ $t("strings.total") }}:
            span.margin-left(v-if="selectedPrice === 'inagave'") $ {{ parseFloat(product.checkoutQty * product.maintenance_price).toFixed(2)  }} (MXN)
            span.margin-left(v-else) $ {{ parseFloat(product.checkoutQty * product.price).toFixed(2)  }} (MXN)
        f7-row.margin-top
          f7-col()
            f7-button(@click="setSelectedPrice('maintenance')") {{ $t("strings.with_maintenance") }}
          f7-col()
            f7-button(@click="setSelectedPrice('inagave')") {{ $t("strings.without_maintenance") }}

        f7-row.margin-top
          f7-col()
            strong {{ $t("strings.pay_with") }} :
        f7-row.margin-top
          f7-col()
            f7-button(
              fill
              color="yellow"
              style="color: black !important"
              @click="checkoutMercadoPago(product)"
            ) {{ $t("strings.mercadopago") }}
          f7-col()
            f7-button(
              fill
              color="blue"
              @click="checkoutPaypal(product)"
            ) {{ $t("strings.paypal") }}
        f7-row.margin-top.margin-bottom

</template>
<script>
import {useStore} from 'framework7-vue';
import store from '../js/store'
import moment from 'moment'
import {f7} from 'framework7-vue';

export default {
  setup() {
    return {};
  },
  data() {
    return {
      moment: null,
      modal: false,
      product: {
        price: 0,
        maintenance_price: 0,
      },
      selectedPrice: 'inagave',
      total: 0,
    }
  },
  computed: {},
  created: function () {
    this.moment = moment;
  },
  mounted() {
    //this.getProducts();
    this.$store.dispatch('getPrices');
  },
  methods: {
    onPageInit() {
      //this.getProducts();
      //this.getPrices();
    },
    onPullToRefresh(e, done) {
      //this.getProducts();
      //this.getPrices();
      e.detail();
    },
    getProductPriceByYear(planted_at) {
      return (this.$store.state.prices.find(({year}) => year === parseInt(planted_at.slice(0, 4)))).price;
    },
    setSelectedPrice(arg) {
      this.selectedPrice = arg;
    },
    checkoutPaypal(product) {
    },
    checkoutMercadoPago(product) {
      let t = this.$t;
      let vm = this;

      product.selectedPrice = this.selectedPrice;
      product.app_user = this.$store.state.user.id;

      if (parseInt(product.checkoutQty) > parseInt(product.quantity)) {
        f7.dialog.alert(t("strings.max_error"));
      } else {

        if (product.user.type_id !== 1) {
          product.price = this.getProductPriceByYear(product.planted_at);
        }

        this.$store.dispatch('setLoading', true);
        const response = this.axios.post(this.$store.state.api + 'checkout', product).then((response) => {
          /*const mp = new window["MercadoPago"](
              vm.$store.state.MP_TOKEN, {
                locale: 'es-MX'
              }
          );
          console.log(mp);
          mp.checkout({
            preference: {id: response.data.id},
            render: {container: '.mp-container' + product.id, label: this.$t('buttons.checkout'),},
            autoOpen: true,
          });*/
          vm.openBrowser(response.data.init_point);
        }).catch(function (error) {
          f7.dialog.alert(error);


        }).finally(function () {
          vm.$store.dispatch('setLoading', false);

        });

      }
    },
    openBrowser(url) {
      let options = "location=no,clearcache=yes,clearsessioncache=yes,zoom=yes,EnableViewPortScale=yes"
      let ref = cordova.InAppBrowser.open(url, '_system', options);
    },
  },
};
</script>
