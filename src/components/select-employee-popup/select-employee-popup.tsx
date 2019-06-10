import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { DataSelectorPopup, DataSelectorPopupProps } from '~components/data-selector-popup/data-selector-popup';
import { EmployeeStore } from '~stores/employees';

import { getColumns } from './get-columns';

/**
 * Reusable component to show select employee popup, from which user
 * can select employee and do some processing after getting it.
 */
@inject('employeeStore')
@observer
class SelectEmployeePopup extends React.Component<SelectEmployeePopupProps> {
  constructor(props: SelectEmployeePopupProps) {
    super(props);
    const { employeeStore } = this.injectedProps;
    const { t } = this.props;

    employeeStore.setTranslate(t);
  }

  /** Gives injected props */
  get injectedProps(): InjectedProps {
    return this.props as InjectedProps;
  }

  /**
   * Before popup gets open, fetch data from api.
   * Fetch latest from api everytime popup opens
   */
  componentWillReceiveProps(newProps: SelectEmployeePopupProps): void {
    const { employeeStore } = this.injectedProps;
    const { openPopup } = this.props;
    const { openPopup: newOpenPopup } = newProps;

    if (openPopup !== newOpenPopup && newOpenPopup) {
      employeeStore.loadUsers();
    }
  }

  /**
   * Renders select employee popup
   */
  render(): JSX.Element {
    const { t } = this.props;
    const { employeeStore } = this.injectedProps;

    return (
      <DataSelectorPopup
        {...this.props}
        title={t('selectEmployeePopup.popupTitle')}
        cancelButtonTitle={t('selectEmployeePopup.button.cancel')}
        data={employeeStore.employees}
        error={employeeStore.error}
        tableColumns={getColumns(t)}
      />
    );
  }
}

interface StoreProps {
  /** Instance of employee store */
  employeeStore: EmployeeStore;
}

type InjectedProps = StoreProps;

type SelectEmployeePopupProps = WithTranslation &
  Omit<DataSelectorPopupProps, 'tableColumns' | 'data' | 'title' | 'cancelButtonTitle'> &
  Partial<InjectedProps>;

const WrappedComponent = withTranslation()(SelectEmployeePopup);

export {
  WrappedComponent as SelectEmployeePopup,
};
