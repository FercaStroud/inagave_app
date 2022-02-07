<template lang="pug">
f7-page(name="store")
  f7-navbar.navbar-bg-white()
    f7-nav-left
    f7-nav-title()
      img(src="../assets/images/logo.svg" alt="Logo INAGAVE" style="height:32px")
    f7-nav-right
      f7-link(icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right")

  f7-card(expandable swipe-to-close)
    f7-card-content(:padding='false')
      .bg-color-primary(:style="{height: '300px'}")
        f7-card-header.display-block(text-color='white') Predio ABC
          p
            small(:style='{opacity: 0.7}') {{ $t("strings.with_maintenance") }}
            br
            strong $23.00 (MXN)

            br
            br
            small(:style='{opacity: 0.7}') {{ $t("strings.without_maintenance") }}
            br
            strong $23.00 (MXN)
        f7-link.card-opened-fade-in(card-close='' color='black' :style="{position: 'absolute', right: '15px', top: '15px'}" icon-f7='xmark_circle_fill')
      .card-content-padding
        f7-row
          f7-col
            img.width-100(src="https://via.placeholder.com/500" alt="")
          f7-col
            img.width-100(src="https://via.placeholder.com/500" alt="")
          f7-col
            img.width-100(src="https://via.placeholder.com/500" alt="")
        f7-row
          f7-col
            p
              strong {{ $t("strings.details") }}
        f7-row
          f7-col
            strong Municipality:
          f7-col
            span Dolores
        f7-row
          f7-col
            strong Estate Size:
          f7-col
            span 6 Acre(s)
        f7-row
          f7-col
            strong Plant Age:
          f7-col
            span  1 Year(s)
        f7-row
          f7-col
            strong Quantity:
          f7-col
            span  26 Units
        f7-row
          f7-col
            strong Planted At:
          f7-col
            span  23, March 2027
        f7-row
          f7-col
            strong Jimado At:
          f7-col
            span  23, March 2027
        f7-row
          f7-col
            f7-link(@click="openBrowser('https://www.google.com/maps/search/25.5069888,-103.3932446' )") {{ $t("buttons.show_in_maps") }}
        f7-row
          f7-col
            p
              strong {{ $t("strings.description") }}

        f7-row
          f7-col
            p.text-align-justify Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate distinctio hic nostrum repudiandae?
              | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate distinctio hic nostrum repudiandae?
              | Debitis dolores ex, expedita facere id laboriosam magni maxime minus odio placeat porro quaerat quasi ut!
            p.text-align-justify Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate distinctio hic nostrum repudiandae?
              | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate distinctio hic nostrum repudiandae?
            | Debitis dolores ex, expedita facere id laboriosam magni maxime minus odio placeat porro quaerat quasi ut!
</template>
<script>
import {useStore} from 'framework7-vue';
import store from '../js/store'

export default {
  setup() {
    const products = useStore('products');

    const addProduct = () => {
      store.dispatch('addProduct', {
        id: '4',
        title: 'Apple iPhone 12',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
      });
    }

    return {
      products,
      addProduct,
    };
  },
  data() {
    return {
      modal: false
    }
  },
  methods: {
    openBrowser(url) {
      let options = "location=no,clearcache=yes,clearsessioncache=yes,zoom=yes,EnableViewPortScale=yes"
      let ref = cordova.InAppBrowser.open(url, '_system', options);
    },
  },
};
</script>
