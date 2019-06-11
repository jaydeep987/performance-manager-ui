
import { User } from '~model/user';

import { EmployeeReviewStore } from '../employee-review';

describe('Test Store: EmployeeReviewStore', () => {
  let employeeReview: EmployeeReviewStore;
  const user: User = {
    _id: 'test',
    userName: 'test',
    lastName: 'test',
    sex: 'm',
    firstName: 'test',
    role: 'admin',
  };

  beforeEach(() => {
    employeeReview = new EmployeeReviewStore();
  });

  it('should have props with default values', () => {
    expect(employeeReview.employeeSelectPopupOpen).toBeFalsy();
    expect(employeeReview.selectedEmployee).toBeUndefined();
  });

  it('should update employeeSelectPopupOpen prop on action call', () => {
    expect(employeeReview.employeeSelectPopupOpen).toBeFalsy();
    employeeReview.openEmployeeSelectPopup();
    expect(employeeReview.employeeSelectPopupOpen).toBeTruthy();
    employeeReview.closeEmployeeSelectPopup();
    expect(employeeReview.employeeSelectPopupOpen).toBeFalsy();
  });

  it('should update selected employee action call', () => {
    expect(employeeReview.selectedEmployee).toBeUndefined();
    employeeReview.selectEmployee(user);
    expect(employeeReview.selectedEmployee).toStrictEqual(user);
  });

  it('should reset store on call of reset', () => {
    employeeReview.openEmployeeSelectPopup();
    employeeReview.selectEmployee(user);

    employeeReview.resetStore();

    expect(employeeReview.employeeSelectPopupOpen).toBeFalsy();
    expect(employeeReview.selectedEmployee).toBeUndefined();
  });
});
