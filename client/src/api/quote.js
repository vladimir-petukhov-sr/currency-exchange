import BaseApi from './base';
import constants from '@/dependencies/constants';

export default class QuoteApi extends BaseApi {
  getLatestQuote({ fromCurrency, toCurrency, amount }) {
    return this.$axios.get(constants.API.ROUTES.QUOTE, {
      params: {
        from_currency_code: fromCurrency,
        to_currency_code: toCurrency,
        amount
      }
    });
  }
}
