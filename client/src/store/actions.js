import {
  SET_CURRENCIES_CLASSIFIER_MUTATION,
  SET_LATEST_QUOTE_MUTATION,
  SET_NETWORK_ERROR_MUTATION
} from '@/store/mutations';
import { SET_LOADING_MUTATION } from '@/store/mutations';

export const LOAD_CURRENCIES_CLASSIFIER_ACTION = 'LOAD_CURRENCIES_CLASSIFIER';

export const GET_LATEST_QUOTE_ACTION = 'GET_LATEST_QUOTE';

export default {
  async [LOAD_CURRENCIES_CLASSIFIER_ACTION]({ commit }) {
    try {
      commit(SET_LOADING_MUTATION, true);
      const {
        data: { currencies }
      } = await this._vm.$api.ClassifierApi.getCurrencies();
      commit(SET_CURRENCIES_CLASSIFIER_MUTATION, currencies);
    } catch (err) {
      commit(SET_NETWORK_ERROR_MUTATION);
      return Promise.reject(err);
    } finally {
      commit(SET_LOADING_MUTATION, false);
    }
    return Promise.resolve();
  },

  async [GET_LATEST_QUOTE_ACTION]({ commit }, { fromCurrency, toCurrency, amount }) {
    try {
      amount = /[.,]/gi.test(amount) ? +amount.replace(/[.,]/gi, '') : +(amount * 100);
      commit(SET_LOADING_MUTATION, true);
      const { data } = await this._vm.$api.QuoteApi.getLatestQuote({ fromCurrency, toCurrency, amount });
      commit(SET_LATEST_QUOTE_MUTATION, {
        exchangeRate: data.exchange_rate,
        currencyCode: data.currency_code,
        amount: data.amount
      });
    } catch (err) {
      commit(SET_NETWORK_ERROR_MUTATION);
      return Promise.reject(err);
    } finally {
      commit(SET_LOADING_MUTATION, false);
    }

    return Promise.resolve();
  }
};
