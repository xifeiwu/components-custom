<template>
  <div class="table-component">
    <div v-if="showFilter && filterableColumnExists" class="table-component__filter">
      <input :class="fullFilterInputClass" type="text" v-model="filter" :placeholder="filterPlaceholder">
      <a
        v-if="filter"
        @click="filter = ''"
        class="table-component__filter__clear">×</a>
    </div>
    <div class="table-component__table-wrapper">
      <table :class="fullTableClass">
        <caption v-if="showCaption" class="table-component__table__caption" role="alert" aria-live="polite">
          {{ ariaCaption }}
        </caption>
        <thead :class="fullTableHeadClass">
          <tr>
            <table-column-header @click="changeSorting" v-for="column in columns" :key="column.show" :sort="sort" :column="column"></table-column-header>
          </tr>
        </thead>
        <tbody :class="fullTableBodyClass">
          <table-row v-for="(row, index) in displayedRows" :key="row.index" :row="row" :columns="columns" :index="index" @row-event="handleRowEvent" :class="{'is-hover': hoverIndex === index, 'is-active': activeIndex === index}"></table-row>
        </tbody>
        <tfoot>
          <slot name="tfoot" :rows="rows"></slot>
        </tfoot>
      </table>
    </div>
    <div v-if="displayedRows.length === 0" class="table-component__message">
      {{ filterNoResults }}
    </div>
    <div style="display:none;">
      <slot></slot>
    </div>
    <pagination v-if="pagination" :pagination="pagination" @pageChange="pageChange"></pagination>
  </div>
</template>
<script>
import Column from '../classes/Column';
import Row from '../classes/Row';
import TableColumnHeader from './TableColumnHeader';
import TableRow from './TableRow';
import settings from '../settings';
import Pagination from './Pagination';
import {
  classList,
  pick
} from '../helpers';

export default {
  components: {
    TableColumnHeader,
    TableRow,
    Pagination,
  },

  props: {
    activeIndex: {
      default: null
    },
    data: {
      default: () => [],
      type: [Array, Function]
    },

    showFilter: {
      default: true
    },
    showCaption: {
      default: true
    },

    sortBy: {
      default: '',
      type: String
    },
    sortOrder: {
      default: '',
      type: String
    },

    cacheKey: {
      default: null
    },
    cacheLifetime: {
      default: 5
    },

    tableClass: {
      default: () => settings.tableClass
    },
    theadClass: {
      default: () => settings.theadClass
    },
    tbodyClass: {
      default: () => settings.tbodyClass
    },
    filterInputClass: {
      default: () => settings.filterInputClass
    },
    filterPlaceholder: {
      default: () => settings.filterPlaceholder
    },
    filterNoResults: {
      default: () => settings.filterNoResults
    },
  },

  data() {
    return {
      hoverIndex: null,
      columns: [],
      rows: [],
      filter: '',
      sort: {
        fieldName: '',
        order: '',
      },
      pagination: null,

      localSettings: {},
    }
  },

  created() {
    this.sort.fieldName = this.sortBy;
    this.sort.order = this.sortOrder;

  },

  async mounted() {
    const columnComponents = this.$slots.default
      .filter(column => column.componentInstance)
      .map(column => column.componentInstance);

    this.columns = columnComponents.map(
      column => {
        return new Column(column)
      }
    );

    columnComponents.forEach(columnCom => {
      Object.keys(columnCom.$options.props).forEach(
        prop => columnCom.$watch(prop, () => {
          this.columns = columnComponents.map(
            column => new Column(column)
          );
        })
      );
    });

    await this.mapDataToRows();
  },

  watch: {
    data() {
      this.mapDataToRows();
    },
  },

  computed: {
    fullTableClass() {
      return classList('table-component__table', this.tableClass);
    },

    fullTableHeadClass() {
      return classList('table-component__table__head', this.theadClass);
    },

    fullTableBodyClass() {
      return classList('table-component__table__body', this.tbodyClass);
    },

    fullFilterInputClass() {
      return classList('table-component__filter__field', this.filterInputClass);
    },

    ariaCaption() {
      if (this.sort.fieldName === '') {
        return 'Table not sorted';
      }

      return `Table sorted by ${this.sort.fieldName} ` +
        (this.sort.order === 'asc' ? '(ascending)' : '(descending)');
    },

    displayedRows() {
      if (!this.showFilter) {
        return this.sortedRows;
      }

      if (!this.columns.filter(column => column.isFilterable()).length) {
        return this.sortedRows;
      }

      return this.sortedRows.filter(row => row.passesFilter(this.filter));
    },

    sortedRows() {
      if (this.sort.fieldName === '') {
        return this.rows;
      }

      if (this.columns.length === 0) {
        return this.rows;
      }

      const sortColumn = this.getColumn(this.sort.fieldName);

      if (!sortColumn) {
        return this.rows;
      }

      return this.rows.sort(sortColumn.getSortPredicate(this.sort.order, this.columns));
    },

    filterableColumnExists() {
      return this.columns.filter(c => c.isFilterable()).length > 0;
    },

  },

  methods: {
    async pageChange(page) {
      this.pagination.currentPage = page;

      await this.mapDataToRows();
    },

    async mapDataToRows() {
      const data = this.data;

      let rowId = 0;

      this.rows = data
        .map(rowData => {
          rowData.index = rowId++;
          return rowData;
        })
        .map(rowData => new Row(rowData, this.columns));
    },

    async refresh() {
      await this.mapDataToRows();
    },

    changeSorting(column) {
      if (this.sort.fieldName !== column.show) {
        this.sort.fieldName = column.show;
        this.sort.order = 'asc';
      } else {
        this.sort.order = (this.sort.order === 'asc' ? 'desc' : 'asc');
      }

    },

    getColumn(columnName) {
      return this.columns.find(column => column.show === columnName);
    },

    handleRowEvent(action, $event, row, index) {
      switch (action) {
        case 'mouse-enter':
          this.hoverIndex = index;
          break;
        case 'mouse-leave':
          this.hoverIndex = null;
          break;
      }
      this.$emit('row-event', action, $event, row, index);
    }
  },
};
</script>