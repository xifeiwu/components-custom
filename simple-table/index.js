import TableComponent from './components/TableComponent';
import TableColumn from './components/TableColumn';
import Pagination from './components/Pagination';
import { mergeSettings } from './settings';
import './table-component.scss';

export default {
    install(Vue, options = {}) {
        mergeSettings(options);

        Vue.component('table-component', TableComponent);
        Vue.component('table-column', TableColumn);
        Vue.component('pagination', Pagination);
    },

    settings(settings) {
        mergeSettings(settings);
    },
};

export { TableComponent, TableColumn };
