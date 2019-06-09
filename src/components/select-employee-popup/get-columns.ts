import i18next from 'i18next';
import { Column } from 'material-table';
import { Roles, Sex } from '~model/user';
import { flipObject } from '~utils/object';

/**
 * Gives columns for table
 */
export function getColumns(translate: i18next.TFunction): Column[] {
  return [
    {
      title: 'ID',
      field: '_id',
      hidden: true,
    },
    {
      title: translate('employeeManagement.tableColumns.firstName'),
      field: 'firstName',
    },
    {
      title: translate('employeeManagement.tableColumns.lastName'),
      field: 'lastName',
    },
    {
      title: translate('employeeManagement.tableColumns.gender'),
      field: 'sex',
      lookup: flipObject(Sex),
    },
    {
      title: translate('employeeManagement.tableColumns.userName'),
      field: 'userName',
    },
    {
      title: translate('employeeManagement.tableColumns.role'),
      field: 'role',
      lookup: flipObject(Roles),
    },
  ];
}
