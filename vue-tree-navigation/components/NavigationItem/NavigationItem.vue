<template>
  <span
    class="NavigationItem"
    @click="handleClick"
    :class="classes">
    <span class="NavigationItem__label">{{ item.name }}</span>
  </span>
</template>

<script>
export default {
  mounted() {
  },
  props: {
    item: Object,
    required: true,
    level: Number,
    store: Object
  },
  data() {
    return {
      active: false,
    };
  },
  watch: {
    'store.states.activeItem': function (value) {
    }
  },

  computed: {
    classes() {
      return {
        'NavigationItem--active': this.isActive,
        [`NavigationItem--level-${this.level}`]: true,
      };
    },
    isActive() {
      return this.store.states.activeItem === this.item;
    }
  },

  methods: {
    handleClick() {
      this.store.commit('setActiveItem', this.item);
    }
  },
};
</script>