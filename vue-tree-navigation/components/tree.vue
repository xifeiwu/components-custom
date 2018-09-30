<style lang="scss">
  .TreeNavigation {
    display: inline-block;
    padding: 0;
    margin:  0;
  }
  .collapse-transition {
    transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
  }
  .horizontal-collapse-transition {
    transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out;
  }
</style>
<script type="text/babel">
  import { insertMetadataToItems } from './utils';
//  import NavigationItem from './NavigationItem.vue';
//  import NavigationLevel from './NavigationLevel.vue';
  import TreeNode from './tree-node.vue';

  import Store from './store';

  const TreeNavigation = {
    created() {
      this.store = new Store(this);
//      console.log(this.store);
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
        this.generateLevel(
          createElement,
          // self.items,
          self.itemsWithMetadata,
          level,
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

    methods: {
      /**
       * Recursive function.
       * One call generates one level of the tree.
       */
      generateLevel (
        createElement,
        items,
        level,
        store
      ) {
        const children = [];
        items.forEach(item => {
          if (item.hasOwnProperty('children')) {
            const navLevel = createElement(
              TreeNode,
              {
                props: {
                  item,
                  level,
                  store
                },
              },
              [
                ...this.generateLevel(
                  createElement,
                  item.children,
                  level + 1,
                  store
                ),
              ]
            );
            children.push(createElement('li', [navLevel]));
          } else {
            const navItem = createElement(TreeNode, {
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
      }
    }
  };

  export default TreeNavigation;
</script>