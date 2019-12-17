import Vue from 'vue';

import App from '@/App.vue';
import '@/vee-validate';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import ConstantsPlugin from '@/plugins/constants';
import BusPlugin from '@/plugins/bus';
import ApiPlugin from '@/plugins/api';
import constants from '@/dependencies/constants';

Vue.config.productionTip = false;

Vue.use(ConstantsPlugin);
Vue.use(BusPlugin);
Vue.use(ApiPlugin, {
  baseURL: constants.API_URL
});

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
