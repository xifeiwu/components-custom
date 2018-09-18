import Vue from 'vue';

const Store = function (navTree) {
  this.narTree = navTree;
  // this.states = {
  // };
  // Vue.prototype.$set(this.states, 'activeItem', '');
  const vm = new Vue({
    data: {
      states: {
        activeItem: null
      }
    },
    template: '<div>{{ message }}</div>'
  });
  this.states = vm.states;
};

Store.prototype.mutations = {
  setActiveItem(states, item) {
    // states.activeItem = item;
    Vue.set(states, 'activeItem', item);
  }
};

Store.prototype.commit = function(name, ...args) {
  const mutations = this.mutations;
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error(`Action not found: ${name}`);
  }
};

export default Store;
