import constants from '@/dependencies/constants';

const ConstantsPlugin = {
  install(Vue) {
    Vue.prototype.$constants = constants;
  }
};

export default ConstantsPlugin;
