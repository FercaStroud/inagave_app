<template lang="pug">
f7-page(name="home" :page-content="false" @page:init="onPageInit")
  f7-navbar.navbar-bg-white
    f7-nav-left
    f7-nav-title(sliding)
      img(src="../assets/images/logo.svg" alt="Logo INAGAVE" style="height:32px")
    f7-nav-right
      f7-link(icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right")

  f7-tabs
    f7-tab(
      class="page-content ptr-content tab-active"
      @ptr:refresh.native="onPullToRefresh"

    )
      .ptr-preloader
        .preloader
        .ptr-arrow

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

      f7-block(v-if="!$store.state.isLoading")
        f7-block-header {{$t("strings.total_plants_m_inagave")}}
        f7-card
          f7-card-header
            strong(style="color:#3A7C8D") {{$store.state.stats.total_plants_m_inagave}} {{$t("strings.plants")}}


      f7-block(v-if="!$store.state.isLoading")
        f7-block-header {{$t("strings.total_plants_m_total")}}
        f7-card
          f7-card-header
            strong(style="color:#3A7C8D") {{$store.state.stats.total_plants_m_total}} {{$t("strings.plants")}}

      f7-block(v-if="!$store.state.isLoading")
        f7-block-header {{$t("strings.total_plants")}}
        f7-card
          f7-card-header
            strong(style="color:#3A7C8D") {{$store.state.stats.total_plants}} {{$t("strings.plants")}}

      f7-block(v-if="!$store.state.isLoading")
        f7-block-header {{$t("strings.total_founds")}}
        f7-card
          f7-card-header
            strong(style="color:#3A7C8D") ${{ parseFloat($store.state.stats.total_user_founds).toFixed(2) }} (MXN)

      f7-block(v-if="!$store.state.isLoading")
        f7-block-header {{$t("strings.total_investment")}}
        f7-card
          f7-card-header
            strong(style="color:#3A7C8D") ${{ parseFloat($store.state.stats.total_plant_founds).toFixed(2) }} (MXN)

      f7-block(v-if="!$store.state.isLoading && prices.length !== 0")
        f7-block-header {{$t("strings.agave_prices")}}
        LineChart(:chartData="{labels: yearsArray, datasets: [{label: ' ', data: pricesArray, backgroundColor: ['#3A7C8D'],},],}")
</template>
<script>
import {f7, useStore} from 'framework7-vue';
import store from '../js/store'
import {LineChart} from "vue-chart-3";

export default {
  components: {LineChart},
  setup() {
  },
  data() {
    return {
      registerModal: false,
      prices:[],
      pricesArray:[],
      yearsArray:[],

    };
  },
  mounted() {
    this.$store.dispatch('getUserStats');
  },
  methods: {
    onPageInit() {
      this.$store.dispatch('getUserStats');
      this.getAgavePrices();
    },
    onPullToRefresh(e, done) {
      this.$store.dispatch('getUserStats');

      e.detail();
    },
    getAgavePrices() {
      let vm = this;
      let t = this.$t;
      this.isLoading = true;
      this.axios.get(this.$store.state.api + 'get/agave/prices').then((response) => {
        vm.prices = response.data;
        vm.prices.forEach(price => vm.pricesArray.push(price.price));
        vm.prices.forEach(price => vm.yearsArray.push(price.year));

      }).catch(function (error) {
        console.log(error)

      }).finally(function () {
        vm.isLoading = false;

      });
    },
  },
};
</script>
