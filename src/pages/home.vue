<template lang="pug">
f7-page(name="home")
  f7-navbar.navbar-bg-white
    f7-nav-left
    f7-nav-title(sliding)
      img(src="../assets/images/logo.svg" alt="Logo INAGAVE" style="height:32px")
    f7-nav-right
      f7-link(icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right")

  f7-block
    f7-block-header {{$t("strings.total_plants")}}
    f7-card
      f7-card-header
        strong(style="color:#3A7C8D") 3,000

  f7-block
    f7-block-header {{$t("strings.total_founds")}}
    f7-card
      f7-card-header
        strong(style="color:#3A7C8D") $1,000.00 (MXN)

  f7-block
    f7-block-header {{$t("strings.total_investment")}}
    f7-card
      f7-card-header
        strong(style="color:#3A7C8D") $1,000.00 (MXN)


  f7-block
    f7-block-header {{$t("strings.agave_prices")}}
    LineChart(:chartData="chartData")


</template>
<script>
import { useStore } from 'framework7-vue';
import store from '../js/store'
import {LineChart} from "vue-chart-3";

export default {
  components: {LineChart},
  setup() {
    const chartData = {
      labels: ['2020', '2021', '2022', '2022', '2023'],
      datasets: [
        {
          label: ' ',
          data: [30, 40, 60, 70, 105],
          backgroundColor: ['#3A7C8D'],
        },
      ],

    };

    return { chartData };
  },
  data() {
    return {
      registerModal: false,
    };
  }
};
</script>
