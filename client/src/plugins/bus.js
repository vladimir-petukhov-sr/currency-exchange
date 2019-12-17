import Vuew from 'vue';

const BusPlugin = {
  install(Vue) {
    Vue.prototype.$bus = new Vuew();
  }
};

export default BusPlugin;
