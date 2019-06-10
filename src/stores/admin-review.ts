import { action, observable } from 'mobx';
import { User } from '~model/user';

/**
 * Admin review store
 */
export class AdminReviewStore {
  /**
   * Store's initial state.
   * Use to reset after logout
   */
  private static readonly initialState = {
    employeeSelectPopupOpen: false,
    selectedEmployee: undefined,
    assigneePopupOpen: false,
  };

  /** Employee select popup's open/close state */
  @observable employeeSelectPopupOpen = AdminReviewStore.initialState.employeeSelectPopupOpen;

  /** Holds selected employee from popup */
  @observable selectedEmployee?: User = AdminReviewStore.initialState.selectedEmployee;

  /** Assignee popup's open/close state */
  @observable assigneePopupOpen = AdminReviewStore.initialState.assigneePopupOpen;

  /** Action to open employee select popup */
  @action openEmployeeSelectPopup(): void {
    this.employeeSelectPopupOpen = true;
  }

  /** Action to close employee select popup */
  @action closeEmployeeSelectPopup(): void {
    this.employeeSelectPopupOpen = false;
  }

  /** Action to open assignee popup */
  @action openAssigneePopup(): void {
    this.assigneePopupOpen = true;
  }

  /** Action to close assignee popup */
  @action closeAssigneePopup(): void {
    this.assigneePopupOpen = false;
  }

  /** Action to store selected employee */
  @action selectEmployee(selected: User): void {
    this.selectedEmployee = { ...selected };
  }

  /**
   * Resets store to initial state
   */
  @action resetStore(): void {
    this.employeeSelectPopupOpen = AdminReviewStore.initialState.employeeSelectPopupOpen;
    this.selectedEmployee = AdminReviewStore.initialState.selectedEmployee;
    this.assigneePopupOpen = AdminReviewStore.initialState.assigneePopupOpen;
  }
}

export const adminReviewStore = new AdminReviewStore();
