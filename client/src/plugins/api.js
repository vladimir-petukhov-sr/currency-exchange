import ApiService from '@/api';
import axios from 'axios';

const ApiPlugin = {
  install(Vue, { baseURL }) {
    Vue.prototype.$api = new ApiService({
      $axios: axios.create({ baseURL })
    });
  }
};

export default ApiPlugin;
