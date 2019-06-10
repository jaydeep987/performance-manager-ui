import { action, observable } from 'mobx';
import { User } from '~model/user';

/**
 * Employee page review store
 */
export class EmployeeReviewStore {
  /**
   * Store's initial state.
   * Use to reset after logout
   */
  private static readonly initialState = {
    employeeSelectPopupOpen: false,
    selectedEmployee: undefined,
  };

  /** Employee select popup's open/close state */
  @observable employeeSelectPopupOpen = EmployeeReviewStore.initialState.employeeSelectPopupOpen;

  /** Holds selected employee from popup */
  @observable selectedEmployee?: User = EmployeeReviewStore.initialState.selectedEmployee;

  /** Action to open employee select popup */
  @action openEmployeeSelectPopup(): void {
    this.employeeSelectPopupOpen = true;
  }

  /** Action to close employee select popup */
  @action closeEmployeeSelectPopup(): void {
    this.employeeSelectPopupOpen = false;
  }

  /** Action to store selected employee */
  @action selectEmployee(selected: User): void {
    this.selectedEmployee = selected;
  }

  /**
   * Resets store to initial state
   */
  @action resetStore(): void {
    this.employeeSelectPopupOpen = EmployeeReviewStore.initialState.employeeSelectPopupOpen;
    this.selectedEmployee = EmployeeReviewStore.initialState.selectedEmployee;
  }
}

export const employeeReviewStore = new EmployeeReviewStore();
