<template>
  <span
    class="NavigationToggle" :class="{ 'NavigationToggle--closed': !this.open }">
  </span>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
