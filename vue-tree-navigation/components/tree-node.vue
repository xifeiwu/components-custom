<template>
  <div :class="{'tree-node': true}">
    <div :class="{'tree-node__content': true, [`level-${this.level}`]: true, 'is-leaf': isLeaf, 'active': isActive}">
      <div class="tree-node__expand-icon" :class="{'tree-node__expand-icon__closed': !this.isOpen }"
            @click="onToggleClick">
        <span class="arrow"></span>
      </div>
      <div class="tree-node__label" @click="handleClick">{{item.name}}</div>
    </div>
    <collapse-transition v-if="!isLeaf">
      <ul :class="{'tree-node__children': true, 'is-expand': this.isOpen}" v-if="this.isOpen">
        <slot></slot>
      </ul>
    </collapse-transition>
  </div>
</template>

<style lang="scss">
  .tree-node {
    font-size: 14px;
    text-overflow: ellipsis;

    .tree-node__content {
      border-left: 5px solid transparent;
      &.level-1 {
        font-size: 18px;
        padding-left: 0px;
      }
      &.level-2 {
        font-size: 16px;
        padding-left: 15px;
      }
      &.level-3 {
        font-size: 14px;
        padding-left: 30px;
      }
      &.level-4 {
        font-size: 14px;
        padding-left: 45px;
      }
      &.level-5 {
        font-size: 14px;
        padding-left: 60px;
      }
      line-height: 1.5;

      &.active {
        /*background-color: #409EFF;*/
        /*color: white;*/
        border-left-color: #409EFF;
      }

      &.is-leaf {
        .tree-node__expand-icon {
          visibility: hidden;
        }
      }

      display: flex;
      .tree-node__expand-icon {
        /*width: 15px;*/
        position: relative;
        cursor: pointer;
        padding: 2px 5px;
        .arrow {
          /*position: absolute;*/
          /*top: 50%;*/
          transform: translate(0%, -50%) rotate(45deg);
          display:      inline-block;
          padding:      3px;
          border:       solid #42b883;
          border-width: 0 2px 2px 0;
        }
        &__closed {
          .arrow {
            transform: translate(0%, -50%) rotate(-45deg);
          }
        }
      }
    }

    .tree-node__children {
      display: none;
      /*&.is-expand {*/
        display: block;
      /*}*/
    }
  }
</style>
<script>
  import NavigationToggle from './NavigationToggle.vue';
  import NavigationItem from './NavigationItem.vue';
  import CollapseTransition from './collapse-transition';

  export default {
    components: {
      CollapseTransition,
      NavigationItem,
      NavigationToggle,
    },
    data() {
      return {
        isOpen: null,
      };
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      level: {
        type: Number,
        required: true,
      },
      store: {
        type: Object
      }
    },
    computed: {
      isLeaf() {
        return !this.item.hasOwnProperty('children');
      },
      isActive() {
        return this.store.states.activeItem === this.item;
      }
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
      handleClick() {
        this.store.commit('setActiveItem', this.item);
      }
    },
    mounted() {
//      this.isOpen = this.renderLevelAsOpen();
    },
  };
</script>

