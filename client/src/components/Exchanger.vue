<template>
  <ValidationObserver ref="form">
    <v-card class="elevation-12" :loading="loading">
      <v-toolbar color="indigo" dark flat>
        <v-toolbar-title>Currency Exchange</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-row align="center" justify="center">
            <v-col cols="5">
              <ValidationProvider name="fromCurrency" :rules="`required|${oneOfCurrenciesRule}`" v-slot="{ errors }">
                <v-select
                  @change="getLatestQuotes"
                  :disabled="loading"
                  :items="currencies"
                  v-model="fields.fromCurrency"
                  :error-messages="errors"
                  required
                  label="Base currency"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="2" md="auto">
              <v-btn text icon @click="flipCurrencies">
                <v-icon large color="primary">mdi-arrow-left-right</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="5">
              <ValidationProvider name="toCurrency" :rules="`required|${oneOfCurrenciesRule}`" v-slot="{ errors }">
                <v-select
                  @change="getLatestQuotes"
                  :disabled="loading"
                  :items="currencies"
                  v-model="fields.toCurrency"
                  :error-messages="errors"
                  required
                  label="Quote currency"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="6">
              <ValidationProvider
                name="amount"
                :rules="{
                  regex: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9][0-9])?$/,
                  required: true,
                  min_value: 1,
                  max_value: 1000000000
                }"
                v-slot="{ errors }"
              >
                <v-text-field
                  @change="getLatestQuotes"
                  :disabled="loading"
                  label="Base amount"
                  v-model="fields.amount"
                  required
                  :error-messages="errors"
                  clearable
                  :suffix="fields.fromCurrency"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapGetters } from 'vuex';
import { GET_LATEST_QUOTE_ACTION } from '@/store/actions';

export default {
  name: 'Exchanger',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mounted() {
    this.$watch(
      () => {
        return this.$refs.form.flags.valid;
      },
      async valid => {
        this.valid = valid;
      },
      {
        immediate: true
      }
    );
  },
  data: () => ({
    fields: {
      fromCurrency: null,
      toCurrency: null,
      amount: null
    },
    valid: false
  }),
  computed: {
    ...mapGetters({
      currencies: 'getAllCurrencies'
    }),
    ...mapGetters(['loading']),
    oneOfCurrenciesRule() {
      return `oneOf:${(this.currencies || []).join(',')}`;
    }
  },
  methods: {
    async flipCurrencies() {
      [this.fields.fromCurrency, this.fields.toCurrency] = [this.fields.toCurrency, this.fields.fromCurrency];
      await this.getLatestQuotes();
    },
    async getLatestQuotes() {
      // Dirty-dirty hack, which occurs due to incorrect behavior of v-select change event
      setTimeout(async () => {
        if (this.valid) {
          await this.$store.dispatch(GET_LATEST_QUOTE_ACTION, this.fields);
        }
      }, 40);
    }
  }
};
</script>
