const settings = {
  tableClass: '',
  theadClass: '',
  tbodyClass: '',
  headerClass: '',
  cellClass: '',
  filterInputClass: '',
  filterPlaceholder: 'Filter table…',
  filterNoResults: '无数据',
};

export function mergeSettings(newSettings) {
  for (const setting in newSettings) {
    settings[setting] = newSettings[setting];
  }
}

export default settings;