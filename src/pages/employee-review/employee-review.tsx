import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/styles';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { EmployeeReviews } from '~components/employee-reviews/employee-reviews';
import { PageContent } from '~components/page-content/page-content';
import { PageHeader } from '~components/page-header/page-header';
import { CustomizeHeaderProps } from '~components/reviews/reviews';
import { SelectAssignedEmployeePopup } from '~components/select-assigned-employee-popup/select-assigned-employee-popup';
import { User } from '~model/user';
import { userService } from '~services/user-service';
import { EmployeeReviewStore } from '~stores/employee-review';
import { StyledComponentProps } from '~types/styled';

import { Classes, styles } from './styles';

/**
 * Employee page where employee can give review to some other employee.
 * He will only see employees which were assigned to him by admin.
 */
@inject('employeeReviewStore')
@observer
class EmployeeReview extends React.Component<EmployeeReviewProps> {
  /** Gives injected props */
  get injectedProps(): InjectedProps {
    return this.props as InjectedProps;
  }

  /**
   * Renders employee review page
   */
  render(): JSX.Element {
    const { t } = this.props;
    const { employeeReviewStore, classes } = this.injectedProps;
    const selectionButtons = !employeeReviewStore.selectedEmployee && (
      <div className={classes.selectionButtons}>
        {this.renderSelectionButtons()}
      </div>
    );
    const currentUser = userService.getUserInfo();

    return (
      <>
        <PageHeader headerTitle={t('pageHeadTitle.employeeReview')} />
        <PageContent>
          <SelectAssignedEmployeePopup
            assigneeId={currentUser && currentUser._id}
            openPopup={employeeReviewStore.employeeSelectPopupOpen}
            onCancel={this.closeEmployeeSelectPopupHandler}
            onSelect={this.onSelectEmployee}
          />
          {selectionButtons}
          {this.renderReviews()}
        </PageContent>
      </>
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
          {t('employeeReview.button.viewAssignedEmployees')}
        </Button>
      </>
    );
  }

  /**
   * Renders reviews
   */
  renderReviews = () => {
    const { employeeReviewStore } = this.injectedProps;
    const { selectedEmployee } = employeeReviewStore;

    if (!selectedEmployee) {
      return undefined;
    }

    return (
      <EmployeeReviews
        customizeHeader={this.renderReviewHeader}
        selectedEmployee={selectedEmployee}
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
    const { employeeReviewStore } = this.injectedProps;

    if (!employeeReviewStore.selectedEmployee) {
      return undefined;
    }

    return (
      <>
        {props.addReviewButton}
      </>
    );
  }

  /** Opens popup so that user can select employee */
  selectEmployeeHandler = () => {
    const { employeeReviewStore } = this.injectedProps;
    employeeReviewStore.openEmployeeSelectPopup();
  }

  /** Opens popup so that user can select employee */
  closeEmployeeSelectPopupHandler = () => {
    const { employeeReviewStore } = this.injectedProps;
    employeeReviewStore.closeEmployeeSelectPopup();
  }

  /** Set selected employee in store and close popup */
  onSelectEmployee = (selected: User) => {
    const { employeeReviewStore } = this.injectedProps;
    employeeReviewStore.selectEmployee(selected);
    this.closeEmployeeSelectPopupHandler();
  }
}

const WrappedComponent = withStyles(styles)(withTranslation()(EmployeeReview));

interface StoreProps {
  /** Admin review store */
  employeeReviewStore: EmployeeReviewStore;
}

type InjectedProps = StyledComponentProps<Classes> & StoreProps;

type EmployeeReviewProps = WithTranslation & Partial<InjectedProps>;

export {
  WrappedComponent as EmployeeReview,
};
