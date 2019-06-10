import MaterialTable from 'material-table';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { ErrorMessage } from '~components/error-message/error-message';
import { PageContent } from '~components/page-content/page-content';
import { PageHeader } from '~components/page-header/page-header';
import { User } from '~model/user';
import { EmployeeStore } from '~stores/employees';

import { getColumns } from './get-columns';
import { tableOptions } from './get-table-options';
import { validateRow } from './validate-fields';

/**
 * Page to manage employees/users.
 * Accessible only to Admin.
 * Admin can add/update/delete employees/users and also can view all of them.
 */
@inject('employeeStore')
@observer
class EmployeeManagement extends React.Component<EmployeeManagementProps> {
  constructor(props: EmployeeManagementProps) {
    super(props);
    const { employeeStore } = this.injectedProps;
    const { t } = this.props;

    employeeStore.setTranslate(t);
  }

  /**
   * Load employee data  from api
   */
  componentDidMount(): void {
    this.injectedProps.employeeStore.loadUsers();
  }

  /** Gives injected props */
  get injectedProps(): InjectedProps {
    return this.props as InjectedProps;
  }

  /**
   * Renders employee management component
   */
  render(): JSX.Element {
    const { t } = this.props;
    const { employeeStore } = this.injectedProps;

    return (
      <>
        <PageHeader headerTitle={t('pageHeadTitle.employeeManagement')} />
        <PageContent>
          { employeeStore.error && <ErrorMessage message={employeeStore.error} /> }
          <MaterialTable
            title={t('employeeManagement.tableTitle')}
            options={tableOptions}
            columns={getColumns(t)}
            data={employeeStore.employees}
            editable={this.getEditableActions()}
          />
        </PageContent>
      </>
    );
  }

  /**
   * Various editable actions for data management like add/edit/delete
   */
  private readonly getEditableActions = () => ({
    onRowAdd: (newData: User) => this.injectedProps.employeeStore.addNewUser(newData, validateRow),
    onRowUpdate:
      (newData: User, oldData: User) => this.injectedProps.employeeStore.updateUser(newData, oldData, validateRow),
    onRowDelete: (data: User) => this.injectedProps.employeeStore.deleteUser(data),
  })
}

const TranslatedComponent = withTranslation()(EmployeeManagement);

export {
  TranslatedComponent as EmployeeManagement,
};

interface StoreProps {
  /** instance of employee store */
  employeeStore: EmployeeStore;
}

type InjectedProps = StoreProps;

type EmployeeManagementProps = WithTranslation & Partial<InjectedProps>;
