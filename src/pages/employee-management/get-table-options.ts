import { Options } from 'material-table';

import { tablePageSize, tablePageSizeOptions } from './constants';

export const tableOptions: Options = {
  pageSize: tablePageSize,
  pageSizeOptions: tablePageSizeOptions,
  search: true,
};
