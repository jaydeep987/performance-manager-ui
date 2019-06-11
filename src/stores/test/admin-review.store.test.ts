import { User } from '~model/user';

import { AdminReviewStore } from '../admin-review';

describe('Test Store: AdminReviewStore', () => {
  let adminReviewStore: AdminReviewStore;
  const user: User = {
    _id: 'test',
    userName: 'test',
    lastName: 'test',
    sex: 'm',
    firstName: 'test',
    role: 'admin',
  };

  beforeAll(() => {
    adminReviewStore = new AdminReviewStore();
  });

  it('should have props with default values', () => {
    expect(adminReviewStore.employeeSelectPopupOpen).toBeFalsy();
    expect(adminReviewStore.selectedEmployee).toBeUndefined();
    expect(adminReviewStore.assigneePopupOpen).toBeFalsy();
  });

  it('should update employeeSelectPopupOpen prop on action call', () => {
    expect(adminReviewStore.employeeSelectPopupOpen).toBeFalsy();
    adminReviewStore.openEmployeeSelectPopup();
    expect(adminReviewStore.employeeSelectPopupOpen).toBeTruthy();
    adminReviewStore.closeEmployeeSelectPopup();
    expect(adminReviewStore.employeeSelectPopupOpen).toBeFalsy();
  });

  it('should update assigneePopupOpen prop on action call', () => {
    expect(adminReviewStore.assigneePopupOpen).toBeFalsy();
    adminReviewStore.openAssigneePopup();
    expect(adminReviewStore.assigneePopupOpen).toBeTruthy();
    adminReviewStore.closeAssigneePopup();
    expect(adminReviewStore.assigneePopupOpen).toBeFalsy();
  });

  it('should update selected employee action call', () => {
    expect(adminReviewStore.selectedEmployee).toBeUndefined();
    adminReviewStore.selectEmployee(user);
    expect(adminReviewStore.selectedEmployee).toStrictEqual(user);
  });

  it('should reset store on call of reset', () => {
    adminReviewStore.openAssigneePopup();
    adminReviewStore.openEmployeeSelectPopup();
    adminReviewStore.selectEmployee(user);

    adminReviewStore.resetStore();

    expect(adminReviewStore.employeeSelectPopupOpen).toBeFalsy();
    expect(adminReviewStore.selectedEmployee).toBeUndefined();
    expect(adminReviewStore.assigneePopupOpen).toBeFalsy();
  });
});
