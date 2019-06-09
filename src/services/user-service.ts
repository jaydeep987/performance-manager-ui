import { Roles, User } from '~model/user';
import { cookies } from '~utils/cookies';
import { sendRequest } from '~utils/request';

/**
 * Service for user related things
 */
export const userService = {
  authenticate,
  getUserInfo,
  loadUsers,
  addNewUser,
  updateUser,
  deleteUser,
  removeUserInfo,
  logout,
  isLoggedIn,
  isAdmin,
};

/** Action which will call api to authenticate user get info */
async function authenticate(reqParams: AuthenticateReqParams): Promise<void> {
  const user = await sendRequest<User>({
    url: '/users/authenticate',
    data: reqParams,
    method: 'post',
  });

  if (user) {
    // set user info in cookie
    cookies.set('userInfo', user);
  }
}

/** This will load users from api */
async function loadUsers(): Promise<User[]> {
  const users = await sendRequest<User[]>({
    url: '/users/',
  });

  return users;
}

/**
 * This will add new user by calling api and passing data to it
 */
async function addNewUser(user: User): Promise<User> {
  const addedUser = await sendRequest<User>({
    url: '/users/register',
    data: user,
    method: 'post',
  });

  return addedUser;
}

/**
 * Updates user information
 */
async function updateUser(data: User): Promise<User> {
  const updatedUser = await sendRequest<User>({
    url: '/users/',
    data,
    method: 'put',
  });

  return updatedUser;
}

/**
 * Delete user information
 */
async function deleteUser(data: User): Promise<User> {
  const updatedUser = await sendRequest<User>({
    url: '/users/',
    data,
    method: 'delete',
  });

  return updatedUser;
}

/**
 * Logs out user.
 * Call API to invalidate token and remove info from cookie
 */
async function logout(): Promise<void> {
  removeUserInfo();

  await sendRequest({
    url: '/users/logout',
    method: 'post',
  });
}

/**
 * Gets user info from cookie
 */
function getUserInfo(): User {
  return cookies.get('userInfo');
}

/**
 * Removes user info from cookie
 */
function removeUserInfo(): void {
  cookies.remove('userInfo');
}

/**
 * Checks if user logged in
 */
function isLoggedIn(): boolean {
  return !!getUserInfo();
}

/**
 * Checks whether current user is admin or not
 */
function isAdmin(): boolean {
  const currentUser = getUserInfo();

  return currentUser && currentUser.role === Roles.Admin;
}

export interface AuthenticateReqParams {
  /** User name to login with */
  userName: string;
  /** Password of that user */
  password: string;
}
