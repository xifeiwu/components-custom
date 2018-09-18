<script  type="text/babel">
import { insertMetadataToItems } from './core';


import NavigationItem from '../NavigationItem/NavigationItem.vue';
import NavigationLevel from '../NavigationLevel/NavigationLevel.vue';

/**
 * Recursive function.
 * One call generates one level of the tree.
 */
export const generateLevel = (
  createElement,
  items,
  level,
  defaultOpenLevel,
  store
) => {
  const children = [];

  items.forEach(item => {
    if (item.hasOwnProperty('children')) {
      const navLevel = createElement(
        NavigationLevel,
        {
          props: {
            parentItem: item,
            level,
            defaultOpenLevel,
            store
          },
        },
        [
          ...generateLevel(
            createElement,
            item.children,
            level + 1,
            defaultOpenLevel,
            store
          ),
        ]
      );
      children.push(createElement('li', [navLevel]));
    } else {
      const navItem = createElement(NavigationItem, {
        props: {
          item,
          level,
          store
        },
      });
      children.push(createElement('li', [navItem]));
    }
  });

  return children;
};

import './TreeNavigation.scss';
import Store from '../../store';

const TreeNavigation = {
  created() {
    this.store = new Store(this);
    console.log(this.store);
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    defaultOpenLevel: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    'store.states.activeItem': function (value) {
      console.log(value);
    }
  },

  computed: {
    itemsWithMetadata() {
      const self = this;
      const items = JSON.parse(JSON.stringify(self.items));
      return insertMetadataToItems(items);
    },
  },

  render(createElement) {
    // console.log(this.itemsWithMetadata);
    const self = this;

    const level = 1;
    const tree = createElement(
      'ul',
      generateLevel(
        createElement,
        // self.items,
        self.itemsWithMetadata,
        level,
        self.defaultOpenLevel,
        this.store
      )
    );

    const treeNavigation = createElement(
      'div',
      {
        class: 'TreeNavigation',
      },
      [tree]
    );

    return treeNavigation;
  },
};

export default TreeNavigation;
</script>