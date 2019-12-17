<template>
  <v-app id="inspire">
    <v-dialog v-model="isNetworkError" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Ooops!</v-card-title>
        <v-card-text>
          We've got some problem. Please, try to refresh page.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="refreshPage">Refresh</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <Exchanger />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <Quote
              v-if="isLatestQuoteAvailable"
              :exchange-rate="exchangeRate"
              :currency-code="currencyCode"
              :amount="amount"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; {{ year }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import Exchanger from '@/components/Exchanger';
import { LOAD_CURRENCIES_CLASSIFIER_ACTION } from '@/store/actions';
import Quote from '@/components/Quote';

export default {
  name: 'App',
  components: { Quote, Exchanger },
  async created() {
    this.$vuetify.theme.dark = true;
    await this.$store.dispatch(LOAD_CURRENCIES_CLASSIFIER_ACTION);
  },
  computed: {
    ...mapGetters(['isLatestQuoteAvailable', 'isNetworkError']),
    ...mapGetters({
      exchangeRate: 'getQuoteExchangeRate',
      currencyCode: 'getQuoteCurrencyCode',
      amount: 'getQuoteAmount'
    }),
    year: () => new Date().getFullYear()
  },
  methods: {
    refreshPage() {
      window.location.reload();
    }
  }
};
</script>
