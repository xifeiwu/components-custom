import TreeNavigation from './components/tree.vue';

module.exports = {
  install: function(Vue, options) {
    Vue.component('vue-tree-navigation', TreeNavigation);
  },
};
