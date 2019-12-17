export const SET_CURRENCIES_CLASSIFIER_MUTATION = 'SET_CURRENCIES_CLASSIFIER';
export const SET_LOADING_MUTATION = 'SET_LOADING';
export const SET_LATEST_QUOTE_MUTATION = 'SET_LATEST_QUOTE';
export const SET_NETWORK_ERROR_MUTATION = 'SET_NETWORK_ERROR';

export default {
  [SET_CURRENCIES_CLASSIFIER_MUTATION](state, currencies) {
    state.currencies = currencies;
  },

  [SET_LOADING_MUTATION](state, loading = false) {
    state.loading = loading;
  },

  [SET_LATEST_QUOTE_MUTATION](state, { exchangeRate, currencyCode, amount }) {
    state.quote.exchangeRate = exchangeRate;
    state.quote.currencyCode = currencyCode;
    state.quote.amount = amount;
  },

  [SET_NETWORK_ERROR_MUTATION](state, isError = true) {
    state.networkError = isError;
  }
};
