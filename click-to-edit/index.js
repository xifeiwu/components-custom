import input from './src/input.vue';

module.exports = {
  install: function(Vue, options) {
    Vue.component('click-to-edit-input', input);
  },
};
