import TreeNavigation from './src/index.vue';

module.exports = {
  install: function(Vue, options) {
    Vue.component('icon', TreeNavigation);
  },
};
