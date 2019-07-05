import slideUpDown from './slide-up-down';

export default {
  install(Vue, options = {}) {
    Vue.component('custom-slide-up-down', slideUpDown);
  },
};