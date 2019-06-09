import { Button } from '@material-ui/core';
import ViewAssigneeIcon from '@material-ui/icons/AssignmentInd';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/styles';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { AssigneePopup } from '~components/assignee-popup/assignee-popup';
import { ErrorMessage } from '~components/error-message/error-message';
import { PageContent } from '~components/page-content/page-content';
import { PageHeader } from '~components/page-header/page-header';
import {
  CustomizeHeaderProps,
  Review,
  ReviewData,
  Reviews,
} from '~components/reviews/reviews';
import { SelectEmployeePopup } from '~components/select-employee-popup/select-employee-popup';
import { User } from '~model/user';
import { userService } from '~services/user-service';
import { AdminReviewStore } from '~stores/admin-review';
import { StyledComponentProps } from '~types/styled';

import { Classes, styles } from './styles';

/**
 * Admin page where admin can give review to some employee.
 * He can also assign some other employees to give review to some employee.
 */
@inject('adminReviewStore')
@observer
class AdminReview extends React.Component<AdminReviewProps> {
  /** Currently logged in user info */
  private readonly currentUser = userService.getUserInfo();

  constructor(props: AdminReviewProps) {
    super(props);
    const { t } = this.props;
    const { adminReviewStore } = this.injectedProps;

    adminReviewStore.setTranslate(t);
  }

  /** Gives injected props */
  get injectedProps(): InjectedProps {
    return this.props as InjectedProps;
  }

  /**
   * Renders admin review page
   */
  render(): JSX.Element {
    const { t } = this.props;
    const { adminReviewStore, classes } = this.injectedProps;
    const selectionButtons = !adminReviewStore.selectedEmployee && (
      <div className={classes.selectionButtons}>
        {this.renderSelectionButtons()}
      </div>
    );

    return (
      <div>
        <PageHeader headerTitle={t('pageHeadTitle.adminReview')} />
        <PageContent>
          {adminReviewStore.error && <ErrorMessage message={adminReviewStore.error} />}
          <SelectEmployeePopup
            openPopup={adminReviewStore.employeeSelectPopupOpen}
            onCancel={this.closeEmployeeSelectPopupHandler}
            onSelect={this.onSelectEmployee}
          />
          <AssigneePopup
            openPopup={adminReviewStore.assigneePopupOpen}
            selectedEmployee={adminReviewStore.selectedEmployee}
            onClosePopup={this.closeAssigneePopup}
          />
          {selectionButtons}
          {this.renderReviews()}
        </PageContent>
      </div>
    );
  }

  /** Renders Select employee button */
  renderSelectionButtons = () => {
    const { t } = this.props;
    const { classes } = this.injectedProps;

    return (
      <>
        <Button variant="contained" color="primary" onClick={this.selectEmployeeHandler}>
          <PersonIcon className={classes.buttonIcon} />
          {t('adminReview.button.selectEmployee')}
        </Button>
      </>
    );
  }

  /**
   * Renders reviews
   */
  renderReviews = () => {
    const { adminReviewStore } = this.injectedProps;
    const { selectedEmployee } = adminReviewStore;

    if (!selectedEmployee) {
      return undefined;
    }

    const reviewData: Review[] = adminReviewStore.reviews && adminReviewStore.reviews.map((review) => ({
      id: review._id,
      review: review.description,
      editable: true,
      deletable: true,
      feedbacks: review.feedbacks && review.feedbacks.map((feedback) => ({
        id: feedback._id,
        feedback: feedback.feedback,
      })),
    }));
    const reviewsOf = selectedEmployee
      ? `${selectedEmployee.lastName} ${selectedEmployee.firstName}`
      : '';

    return (
      <Reviews
        data={reviewData}
        reviewsOf={reviewsOf}
        showAddReviewButton={!adminReviewStore.error && !!selectedEmployee}
        customizeHeader={this.renderReviewHeader}
        onEditReview={this.editReviewHandler}
        onAddReview={this.addReviewHandler}
        onDeleteReview={this.deleteReviewHandler}
      />
    );
  }

