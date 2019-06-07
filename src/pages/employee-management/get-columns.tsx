import { TextField } from '@material-ui/core';
import i18next from 'i18next';
import { Column, EditComponentProps } from 'material-table';
import * as React from 'react';
import { Roles, Sex, User } from '~model/user';
import { flipObject } from '~utils/object';

const getPasswordColumnRenderField = (data: User): JSX.Element => (
  <TextField
    type="password"
    disabled={true}
    value={data.password}
  />
);

const getPasswordEditableColumn = ({ columnDef, value, onChange }: EditComponentProps) => (
  <TextField
    type="password"
    placeholder={columnDef.title}
    value={value}
    required={true}
    onChange={(e) => { onChange(e.target.value); }}
  />
);

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
    {
      title: translate('employeeManagement.tableColumns.password'),
      field: 'password',
      editable: 'always',
      render: getPasswordColumnRenderField,
      editComponent: getPasswordEditableColumn,
      searchable: false,
    },
  ];
}
