import i18next from 'i18next';
import { action, observable } from 'mobx';
import { User } from '~model/user';
import { userService } from '~services/user-service';
import { ValidationResult } from '~types/validator';
import { getApiErrorMessage } from '~utils/error-handle';

/**
 * Employee store
 */
export class EmployeeStore {
  /**
   * Store's initial state.
   * Use to reset after logout
   */
  private static readonly initialState = {
    employees: [],
    error: '',
    translate: undefined,
  };

  /** Observalbe prop to hold employee data */
  @observable employees: User[] = EmployeeStore.initialState.employees;

  /** Hold error message */
  @observable error = EmployeeStore.initialState.error;

  /** Translation function */
  private translate?: i18next.TFunction = EmployeeStore.initialState.translate;

  /** Sets translation function */
  setTranslate(translate: i18next.TFunction): void {
    this.translate = translate;
  }

  /** Action which will fetch all users using service and set in store */
  @action loadUsers(): Promise<void> {
    this.error = '';

    return userService
      .loadUsers()
      .then((users: User[]) => {
        this.employees = users;
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      });
  }

  /** Action to add new user */
  @action addNewUser(user: User, validator?: Validator): Promise<void> {
    this.error = '';
    if (typeof validator === 'function') {
      const validationResult = validator(user);

      if (!validationResult.isValid) {
        this.error = validationResult.message as string;

        return new Promise<void>((_1, reject) => { reject(); });
      }
    }

    return userService
      .addNewUser(user)
      .then((addedUser: User) => {
        this.employees = [...this.employees, ...[addedUser]];
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      });
  }

  /** Action to update user data */
  @action updateUser(newData: User, oldData: User, validator?: Validator): Promise<void> {
    this.error = '';

    if (typeof validator === 'function') {
      const validationResult = validator(newData);

      if (!validationResult.isValid) {
        this.error = validationResult.message as string;

        return new Promise<void>((_1, reject) => { reject(); });
      }
    }

    return userService
      .updateUser({ ...newData, _id: oldData._id })
      .then((updatedUser: User) => {
        const foundIndex = this.employees.findIndex((user) => user._id === oldData._id);
        this.employees = [
          ...this.employees.slice(0, foundIndex),
          ...[updatedUser],
          ...this.employees.slice(foundIndex + 1),
        ];
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      });
  }

  /** Action to delete user data by id */
  @action deleteUser(data: User): Promise<void> {
    this.error = '';

    if (!data._id) {
      this.error = (this.translate as i18next.TFunction)('employee.delete.missingId');

      return new Promise<void>((_1, reject) => { reject(); });
    }

    return userService
      .deleteUser(data)
      .then(() => {
        this.employees = [...this.employees.filter((user: User) => user._id !== data._id)];
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      });
  }

  /**
   * Resets store to initial state
   */
  @action resetStore(): void {
    this.employees = EmployeeStore.initialState.employees;
    this.error = EmployeeStore.initialState.error;
    this.translate = EmployeeStore.initialState.translate;
  }
}

type Validator = (data: User) => ValidationResult;

export const employeeStore = new EmployeeStore();
