
export interface User {
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
  ADMIN: 'admin',
  NORMAL_USER: 'normal',
};
