import TreeNavigation from './components/TreeNavigation/TreeNavigation.vue';

module.exports = {
  install: function(Vue, options) {
    Vue.component('vue-tree-navigation', TreeNavigation);
  },
};
