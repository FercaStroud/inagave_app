<template lang="pug">
f7-page(name="store")
  f7-navbar()
    f7-nav-left
    f7-nav-title()
      img(src="../assets/images/logo.svg" alt="Logo INAGAVE" style="height:32px")
    f7-nav-right

  f7-popup(:opened="modal")
    f7-page
      f7-navbar()
        f7-nav-left
        f7-nav-title
        f7-nav-right
          f7-link(@click="modal = false") Close
      f7-subnavbar
        f7-button {{ $t("buttons.with_maintenance") }} $12.30
          small(style="font-size:.4em; position:absolute;margin-top:24px") {{ $t("strings.with_maintenance") }}
        f7-button {{ $t("buttons.without_maintenance") }} $89.20
          small(style="font-size:.4em; position:absolute;margin-top:24px") {{ $t("strings.without_maintenance") }}

      f7-block

      f7-block
        f7-block-title
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
      f7-block
        f7-block-title
          strong {{ $t("strings.description") }}
        p.text-align-justify Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate distinctio hic nostrum repudiandae?
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate distinctio hic nostrum repudiandae?
          | Debitis dolores ex, expedita facere id laboriosam magni maxime minus odio placeat porro quaerat quasi ut!
        p.text-align-justify Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate distinctio hic nostrum repudiandae?
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate distinctio hic nostrum repudiandae?
          | Debitis dolores ex, expedita facere id laboriosam magni maxime minus odio placeat porro quaerat quasi ut!
  f7-block
      f7-card(@click="showDetails")
        f7-card-header.product-header(
          class="no-border"
          valign="bottom"
          style="background-image:url('https://via.placeholder.com/600')"
        ) Predio ABC
        f7-card-content
          f7-button {{ $t("buttons.with_maintenance") }} $12.30
            small(style="font-size:.4em; position:absolute;margin-top:24px") {{ $t("strings.with_maintenance") }}
          f7-button {{ $t("buttons.without_maintenance") }} $89.20
            small(style="font-size:.4em; position:absolute;margin-top:24px") {{ $t("strings.without_maintenance") }}


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
    showDetails(){
      this.modal = true;
    }
  },
};
</script>
