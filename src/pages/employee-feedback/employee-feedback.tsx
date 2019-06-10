import { SnackbarContent } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/styles';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { FeedbackData } from '~components/feedback/feedback';
import { PageContent } from '~components/page-content/page-content';
import { PageHeader } from '~components/page-header/page-header';
import { Review, Reviews } from '~components/reviews/reviews';
import { userService } from '~services/user-service';
import { FeedbackStore } from '~stores/feedback';
import { StyledComponentProps } from '~types/styled';

import { Classes, styles } from './styles';

/**
 * Employee feedback page where employees will see reviews they got from other people
 * and he can give his feedback on each/any review.
 * Employee can give multiple feedbacks on any review.
 */
@inject('feedbackStore')
@observer
class EmployeeFeedback extends React.Component<EmployeeFeedbackProps> {
  /** Holds currently logged in user info */
  private readonly currentUser = userService.getUserInfo();

  /**
   * Load reviews of currently logged in employee, so that he can give feedback
   */
  componentDidMount(): void {
    const { feedbackStore } = this.injectedProps;
    feedbackStore
      .loadReviews({
        employeeId: this.currentUser._id,
      })
      .catch();
  }

  /** Gives injected props */
  get injectedProps(): InjectedProps {
    return this.props as InjectedProps;
  }

  /**
   * Renders employee feedback page
   */
  render(): JSX.Element {
    const { t } = this.props;
    const { classes } = this.injectedProps;

    return (
      <>
        <PageHeader headerTitle={t('pageHeadTitle.employeeFeedback')} />
        <PageContent>
          <SnackbarContent
            className={classes.infoLabel}
            message={(
              <span className={classes.infoMessage}>
                <InfoIcon className={classes.infoIcon} />
                {t('employeeFeedback.label')}
              </span>
            )}
          />
          {this.renderReviews()}
        </PageContent>
      </>
    );
  }

  /**
   * Renders reviews with feedback editable and creatable
   */
  renderReviews = () => {
    const { feedbackStore } = this.injectedProps;
    const { reviews } = feedbackStore;

    const reviewData: Review[] = reviews && reviews.map((review) => ({
      id: review._id,
      review: review.description,
      reviewBy: review.reviewBy,
      updatedDate: review.updatedDate,
      feedbacks: review.feedbacks && review.feedbacks.map((feedback) => ({
        id: feedback._id,
        feedback: feedback.feedback,
        reviewId: feedback.reviewId,
        editable: true,
        deletable: true,
      })),
    }));

    return (
      <Reviews
        data={reviewData}
        createFeedback={true}
        onCreateFeedback={this.createFeedback}
        onEditFeedback={this.editFeedback}
        onDeleteFeedback={this.deleteFeedback}
      />
    );
  }

  /**
   * Creates new feedback for some review by calling apu
   */
  createFeedback = async (data: FeedbackData) => {
    const { feedbackStore } = this.injectedProps;

    await feedbackStore.createFeedback({
      reviewId: data.reviewId,
      feedback: data.feedback,
      employeeId: this.currentUser._id,
    });
  }

  /**
   * Updates feedback of some review
   */
  editFeedback = async (data: FeedbackData) => {
    const { feedbackStore } = this.injectedProps;

    await feedbackStore.updateFeedback({
      _id: data.id,
      feedback: data.feedback,
      reviewId: data.reviewId,
      employeeId: this.currentUser._id,
    });
  }

  /**
   * Deletes feedback of some review
   */
  deleteFeedback = async (data: FeedbackData) => {
    const { feedbackStore } = this.injectedProps;

    await feedbackStore.deleteFeedback({
      _id: data.id,
      feedback: data.feedback,
      reviewId: data.reviewId,
      employeeId: this.currentUser._id,
    });
  }
}

interface StoreProps {
  /** Instance of feedback store */
  feedbackStore: FeedbackStore;
}

type InjectedProps = StyledComponentProps<Classes> & StoreProps;

type EmployeeFeedbackProps = WithTranslation & Partial<InjectedProps>;

const WrappedComponent = withStyles(styles)(withTranslation()(EmployeeFeedback));

export {
  WrappedComponent as EmployeeFeedback,
};