  /**
   * Renders customized review header.
   * Adding button to allow user to select employee for which he want to see/manage reviews.
   */
  renderReviewHeader = (props: CustomizeHeaderProps) => {
    const { classes } = this.injectedProps;

    return (
      <div className={classes.customizedHeader}>
        {this.renderSelectionButtons()}
        {this.renderReviewHeaderButtons(props)}
      </div>
    );
  }

  /** Renders header buttons other than select employee button */
  renderReviewHeaderButtons = (props: CustomizeHeaderProps) => {
    const { adminReviewStore, classes } = this.injectedProps;
    const { t } = this.props;

    if (!adminReviewStore.selectedEmployee) {
      return undefined;
    }

    return (
      <>
        {props.addReviewButton}
        <Button variant="contained" color="primary" onClick={this.viewAssigneesHandler}>
          <ViewAssigneeIcon className={classes.buttonIcon} />
          {t('adminReview.button.viewAssignees')}
        </Button>
      </>
    );
  }

  /** Opens popup so that user can select employee */
  selectEmployeeHandler = () => {
    const { adminReviewStore } = this.injectedProps;
    adminReviewStore.openEmployeeSelectPopup();
  }

  /** Opens popup so that user can select employee */
  closeEmployeeSelectPopupHandler = () => {
    const { adminReviewStore } = this.injectedProps;
    adminReviewStore.closeEmployeeSelectPopup();
  }

  /** Set selected employee in store and close popup */
  onSelectEmployee = (selected: User) => {
    const { adminReviewStore } = this.injectedProps;
    adminReviewStore.selectEmployee(selected);
    this.closeEmployeeSelectPopupHandler();

    // Load reviews for selected employee
    this.loadReviews();
  }

  /** On add new review handler. Call API to add */
  addReviewHandler = (data: ReviewData): Promise<void> => {
    const { adminReviewStore } = this.injectedProps;

    return adminReviewStore
      .createReview({
        description: data.review,
        updatedBy: this.currentUser._id,
        employeeId: (adminReviewStore.selectedEmployee as User)._id,
      });
  }

  /** On edit review handler. Call API to update */
  editReviewHandler = (data: ReviewData): Promise<void> => {
    const { adminReviewStore } = this.injectedProps;

    return adminReviewStore
      .updateReview({
        _id: data.id,
        description: data.review,
        updatedBy: this.currentUser._id,
        employeeId: (adminReviewStore.selectedEmployee as User)._id,
      });
  }

  /** On delete review handler. Call API to delete */
  deleteReviewHandler = (data: ReviewData): Promise<void> => {
    const { adminReviewStore } = this.injectedProps;

    return adminReviewStore
      .deleteReview({
        _id: data.id,
        description: data.review,
        updatedBy: this.currentUser._id,
        employeeId: (adminReviewStore.selectedEmployee as User)._id,
      });
  }

  /** To view list of assignees for selected employee */
  viewAssigneesHandler = (): void => {
    const { adminReviewStore } = this.injectedProps;

    if (adminReviewStore.selectedEmployee) {
      adminReviewStore.openAssigneePopup();
    }
  }

  /** Close assignee popup */
  closeAssigneePopup = async (): Promise<void> => {
    const { adminReviewStore } = this.injectedProps;
    adminReviewStore.closeAssigneePopup();
  }

  /** Loads review data */
  loadReviews = () => {
    const { adminReviewStore } = this.injectedProps;

    adminReviewStore
      .loadReviews({
        updatedBy: this.currentUser._id,
        employeeId: (adminReviewStore.selectedEmployee as User)._id,
      })
      .catch();
  }
}

const WrappedComponent = withStyles(styles)(withTranslation()(AdminReview));

interface StoreProps {
  /** Admin review store */
  adminReviewStore: AdminReviewStore;
}

type InjectedProps = StyledComponentProps<Classes> & StoreProps;

type AdminReviewProps = WithTranslation & Partial<InjectedProps>;

export {
  WrappedComponent as AdminReview,
};
