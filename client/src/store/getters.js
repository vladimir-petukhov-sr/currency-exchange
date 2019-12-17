export default {
  getAllCurrencies: state => state.currencies,

  loading: state => state.loading,
  isNetworkError: state => state.networkError,

  isLatestQuoteAvailable: state => state.quote.amount && state.quote.exchangeRate && state.quote.currencyCode,

  getQuoteExchangeRate: state => state.quote.exchangeRate,
  getQuoteCurrencyCode: state => state.quote.currencyCode,
  getQuoteAmount: state => +(state.quote.amount / 100).toFixed(2)
};
