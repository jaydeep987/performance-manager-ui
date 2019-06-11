import sinon from 'sinon';
import { User } from '~model/user';
import { userService } from '~services/user-service';

import { EmployeeStore } from '../employees';

describe('Test Store: EmployeeStore', () => {
  let employeeStore: EmployeeStore;
  let sandbox: sinon.SinonSandbox;
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

  beforeEach(() => {
    employeeStore = new EmployeeStore();
    employeeStore.setTranslate(spiedTranslation());
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /**
   * Initial values of store checks
   */
  function initialCheck(): void {
    expect(employeeStore.employees).toStrictEqual([]);
    expect(employeeStore.error).toStrictEqual('');
  }

  /** translation function spied! */
  // tslint:disable-next-line:no-any
  function spiedTranslation(): sinon.SinonSpy<any> {
    return sinon.spy((str) => str);
  }

  function loadUsers(): void {
    const promiseResolved = new Promise<User[]>((resolve) => {
      resolve(users);
    });
    sandbox.stub(userService, 'loadUsers').returns(promiseResolved);
  }

  it('should have props with default values', () => {
    initialCheck();
  });

  it('should load users on action call', async () => {
    loadUsers();

    expect(employeeStore.employees).toStrictEqual([]);
    await employeeStore.loadUsers();

    expect(employeeStore.employees).toStrictEqual(users);
  });

  it('should set error on calling action to load users', async () => {
    const promiseResolved = new Promise<User[]>((_1, reject) => {
      reject('some error');
    });

    sandbox.stub(userService, 'loadUsers').returns(promiseResolved);
    expect(employeeStore.employees).toStrictEqual([]);

    try {
      await employeeStore.loadUsers();
    } catch (error) {
      expect(employeeStore.employees).toStrictEqual([]);
      expect(employeeStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should create new user on action call', async () => {
    const newUser: User = {
      _id: 'aa',
      firstName: 'new',
      lastName: 'new',
      sex: 'm',
      role: 'normal',
      userName: 'new',
      password: 'abc',
    };
    const promiseResolved = new Promise<User>((resolve) => {
      resolve({_id: 'new', ...newUser});
    });

    sandbox.stub(userService, 'addNewUser').returns(promiseResolved);

    // first load some user
    loadUsers();
    await employeeStore.loadUsers();
    expect(employeeStore.employees).toStrictEqual(users);

    await employeeStore.addNewUser(newUser);
    expect(employeeStore.employees).toStrictEqual([...users, ...[{_id: 'new', ...newUser}]]);
  });

  it('should give error on create new user on action call', async () => {
    const newUser: User = {
      _id: 'aa',
      firstName: 'new',
      lastName: 'new',
      sex: 'm',
      role: 'normal',
      userName: 'new',
      password: 'abc',
    };
    const promiseResolved = new Promise<User>((_1, reject) => {
      reject('creation error');
    });

    sandbox.stub(userService, 'addNewUser').returns(promiseResolved);

    // first load some users
    loadUsers();
    await employeeStore.loadUsers();
    expect(employeeStore.employees).toStrictEqual(users);

    try {
      await employeeStore.addNewUser(newUser);
    } catch (error) {
      // store should be unaffected
      expect(employeeStore.employees).toStrictEqual(users);
      expect(employeeStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should update current user on action call', async () => {
    const updateUser: User = {
     ...{...users[0]},
     firstName: 'updating',
    };
    const promiseResolved = new Promise<User>((resolve) => {
      resolve(updateUser);
    });

    sandbox.stub(userService, 'updateUser').returns(promiseResolved);

    // first load some user
    loadUsers();
    await employeeStore.loadUsers();
    expect(employeeStore.employees).toStrictEqual(users);

    await employeeStore.updateUser(updateUser, users[0]);
    // should update in-place
    expect(employeeStore.employees).toStrictEqual([...[updateUser], ...[users[1]]]);
  });

  it('should give an error on update current user', async () => {
    const updateUser: User = {
     ...{...users[0]},
     firstName: 'updating',
    };
    const promiseResolved = new Promise<User>((resolve) => {
      resolve(updateUser);
    });

    sandbox.stub(userService, 'updateUser').returns(promiseResolved);

    // first load some user
    loadUsers();
    await employeeStore.loadUsers();
    expect(employeeStore.employees).toStrictEqual(users);

    try {
      await employeeStore.updateUser(updateUser, users[0]);
    } catch (error) {
      // store should be unaffected
      expect(employeeStore.employees).toStrictEqual(users);
      expect(employeeStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should give missing id validation error on delete', async () => {
    const promiseResolved = new Promise<User>((resolve) => {
      resolve(users[0]);
    });

    sandbox.stub(userService, 'deleteUser').returns(promiseResolved);

    // first load some user
    loadUsers();
    await employeeStore.loadUsers();
    expect(employeeStore.employees).toStrictEqual(users);

    try {
      const { _id, ...noId } = users[0];
      // tslint:disable-next-line
      // @ts-ignore
      await employeeStore.deleteUser(noId);
    } catch (err) {
      // store should be unaffected
      expect(employeeStore.employees).toStrictEqual(users);
      expect(employeeStore.error).toStrictEqual('employee.delete.missingId');
    }
  });

  it('should delete user on action call', async () => {
    const promiseResolved = new Promise<User>((resolve) => {
      resolve(users[0]);
    });

    sandbox.stub(userService, 'deleteUser').returns(promiseResolved);

    // first load some user
    loadUsers();
    await employeeStore.loadUsers();
    expect(employeeStore.employees).toStrictEqual(users);

    await employeeStore.deleteUser(users[0]);
    expect(employeeStore.employees).toStrictEqual([...[users[1]]]);
  });

  it('should give error on delete user', async () => {
    const promiseResolved = new Promise<User>((_1, reject) => {
      reject('delete error');
    });

    sandbox.stub(userService, 'deleteUser').returns(promiseResolved);

    // first load some user
    loadUsers();
    await employeeStore.loadUsers();
    expect(employeeStore.employees).toStrictEqual(users);

    try {
      await employeeStore.deleteUser(users[0]);
    } catch (error) {
      // store should be unaffected
      expect(employeeStore.employees).toStrictEqual(users);
      expect(employeeStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should reset store on call of reset', () => {
    employeeStore.resetStore();

    initialCheck();
  });
});
