import {
  Button,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import dayjs from 'dayjs';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { dateFormat } from '~common/constants';
import { ContentBlock, ContentBlockData } from '~components/content-block/content-block';
import { Feedback, FeedbackData, FeedbackProps } from '~components/feedback/feedback';

import { FormDialog } from './form-dialog';
import { FormValues } from './review-form';
import { useStyles } from './styles';

/**
 * Component to show reviews of selected employee.
 * Reviews along with feedbacks will be shown.
 * Also enable user to add/edit/delete reviews.
 */
const Reviews: React.FunctionComponent<ReviewsProps> = (props: ReviewsProps): JSX.Element => {
  const classes = useStyles();
  const {
    t,
    data,
    reviewsOf,
    showAddReviewButton,
    customizeHeader,
    onAddReview,
    onEditReview,
    onDeleteReview,
  } = props;
  const initialState: State = {
    dialogOpen: false,
    operation: undefined,
    formValues: undefined,
  };

  const [state, setState] = React.useState(initialState);

  const onEditContent = (contentData: ContentBlockData) => {
    setState({
      dialogOpen: true,
      formValues: {
        id: contentData.id,
        review: contentData.content,
      },
      operation: 'edit',
    });
  };

  const onDeleteContent = async (contentData: ContentBlockData) => {
    if (onDeleteReview) {
      const { content, ...rest } = contentData;
      try {
        await onDeleteReview({
          review: content,
          ...rest,
        });
        setState({
          dialogOpen: false,
        });
      } catch (err) {
        // Ignore and dont close popup
      }
    }
  };

  const onAddReviewHandler = () => {
    setState({
      dialogOpen: true,
      operation: 'add',
    });
  };

  const generateReviewByInfo = (review: Review) => {
    if (review.reviewBy && review.updatedDate) {
      const date = dayjs(review.updatedDate);

      return `${review.reviewBy} ${date.format(dateFormat)}`;
    }

    return '';
  };

  const renderReviews = () => {
    if (!data || (data && !data.length)) {
      return (
        <div className={classes.noReviewMessage}>
          <Typography variant="h6">
            {t('reviews.noReviewMessage')}
          </Typography>
        </div>
      );
    }

    return data.map((review) => (
      <div key={review.id} className={classes.reviewBlock}>
        <ContentBlock
          {...{ content: review.review, ...review }}
          extraContent={generateReviewByInfo(review)}
          onEditContent={onEditContent}
          onDeleteContent={onDeleteContent}
        />
        <Feedback feedbacks={review.feedbacks} reviewId={review.id} {...props} />
      </div>
    ));
  };

  const addReviewButton = (
    <Button variant="contained" color="primary" onClick={onAddReviewHandler}>
      <AddIcon className={classes.addIcon} />
      {t('reviews.buttons.addReview')}
    </Button>
  );

  const renderHeader = () => {
    let content;

    if (customizeHeader) {
      content = customizeHeader({
        addReviewButton: showAddReviewButton ? addReviewButton : undefined,
      });
    } else if (showAddReviewButton) {
      content = addReviewButton;
    }

    return content && (
      <CardContent className={classes.header}>
        {content}
      </CardContent>
    );
  };

  const renderReviewsOfInfo = (): JSX.Element | boolean => !!reviewsOf && (
    <CardContent className={classes.reviewsOfInfo}>
      <Typography variant="button">
        {t('reviews.reviewsOfLabel', { whom: reviewsOf })}
      </Typography>
    </CardContent>
  );

  const onSubmitForm = async (values: FormValues) => {
    try {
      if (state.operation === 'add' && onAddReview) {
        await onAddReview(values);
      } else if (state.operation === 'edit' && onEditReview) {
        await onEditReview(values);
      }
      setState({
        dialogOpen: false,
      });
    } catch (err) {
      // ignore and don't close popup
    }
  };

  const onDialogClose = () => {
    setState({
      dialogOpen: false,
    });
  };

  return (
    <>
      <FormDialog
        openDialog={state.dialogOpen}
        formValues={state.formValues}
        onSubmitForm={onSubmitForm}
        onDialogClose={onDialogClose}
        t={t}
      />
      <Card>
        {renderHeader()}
        {renderReviewsOfInfo()}
        <div className={classes.reviewsWrap}>
          {renderReviews()}
        </div>
      </Card>
    </>
  );
};

export interface ReviewData {
  /** Unique ID for review */
  id: string;
  /** Review from admin or someone */
  review: string;
  /** Review by */
  reviewBy?: string;
  /** Last update date */
  updatedDate?: string;
  /** Whether review editable or not */
  editable?: boolean;
  /** Whether review editable or not */
  deletable?: boolean;
}

export interface ReviewsProps extends WithTranslation, Omit<FeedbackProps, 'feedbacks' | 'reviewId'> {
  /** Review from admin or someone */
  data: Review[];
  /** Shown reviews are for this user */
  reviewsOf?: string;
  /** To show add new review button to add new review */
  showAddReviewButton?: boolean;
  /** Customize header. You can add something along with addReview button */
  customizeHeader?(props: CustomizeHeaderProps): JSX.Element;
  /** On add new review handler */
  onAddReview?(data: ReviewData): Promise<void>;
  /** On edit review handler */
  onEditReview?(data: ReviewData): Promise<void>;
  /** On delete review handler */
  onDeleteReview?(data: ReviewData): Promise<void>;
}

interface State {
  /** Dialog open/close state */
  dialogOpen: boolean;
  /** Which operation is being performed */
  operation?: 'add' | 'edit';
  /** Initial form values. Usefule when editing */
  formValues?: FormValues;
}

export interface Review extends ReviewData {
  /** Feedbacks for review */
  feedbacks?: FeedbackData[];
}

export interface CustomizeHeaderProps {
  /** In built addReview button. If showAddReviewButton is false, this will be undefined */
  addReviewButton?: JSX.Element;
}

const WrappedComponent = withTranslation()(Reviews);

export {
  WrappedComponent as Reviews,
};
