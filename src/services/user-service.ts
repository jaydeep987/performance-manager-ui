import { Roles, User } from '~model/user';
import { cookies } from '~utils/cookies';
import { sendRequest } from '~utils/request';

/**
 * Service for user related things
 */
export const userService = {
  authenticate,
  getUserInfo,
  removeUserInfo,
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

  return currentUser && currentUser.role === Roles.ADMIN;
}

export interface AuthenticateReqParams {
  /** User name to login with */
  userName: string;
  /** Password of that user */
  password: string;
}
