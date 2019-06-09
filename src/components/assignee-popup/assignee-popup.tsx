import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { ErrorMessage } from '~components/error-message/error-message';
import { SelectEmployeePopup } from '~components/select-employee-popup/select-employee-popup';
import { Assignee } from '~model/assignee';
import { User } from '~model/user';
import { AssigneeStore } from '~stores/assignees';
import { StyledComponentProps } from '~types/styled';

import { Classes, styles } from './styles';

/**
 * Assignee selection and management popup.
 * To be shown in admin-review page.
 */
@inject('assigneeStore')
@observer
class AssigneePopup extends React.Component<AssigneePopupProps, AssigneePopupState> {
  constructor(props: AssigneePopupProps) {
    super(props);

    this.state = {
      addAssignee: false,
    };

    const { assigneeStore } = this.injectedProps;
    const { t } = this.props;

    assigneeStore.setTranslate(t);
  }

  /**
   * When popup opens, call api to load assignees from api.
   * Call only when openPopup is true and is different from old props
   */
  componentWillReceiveProps(nextProps: AssigneePopupProps): void {
    const { openPopup: oldOpenPopup } = this.props;
    const { openPopup: newOpenPopup, selectedEmployee } = nextProps;
    const { assigneeStore } = this.injectedProps;

    if (newOpenPopup && oldOpenPopup !== newOpenPopup && selectedEmployee) {
      assigneeStore
        .loadAssignees(selectedEmployee._id)
        .catch();
    }
  }

  /** Gives injected props */
  get injectedProps(): InjectedProps {
    return this.props as InjectedProps;
  }

  /**
   * Renders assignee popup
   */
  render(): JSX.Element | null {
    const {
      selectedEmployee,
      t,
      openPopup = false,
    } = this.props;
    const { classes, assigneeStore } = this.injectedProps;

    if (!selectedEmployee) {
      return null; // tslint:disable-line:no-null-keyword
    }

    return (
      <Dialog
        open={openPopup}
        scroll="paper"
      >
        <DialogTitle className={classes.title}>
          <Grid container={true} className={classes.titleContainer}>
            <Grid sm={true} item={true}>
              {t('assigneePopup.title')}
            </Grid>
            <Grid item={true}>
              <IconButton
                onClick={this.addAssigneeHandler}
                disabled={assigneeStore.loading}
              >
                <PersonAddIcon />
              </IconButton>
              <IconButton onClick={this.onClosePopupHandler}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className={classes.content}>
          {this.renderDialogContent()}
        </DialogContent>
      </Dialog>
    );
  }

  /**
   * Renders Dialog content
   */
  renderDialogContent = () => {
    const { assigneeStore, classes } = this.injectedProps;

    return (
      <div className={classNames({ [classes.loadingProgressOverlay]: assigneeStore.loading })}>
        {this.renderLoadingProgress()}
        {assigneeStore.error && <ErrorMessage message={assigneeStore.error} />}
        {this.renderSelectEmployeePopup()}
        <List className={classes.list}>
          {this.generateAssigneeList()}
        </List>
      </div>
    );
  }

  /**
   * Renders loading spinner
   */
  renderLoadingProgress = () => {
    const { assigneeStore, classes } = this.injectedProps;

    if (!assigneeStore.loading) {
      return undefined;
    }

    return (
      <div className={classes.loadingProgress}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  /**
   * Generates and render assignee list from data received
   */
  generateAssigneeList = () => {
    const { t } = this.props;
    const { assigneeStore } = this.injectedProps;

    if (!assigneeStore.assignees || !assigneeStore.assignees.length) {
      return (
        <ListItem>
          <ListItemText primary={t('assigneePopup.noAssignee')} />
        </ListItem>
      );
    }

    return assigneeStore.assignees.map((assignee) => (
      <ListItem key={assignee._id}>
        <ListItemText primary={(assignee.assigneeInfo as User[])[0].firstName} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => { this.onDeleteAssignee(assignee); }}
            disabled={assigneeStore.loading}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }

  /**
   * Cancel adding assingee
   */
  cancelAddAssignee = () => {
    this.setState({
      addAssignee: false,
    });
  }

  /**
   * On Select of employee (assignee) from popup, save it.
   */
  onSelectEmployee = (selectedData: User) => {
    const { selectedEmployee } = this.props;
    const { assigneeStore } = this.injectedProps;

    this.setState({
      addAssignee: false,
    });

    assigneeStore
      .createAssignee({
        assignedEmployeeId: (selectedEmployee as User)._id,
        assigneeId: selectedData._id,
      })
      .catch();
  }

  /**
   * On click of delete assignee icon, call api and delete
   */
  onDeleteAssignee = (assignee: Assignee) => {
    const { assigneeStore } = this.injectedProps;
    assigneeStore
      .deleteAssignee(assignee)
      .catch();
  }

  /**
   * Render select employee popup to select assignee.
   */
  renderSelectEmployeePopup = (): JSX.Element | undefined => {
    const { addAssignee } = this.state;

    if (!addAssignee) {
      return undefined;
    }

    return (
      <SelectEmployeePopup
        openPopup={true}
        onSelect={this.onSelectEmployee}
        onCancel={this.cancelAddAssignee}
      />
    );
  }

  /**
   * On Click of add assignee button, open select employee popup.
   */
  addAssigneeHandler = () => {
    this.setState({
      addAssignee: true,
    });
  }

  /**
   * On close popup, clear store, and call handler from prop
   */
  onClosePopupHandler = () => {
    const { assigneeStore } = this.injectedProps;
    const { onClosePopup } = this.props;

    onClosePopup()
      .then(() => {
        assigneeStore.clearStore();
      })
      .catch();
  }
}

interface StoreProps {
  /** Assignee store */
  assigneeStore: AssigneeStore;
}

type InjectedProps = StyledComponentProps<Classes> & StoreProps;

interface AssigneePopupProps extends WithTranslation, Partial<InjectedProps> {
  /** Popup open status */
  openPopup: boolean;
  /** Employee for whom need to assign other employees */
  selectedEmployee?: User;
  /**
   * On close popup handler. In case need some complex operation, expect promise
   * so can do some operation after that.
   */
  onClosePopup(): Promise<void>;
}

interface AssigneePopupState {
  /** Add assignee state to select from popup */
  addAssignee: boolean;
}

const WrappedComponent = withStyles(styles)(withTranslation()(AssigneePopup));

export {
  WrappedComponent as AssigneePopup,
};
