<template>
  <span
    class="NavigationToggle" :class="{ 'NavigationToggle--closed': !this.open }">
    <span class="arrow"></span>
  </span>
</template>

<style lang="scss">
  .NavigationToggle {
    width: 14px;
    position: relative;
    .arrow {
      position: absolute;
      top: 50%;
      transform: translate(0%, -50%) rotate(45deg);
      cursor: pointer;
      display:      inline-block;
      padding:      3px;
      border:       solid #000;
      border-width: 0 2px 2px 0;
    }
    &--closed {
      .arrow {
        transform: translate(0%, -50%) rotate(-45deg);
      }
    }
  }
</style>
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
