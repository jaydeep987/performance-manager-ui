
export interface User {
  /** Unique ID of record */
  _id: string;
  /** Username */
  userName: string;
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** Sex */
  sex: string;
  /** Role of user */
  role: string;
  /** Token */
  token: string;
  /** Password, this cannot be in api response, but can be used when sending data to api */
  password?: string;
}

export const Roles = {
  Admin: 'admin',
  Normal: 'normal',
};

export const Sex = {
  Male: 'M',
  Female: 'F',
  Others: 'O',
};
