import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { ErrorMessage } from '~components/error-message/error-message';
import {
  Review,
  ReviewData,
  Reviews,
  ReviewsProps,
} from '~components/reviews/reviews';
import { User } from '~model/user';
import { userService } from '~services/user-service';
import { ReviewStore } from '~stores/review';

/**
 * Showing reviews of some employee.
 * Wrapping Review component to make this component reuasble.
 * For Admin : This component will serve as page for review all employees by admin
 * For Employee : This component will serve as page to review only employees which are assigned to him
 * I assume only admins can assign some employees to participate in review process, I am not making
 * Assignee process generic in this component. So only admin page will handle that.
 */
@inject('reviewStore')
@observer
class EmployeeReviews extends React.Component<EmployeeReviewsProps> {
  /** Currently logged in user info */
  private readonly currentUser = userService.getUserInfo();

  constructor(props: EmployeeReviewsProps) {
    super(props);
    const { t } = this.props;
    const { reviewStore } = this.injectedProps;

    reviewStore.setTranslate(t);
  }

  /**
   * When component gets mounted call api to get reviews
   */
  componentDidMount(): void {
    const { selectedEmployee } = this.props;
    this.loadReviews(selectedEmployee);
  }

  /**
   * When component get updated selectedEmployee prop, call api to get that updated employee's reviews
   */
  componentWillReceiveProps(newProps: EmployeeReviewsProps): void {
    const { selectedEmployee } = this.props;
    const { selectedEmployee: newSelectedEmployee } = newProps;

    // Make sure old and new are available and there is different employee.
    // Load reviews for newly selected employee
    if (selectedEmployee && newSelectedEmployee && selectedEmployee._id !== newSelectedEmployee._id) {
      this.loadReviews(newSelectedEmployee);
    }
  }

  /** Gives injected props */
  get injectedProps(): InjectedProps {
    return this.props as InjectedProps;
  }

  /**
   * Renders admin review page
   */
  render(): JSX.Element {
    const { reviewStore } = this.injectedProps;

    return (
      <>
        {reviewStore.error && <ErrorMessage message={reviewStore.error} />}
        {this.renderReviews()}
      </>
    );
  }

  /**
   * Renders reviews
   */
  renderReviews = () => {
    const { reviewStore } = this.injectedProps;
    const { selectedEmployee, customizeHeader } = this.props;

    if (!selectedEmployee) {
      return undefined;
    }

    const reviewData: Review[] = reviewStore.reviews && reviewStore.reviews.map((review) => ({
      id: review._id,
      review: review.description,
      editable: true,
      deletable: true,
      reviewBy: review.reviewBy,
      updatedDate: review.updatedDate,
      feedbacks: review.feedbacks && review.feedbacks.map((feedback) => ({
        id: feedback._id,
        feedback: feedback.feedback,
        reviewId: feedback.reviewId,
      })),
    }));
    const reviewsOf = selectedEmployee
      ? `${selectedEmployee.lastName} ${selectedEmployee.firstName}`
      : '';

    return (
      <Reviews
        data={reviewData}
        reviewsOf={reviewsOf}
        showAddReviewButton={!reviewStore.error && !!selectedEmployee}
        onEditReview={this.editReviewHandler}
        onAddReview={this.addReviewHandler}
        onDeleteReview={this.deleteReviewHandler}
        customizeHeader={customizeHeader}
      />
    );
  }

  /** On add new review handler. Call API to add */
  addReviewHandler = (data: ReviewData): Promise<void> => {
    const { reviewStore } = this.injectedProps;
    const { selectedEmployee } = this.props;

    return reviewStore
      .createReview({
        description: data.review,
        updatedBy: this.currentUser._id,
        employeeId: selectedEmployee._id,
      });
  }

  /** On edit review handler. Call API to update */
  editReviewHandler = (data: ReviewData): Promise<void> => {
    const { reviewStore } = this.injectedProps;
    const { selectedEmployee } = this.props;

    return reviewStore
      .updateReview({
        _id: data.id,
        description: data.review,
        updatedBy: this.currentUser._id,
        employeeId: selectedEmployee._id,
      });
  }

  /** On delete review handler. Call API to delete */
  deleteReviewHandler = (data: ReviewData): Promise<void> => {
    const { reviewStore } = this.injectedProps;
    const { selectedEmployee } = this.props;

    return reviewStore
      .deleteReview({
        _id: data.id,
        description: data.review,
        updatedBy: this.currentUser._id,
        employeeId: selectedEmployee._id,
      });
  }

  /** Loads review data */
  loadReviews = (selectedEmployee: User) => {
    const { reviewStore } = this.injectedProps;

    reviewStore
      .loadReviews({
        updatedBy: this.currentUser._id,
        employeeId: selectedEmployee._id,
      })
      .catch();
  }
}

const WrappedComponent = withTranslation()(EmployeeReviews);

interface StoreProps {
  /** Review store */
  reviewStore: ReviewStore;
}

type InjectedProps = StoreProps;

interface EmployeeReviewsProps extends WithTranslation, Partial<InjectedProps> {
  /** selected employee info */
  selectedEmployee: User;
  /** Customize header. You can add something along with addReview button */
  customizeHeader: ReviewsProps['customizeHeader'];
}

export {
  WrappedComponent as EmployeeReviews,
};
