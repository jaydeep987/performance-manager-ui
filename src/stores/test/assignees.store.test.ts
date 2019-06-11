import sinon from 'sinon';
import { AssignedEmployee, Assignee } from '~model/assignee';
import { assigneeService } from '~services/assignee-service';

import { AssigneeStore } from '../assignees';

describe('Test Store: AssigneeStore', () => {
  let assigneeStore: AssigneeStore;
  let sandbox: sinon.SinonSandbox;
  const assignee: Assignee[] = [{
    _id: 'test',
    assigneeId: 'mocked',
    assignedEmployeeId: '1',
  },                            {
    _id: 'test2',
    assigneeId: 'mocked2',
    assignedEmployeeId: '2',
  }];
  const assignedEmployee: AssignedEmployee[] = [{
    _id: '1',
    assignedEmployeeId: '1',
    assigneeId: '2',
    firstName: 'test',
    lastName: 'test',
    userName: 'test',
    role: 'admin',
    sex: 'm',
  }];

  beforeEach(() => {
    assigneeStore = new AssigneeStore();
    assigneeStore.setTranslate(spiedTranslation());
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /**
   * Initial values of store checks
   */
  function initialCheck(): void {
    expect(assigneeStore.assignees).toStrictEqual([]);
    expect(assigneeStore.assignedEmployees).toStrictEqual([]);
    expect(assigneeStore.error).toStrictEqual('');
    expect(assigneeStore.loading).toBeFalsy();
  }

  /** translation function spied! */
  // tslint:disable-next-line:no-any
  function spiedTranslation(): sinon.SinonSpy<any> {
    return sinon.spy((str) => str);
  }

  function loadAssignee(): void {
    const promiseResolved = new Promise<Assignee[]>((resolve) => {
      resolve(assignee);
    });
    sandbox.stub(assigneeService, 'loadAssignees').returns(promiseResolved);
  }

  it('should have props with default values', () => {
    initialCheck();
  });

  it('should load assignees on action call', async () => {
    loadAssignee();

    expect(assigneeStore.assignees).toStrictEqual([]);
    await assigneeStore.loadAssignees('1');

    expect(assigneeStore.assignees).toStrictEqual(assignee);
  });

  it('should set error on calling action to load assignees', async () => {
    const promiseResolved = new Promise<Assignee[]>((_1, reject) => {
      reject('some error');
    });

    sandbox.stub(assigneeService, 'loadAssignees').returns(promiseResolved);
    expect(assigneeStore.assignees).toStrictEqual([]);

    try {
      await assigneeStore.loadAssignees('1');
    } catch (error) {
      expect(assigneeStore.assignees).toStrictEqual([]);
      expect(assigneeStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should load assigned employees on action call', async () => {
    const promiseResolved = new Promise<AssignedEmployee[]>((resolve) => {
      resolve(assignedEmployee);
    });

    sandbox.stub(assigneeService, 'loadAssignedEmployees').returns(promiseResolved);
    expect(assigneeStore.assignedEmployees).toStrictEqual([]);

    await assigneeStore.loadAssignedEmployees('1');
    expect(assigneeStore.assignedEmployees).toStrictEqual(assignedEmployee);
    expect(assigneeStore.loading).toBeFalsy();
  });

  it('should give error on loadAssignedEmployees call', async () => {
    const promiseResolved = new Promise<AssignedEmployee[]>((_1, reject) => {
      reject('some error');
    });

    sandbox.stub(assigneeService, 'loadAssignedEmployees').returns(promiseResolved);

    expect(assigneeStore.assignedEmployees).toStrictEqual([]);

    try {
      await assigneeStore.loadAssignedEmployees('1');
    } catch (error) {
      expect(assigneeStore.assignedEmployees).toStrictEqual([]);
      expect(assigneeStore.error).toStrictEqual('errorMessage.systemError');
      expect(assigneeStore.loading).toBeFalsy();
    }
  });

  it('should create new assignee on action call', async () => {
    const newAssignee: Omit<Assignee, '_id'> = {
      assigneeId: 'mockedNew',
      assignedEmployeeId: '2',
    };
    const promiseResolved = new Promise<Assignee>((resolve) => {
      resolve({_id: 'new', ...newAssignee});
    });

    sandbox.stub(assigneeService, 'createAssignee').returns(promiseResolved);

    // first load some assignee
    loadAssignee();
    await assigneeStore.loadAssignees('1');
    expect(assigneeStore.assignees).toStrictEqual(assignee);
    expect(assigneeStore.loading).toBeFalsy();

    await assigneeStore.createAssignee(newAssignee);
    expect(assigneeStore.assignees).toStrictEqual([...assignee, ...[{_id: 'new', ...newAssignee}]]);
    expect(assigneeStore.loading).toBeFalsy();
  });

  it('should give error on create new assignee on action call', async () => {
    const newAssignee: Omit<Assignee, '_id'> = {
      assigneeId: 'mockedNew',
      assignedEmployeeId: '2',
    };
    const promiseResolved = new Promise<Assignee>((_1, reject) => {
      reject('creation error');
    });

    sandbox.stub(assigneeService, 'createAssignee').returns(promiseResolved);

    // first load some assignee
    loadAssignee();
    await assigneeStore.loadAssignees('1');
    expect(assigneeStore.assignees).toStrictEqual(assignee);
    expect(assigneeStore.loading).toBeFalsy();

    try {
      await assigneeStore.createAssignee(newAssignee);
    } catch (error) {
      // store should be unaffected
      expect(assigneeStore.assignees).toStrictEqual(assignee);
      expect(assigneeStore.loading).toBeFalsy();
      expect(assigneeStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should delete assignee on action call', async () => {
    const promiseResolved = new Promise<Assignee>((resolve) => {
      resolve(assignee[0]);
    });

    sandbox.stub(assigneeService, 'deleteAssignee').returns(promiseResolved);

    // first load some assignee
    loadAssignee();
    await assigneeStore.loadAssignees('1');
    expect(assigneeStore.assignees).toStrictEqual(assignee);
    expect(assigneeStore.loading).toBeFalsy();

    await assigneeStore.deleteAssignee(assignee[0]);
    expect(assigneeStore.assignees).toStrictEqual([...[assignee[1]]]);
    expect(assigneeStore.loading).toBeFalsy();
  });

  it('should reset store on call of reset', () => {
    assigneeStore.resetStore();

    initialCheck();
  });
});
