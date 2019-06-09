import { Button, TextField } from '@material-ui/core';
import { FormikProps, FormikValues } from 'formik';
import i18next from 'i18next';
import * as React from 'react';

import { useStyles } from './styles';

const ReviewForm: React.FunctionComponent<ReviewFormProps> = (props: ReviewFormProps): JSX.Element => {
  const {
    t,
    handleSubmit,
    handleChange,
    onDialogClose,
    values,
  } = props;
  const classes = useStyles();
  const MAX_ROWS = 5;

  return (
    <form onSubmit={handleSubmit} className={classes.reviewForm}>
      <TextField
        placeholder={t('reviews.form.writeReviewPlaceholder')}
        name="review"
        multiline={true}
        rowsMax={MAX_ROWS}
        required={true}
        onChange={handleChange('review')}
        value={values.review}
      />

      <div className={classes.reviewFormButtonWrap}>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          className={classes.reviewFormButtons}
        >
          {t('reviews.form.submitButton')}
        </Button>

        <Button
          color="secondary"
          variant="contained"
          className={classes.reviewFormButtons}
          onClick={onDialogClose}
        >
          {t('reviews.form.cancelButton')}
        </Button>
      </div>
    </form>
  );
};

interface ReviewFormProps extends FormikProps<FormikValues> {
  /** Translation function */
  t: i18next.TFunction;
  /** Do something on close button click and close dialog */
  onDialogClose(): void;
}

export interface FormValues {
  /** Review */
  review: string;
  /** Id of review */
  id: string;
}

export {
  ReviewForm,
};
