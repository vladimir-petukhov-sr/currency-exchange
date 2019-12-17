import ClassifierApi from './classifier';
import QuoteApi from './quote';

export default class ApiService {
  constructor($axios) {
    this.ClassifierApi = new ClassifierApi($axios);
    this.QuoteApi = new QuoteApi($axios);
  }
}
