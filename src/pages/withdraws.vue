<template lang="pug">
f7-popup(class="withdraws-popup" swipe-to-close)
  f7-page(name="withdraws")
    f7-navbar.navbar-bg-white()
      f7-nav-left
      f7-nav-title()
        span  {{ $t("pages.withdraws") }}
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

    f7-card(
      v-if="!$store.state.isLoading"
    )
      f7-card-header {{$t("strings.total_founds")}}
      f7-card-content
        h1.text-align-center $ {{ parseFloat($store.state.stats.total_user_founds).toFixed(2) }} (MXN)
      f7-card-footer
        f7-block.width-100()
          f7-list
            f7-list-input(type='number' min="0" step="0.01" :max="$store.state.stats.total_user_founds" v-model:value="form.amount" :placeholder='$t("strings.amount")')
            f7-list-input(type='text' v-model:value="form.bank" :placeholder='$t("strings.bank")')
            f7-list-input(type='text' v-model:value="form.account" :placeholder='$t("strings.account")')
            f7-list-button.bg-color-yellow.color-black(@click="requestMoney") {{ $t('buttons.request') }}

    f7-block-title(
      v-if="!$store.state.isLoading"
    ) {{ $t("strings.my_wallet_transactions") }}
    f7-list(
      accordion-list
      inset
      v-if="!$store.state.isLoading"
    )
      f7-list-item(
        v-for="(data, key) in $store.state.wallet"
        :key="key"

        :class="data.type"
        accordion-item
        :title="moment(data.created_at).format('DD MMM YYYY') + ' / $ ' + data.amount + ' (MXN)'"
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
                strong {{ $t("strings.amount") }}
              f7-col
                span $ {{ parseFloat(data.amount).toFixed(2) }} (MXN)
            f7-row
              f7-col
                strong {{ $t("strings.status") }}
              f7-col
                span {{ data.status }}
            f7-row
              f7-col
                strong {{ $t("strings.bank") }}
              f7-col
                span {{ data.bank }}
            f7-row
              f7-col
                strong {{ $t("strings.account") }}
              f7-col
                span {{ data.account }}
            f7-row.margin-top.padding-bottom
              f7-col
                f7-list(
                  accordion-list
                )
                  f7-list-item(
                    v-for="(transaction, index) in data.transactions"
                    :key="index"
                    accordion-item
                    :title="moment(transaction.created_at).format('DD MMM YYYY') + ' / $ ' + transaction.amount + ' (MXN)'"
                  )
                    f7-accordion-content
                      f7-block
                        f7-row
                          f7-col
                            strong {{ $t("strings.amount") }}
                          f7-col
                            span $ {{ parseFloat(transaction.amount).toFixed(2) }} (MXN)
                        f7-row
                          f7-col
                            strong {{$t("strings.status") }}
                          f7-col
                            span {{ transaction.status }}
                        f7-row
                          f7-col
                            strong {{ $t("strings.bank") }}
                          f7-col
                            span {{ transaction.bank }}
                        f7-row
                          f7-col
                            strong {{ $t("strings.account") }}
                          f7-col
                            span {{ transaction.account }}

</template>
<script>
import moment from 'moment'
import {f7} from 'framework7-vue';

export default {
  setup() {
    return {};
  },
  data() {
    return {
      form: {
        account: '',
        bank: '',
        amount: '',
      },
      moment: null,
    }
  },
  created: function () {
    this.moment = moment;
  },
  methods: {
    requestMoney() {
      let vm = this;
      let t = this.$t;

      if (
          this.form.bank !== '' &&
          this.form.account !== '' &&
          parseFloat(this.form.amount) > 0 &&
          parseFloat(this.$store.state.stats.total_user_founds) >= parseFloat(this.form.amount)
      ) {
        this.$store.dispatch('setLoading', true);
        this.axios.post(this.$store.state.api + 'request/withdraw', {
          app_user: this.$store.state.user.id,
          amount: this.form.amount,
          bank: this.form.bank,
          account: this.form.account,
        }).then((response) => {
          f7.dialog.alert(t("strings.request_received"));

        }).catch(function (error) {
          console.log(error)

        }).finally(function () {
          //vm.$store.dispatch('setLoading', true);
          vm.$store.dispatch('getUserWallet');
          vm.$store.dispatch('getUserStats');
        });
      } else {
        f7.dialog.alert(t("strings.please_check_required_fields"));
      }
    },
  },
};
</script>

<style scoped>
.DEPOSIT {
  color: black !important;
  background: rgba(76, 217, 100, 0.3);
}

.PENDING {
  background: rgba(255, 276, 276, .8);
}

.WITHDRAW {
  background: rgba(255, 276, 0, .3);
}
</style>
