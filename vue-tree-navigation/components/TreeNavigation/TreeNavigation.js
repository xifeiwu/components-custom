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
  defaultOpenLevel
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
          },
        },
        [
          ...generateLevel(
            createElement,
            item.children,
            level + 1,
            defaultOpenLevel
          ),
        ]
      );
      children.push(createElement('li', [navLevel]));
    } else {
      const navItem = createElement(NavigationItem, {
        props: {
          item,
          level
        },
      });
      children.push(createElement('li', [navItem]));
    }
  });

  return children;
};

import './TreeNavigation.scss';

const TreeNavigation = {
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
        self.itemsWithMetadata,
        level,
        self.defaultOpenLevel
      )
    );

    // const level0 = createElement(
    //   'div',
    //   {
    //     class: ['NavigationLevel', 'NavigationLevel--level-0'],
    //   },
    //   [tree]
    // );

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
