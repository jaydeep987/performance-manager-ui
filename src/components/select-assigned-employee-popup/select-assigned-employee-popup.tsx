import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { DataSelectorPopup, DataSelectorPopupProps } from '~components/data-selector-popup/data-selector-popup';
import { AssigneeStore } from '~stores/assignees';

import { getColumns } from './get-columns';

/**
 * Reusable component to show select assigned employee popup,
 * where user can view employees assigned to him to give review.
 * He can select any assigned employee to give review.
 */
@inject('assigneeStore')
@observer
class SelectAssignedEmployeePopup extends React.Component<SelectAssignedEmployeePopupProps> {
  constructor(props: SelectAssignedEmployeePopupProps) {
    super(props);
    const { assigneeStore } = this.injectedProps;
    const { t } = this.props;

    assigneeStore.setTranslate(t);
  }

  /** Gives injected props */
  get injectedProps(): InjectedProps {
    return this.props as InjectedProps;
  }

  /**
   * Before popup gets open, fetch data from api.
   * Fetch latest from api everytime popup opens
   */
  async componentWillReceiveProps(newProps: SelectAssignedEmployeePopupProps): Promise<void> {
    const { assigneeStore } = this.injectedProps;
    const { openPopup } = this.props;
    const { openPopup: newOpenPopup, assigneeId } = newProps;

    if (openPopup !== newOpenPopup && newOpenPopup) {
      await assigneeStore.loadAssignedEmployees(assigneeId);
    }
  }

  /**
   * Renders select employee popup
   */
  render(): JSX.Element {
    const { t } = this.props;
    const { assigneeStore } = this.injectedProps;

    return (
      <DataSelectorPopup
        {...this.props}
        title={t('selectAssignedEmployeePopup.popupTitle')}
        cancelButtonTitle={t('selectAssignedEmployeePopup.button.cancel')}
        data={assigneeStore.assignedEmployees}
        error={assigneeStore.error}
        tableColumns={getColumns(t)}
      />
    );
  }
}

interface StoreProps {
  /** Instance of assigneeStore store */
  assigneeStore: AssigneeStore;
}

interface Props {
  /** Assignee ID for whom want to find Assigned employees */
  assigneeId: string;
}

type InjectedProps = StoreProps;

type SelectAssignedEmployeePopupProps = Props & WithTranslation &
  Omit<DataSelectorPopupProps, 'tableColumns' | 'data' | 'title' | 'cancelButtonTitle'> &
  Partial<InjectedProps>;

const WrappedComponent = withTranslation()(SelectAssignedEmployeePopup);

export {
  WrappedComponent as SelectAssignedEmployeePopup,
};
