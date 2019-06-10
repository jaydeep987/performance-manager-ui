import { User } from './user';

export interface Assignee {
  /** Unique ID */
  _id: string;
  /**
   * ID of employee who is assigned to "assignedEmployeeId", so that he can
   * review for "assignedEmployeeId".
   */
  assigneeId: string;
  /** ID of employee to whom the employess will be assigned */
  assignedEmployeeId: string;
  /** Info like Name of Assignee */
  assigneeInfo?: User[];
}

export interface AssignedEmployee extends Omit<User, 'password'> {
  /** Unique ID */
  _id: string;
  /**
   * ID of employee who is assigned to "assignedEmployeeId", so that he can
   * review for "assignedEmployeeId".
   */
  assigneeId: string;
  /** ID of employee to whom the employess will be assigned */
  assignedEmployeeId: string;
}
