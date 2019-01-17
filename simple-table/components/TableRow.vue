<template>
  <tr @click="handleRowEvent('click', $event)"
      @mouseenter="handleRowEvent('mouse-enter', $event)"
      @mouseleave="handleRowEvent('mouse-leave', $event)">
    <table-cell v-for="column in visibleColumns" :row="row" :column="column" :key="column.id"></table-cell>
  </tr>
</template>
<script>
import TableCell from './TableCell';

export default {
  props: ['columns', 'row', 'index'],

  components: {
    TableCell,
  },

  computed: {
    visibleColumns() {
      return this.columns.filter(column => !column.hidden);
    },
  },
  methods: {
    handleRowEvent(action, $event, row, index) {
      this.$emit('row-event', action, $event, this.row, this.index);
    }
  }
};
</script>