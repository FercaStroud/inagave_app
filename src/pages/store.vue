<template lang="pug">
f7-page(name="store")
  f7-navbar(title="Store")
  f7-block
    f7-card()
      f7-card-header.product-header(
        class="no-border"
        valign="bottom"
        style="background-image:url('https://via.placeholder.com/600')"
      ) Predio ABC
      f7-card-content
        p
          strong $ 48.36 /
          | Precio sin Mantenimieto
        p
          strong $ 48.36 /
          | Precio con Mantenimiento

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
  }
};
</script>
