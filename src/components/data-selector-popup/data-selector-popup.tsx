import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import MaterialTable, { Column, MaterialTableProps } from 'material-table';
import * as React from 'react';
import { ErrorMessage } from '~components/error-message/error-message';

const DataSelectorPopup:
React.FunctionComponent<DataSelectorPopupProps> = (props: DataSelectorPopupProps): JSX.Element => {
  const {
    openPopup,
    contentText,
    tableColumns,
    data,
    error,
    onSelect,
    onCancel,
    cancelButtonTitle = 'Cancel',
    title = 'Select Data',
  } = props;

  // tslint:disable-next-line
  // @ts-ignore Need to use any, because it's generic from MaterialTable itself
  const onRowClickHandler = (_1, rowData) => {
    onSelect(rowData);
  };

  return (
    <Dialog
      open={openPopup}
      fullWidth={true}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      {error && <ErrorMessage message={error} />}
      {contentText && <DialogContentText>{contentText}</DialogContentText>}
      <MaterialTable
        title=""
        columns={tableColumns}
        data={data}
        onRowClick={onRowClickHandler}
      />
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={onCancel}
        >
          {cancelButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export interface DataSelectorPopupProps {
  /** State to open/close popup */
  openPopup: boolean;
  /** Title of popup. Default: 'Select Data' */
  title?: string;
  /** Set cancel button title. Default: 'Cancel' */
  cancelButtonTitle: string;
  /** Any content text you want to show above table */
  contentText?: string;
  /** Columns of table */
  tableColumns: Column[];
  /** Data to show in table */
  data: MaterialTableProps['data'];
  /** In case any error message from api or something */
  error?: string;
  /** Handler to do something on click of Select row */
  // tslint:disable-next-line:no-any
  onSelect(data: any): void;
  /** Handler to do something on click of Cancel button */
  onCancel(): void;
}

export {
  DataSelectorPopup,
};
