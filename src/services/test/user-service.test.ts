import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { User } from '~model/user';
import { userService } from '~services/user-service';
import { cookies } from '~utils/cookies';

describe('Test: UserService', () => {
  const users: User[] = [{
    _id: 'test',
    firstName: 'somet',
    lastName: 'ere',
    sex: 'm',
    role: 'admin',
    userName: 'usaaa',
    password: 'abc',
  },                     {
    _id: 'test2',
    firstName: 'werwr',
    lastName: 'xbxvx',
    sex: 'm',
    role: 'normal',
    userName: 'ppp',
    password: 'abc',
  }];
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(Axios);
  });

  it('should load users on call of loadUsers', async () => {
    mockAxios.onGet('/users/').reply(200, users);

    const gotData = await userService.loadUsers();
    expect(users).toStrictEqual(gotData);
  });

  it('should throw an error on call of loadReviews', async () => {
    const errorStr = 'Internal error';
    mockAxios.onGet('/users/').reply(500, errorStr);

    try {
      await userService.loadUsers();
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call create user api and get created user', async () => {
    const newData = {
      _id: 'test4',
      firstName: 'new',
      lastName: 'new',
      sex: 'm',
      role: 'normal',
      userName: 'new',
      password: 'new',
    };
    mockAxios.onPost('/users/register').reply(200, newData);

    const gotCreated = await userService.addNewUser(newData);
    expect(newData).toStrictEqual(gotCreated);
  });

  it('should throw an error on create review', async () => {
    const create = users[0];
    const errorStr = 'Internal error';
    mockAxios.onPost('/users/register').reply(500, errorStr);

    try {
      await userService.addNewUser(create);
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call update user api and get updated user', async () => {
    const updated = {
      ...users[0],
      firstName: 'updated name',
    };
    mockAxios.onPut('/users/').reply(200, updated);

    const gotUpdated = await userService.updateUser(updated);
    expect(updated).toStrictEqual(gotUpdated);
  });

  it('should throw an error on call update user api', async () => {
    const errorStr = 'Internal error';
    const updated = {
      ...users[0],
      firstName: 'updated name',
    };
    mockAxios.onPut('/users/').reply(500, errorStr);

    try {
      await userService.updateUser(updated);
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call delete user api and get deleted user', async () => {
    const deleted = users[0];
    mockAxios.onDelete('/users/').reply(200, deleted);

    const gotDeleted = await userService.deleteUser(deleted);
    expect(deleted).toStrictEqual(gotDeleted);
  });

  it('should throw an error on delete user', async () => {
    const deleted = users[0];
    const errorObj = { message: 'Bad request' };
    mockAxios.onDelete('/users/').reply(401, errorObj);

    try {
      await userService.deleteUser(deleted);
    } catch (error) {
      expect(error.response.status).toStrictEqual(401);
      expect(error.response.data).toStrictEqual(errorObj);
    }
  });

  it('should call logout api and no response and no error', async () => {
    mockAxios.onPost('/users/logout').reply(200, {});

    try {
      await userService.logout();
    } catch (error) {
      console.log(error);
    }
  });

  it('should call authentication api and put user in cookie', async () => {
    mockAxios.onPost('/users/authenticate').reply(200, users[0]);

    await userService.authenticate({
      userName: 'usaa',
      password: 'abc',
    });

    // check cookie
    expect(cookies.get('userInfo')).toStrictEqual(users[0]);

    // remove info, cleanup!
    cookies.remove('userInfo');
  });
});
