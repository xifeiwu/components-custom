// import slideUpDown from './slide-up-down.vue';
import slideUpDown from './slide-up-down.js';

export default {
  install(Vue, options = {}) {
    Vue.component('custom-slide-up-down', slideUpDown);
  },
};