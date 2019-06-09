import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Formik } from 'formik';
import i18next from 'i18next';
import * as React from 'react';

import { FormValues, ReviewForm } from './review-form';

const FormDialog: React.FunctionComponent<FormDialogProps> = (props: FormDialogProps): JSX.Element => {
  const {
    t,
    openDialog,
    formValues = { id: '', review: '' },
    onSubmitForm,
    onDialogClose,
  } = props;

  return (
    <Dialog open={openDialog} fullWidth={true}>
      <DialogTitle>{t('reviews.formDialogTitle')}</DialogTitle>
      <DialogContent>
        <Formik
          render={(formProps) => <ReviewForm t={t} {...formProps} onDialogClose={onDialogClose} />}
          initialValues={formValues}
          onSubmit={onSubmitForm}
        />
      </DialogContent>
    </Dialog>
  );
};

interface FormDialogProps {
  /** Dialog open status */
  openDialog: boolean;
  /** Form values */
  formValues?: FormValues;
  /** Translation function */
  t: i18next.TFunction;
  /** onSubmitForm handler */
  onSubmitForm(values: FormValues): void;
  /** On close dialog button click */
  onDialogClose(): void;
}

export {
  FormDialog,
};
