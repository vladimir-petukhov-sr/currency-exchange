export default Object.freeze({
  API_URL: process.env.VUE_APP_API_URL || 'http://localhost:3000/api',
  API: {
    ROUTES: {
      QUOTE: '/quote',
      CLASSIFIERS: {
        CURRENCIES: '/classifier/currencies'
      }
    }
  }
});
