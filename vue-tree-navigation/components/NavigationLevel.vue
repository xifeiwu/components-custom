<template>
  <div 
    class="NavigationLevel"
    :class="classes">
    <div class="NavigationLevel__parent">
      <NavigationToggle
        :open="isOpen"
        @click.native="onToggleClick" />
      <NavigationItem
        :item="parentItem"
        :level="level"
        :store="store"
        @click.native="onItemClick" />
    </div>

    <ul class="NavigationLevel__children">
      <slot></slot>
    </ul>
  </div>
</template>

<style lang="scss">
  .NavigationItem {
    font-size: 14px;
    margin-left: 14px;
    line-height: 1.5;
    display: inline-block;
    &--active {
      background-color: #409EFF;
      color: white;
    }

    //overflow: hidden;
    text-overflow: ellipsis;
    span {
      cursor: pointer;
    }
    &--level-1 {
      font-size: 18px;
    }
    &--level-2 {
      font-size: 16px;
    }
    &--level-3 {
      font-size: 14px;
    }
    &--level-4 {
      font-size: 14px;
    }
    &--level-5 {
    }
  }

  .NavigationLevel {
    ul {
      padding: 0px 0px 0px 16px;
      margin: 0;
      list-style-type: none;
    }

    li {
    }

    &--closed {
      ul {
        display: none;
      }
    }

    .NavigationLevel__parent {
      display: flex;
      .NavigationToggle {
      }
      .NavigationItem {
        flex: 1;
        margin-left: 0px;
      }
    }
    .NavigationLevel__children {
      margin-left: 14px;
      .NavigationItem {
        //margin-left: 0px;
      }
    }
  }

</style>
<script>
  import NavigationToggle from './NavigationToggle.vue';
  import NavigationItem from './NavigationItem.vue';

export default {
  data() {
    return {
      isOpen: null,
    };
  },
  props: {
    parentItem: {
      type: Object,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    defaultOpenLevel: {
      type: Number,
      required: true,
    },
    store: {
      type: Object
    }
  },
  computed: {
    classes() {
      return {
        'NavigationLevel--closed': !this.isOpen,
        [`NavigationLevel--level-${this.level}`]: true,
      };
    },
  },
  methods: {
    onToggleClick() {
      this.isOpen = !this.isOpen;
    },
    onItemClick() {
      if (this.isOpen === false) {
        this.isOpen = true;
      }
    },
    renderLevelAsOpen() {
      return true;
//      if (this.defaultOpenLevel >= this.level) {
//        return true;
//      }
//
//      let currentUrl;
//      if (this.$router !== undefined) {
//        currentUrl = this.$route.path + this.$route.hash;
//      } else {
//        currentUrl = window.location.pathname + window.location.hash;
//      }
//
//      if (
//        this.parentItem.meta.target !== '' &&
//        currentUrl.includes(this.parentItem.meta.target)
//      ) {
//        return true;
//      }
//
//      for (let i = 0; i < this.parentItem.children.length; i++) {
//        let child = this.parentItem.children[i];
//
//        if (
//          child.meta.target !== '' &&
//          currentUrl.includes(child.meta.target)
//        ) {
//          return true;
//        }
//      }
//
//      return false;
    },
  },
  components: {
    NavigationItem,
    NavigationToggle,
  },
  mounted() {
    this.isOpen = this.renderLevelAsOpen();
  },
};
</script>

