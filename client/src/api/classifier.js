import BaseApi from './base';
import constants from '@/dependencies/constants';

export default class ClassifierApi extends BaseApi {
  getCurrencies() {
    return this.$axios.get(constants.API.ROUTES.CLASSIFIERS.CURRENCIES);
  }
}
