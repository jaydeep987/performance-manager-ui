import { Button } from '@material-ui/core';
import ViewAssigneeIcon from '@material-ui/icons/AssignmentInd';
import PersonIcon from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/styles';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { AssigneePopup } from '~components/assignee-popup/assignee-popup';
import { EmployeeReviews } from '~components/employee-reviews/employee-reviews';
import { PageContent } from '~components/page-content/page-content';
import { PageHeader } from '~components/page-header/page-header';
import { CustomizeHeaderProps } from '~components/reviews/reviews';
import { SelectEmployeePopup } from '~components/select-employee-popup/select-employee-popup';
import { User } from '~model/user';
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
      <>
        <PageHeader headerTitle={t('pageHeadTitle.adminReview')} />
        <PageContent>
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
