import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AssignedEmployee, Assignee } from '~model/assignee';
import { assigneeService } from '~services/assignee-service';

describe('Test: AssigneeService', () => {
  const assignees: Assignee[] = [
    {
      _id: '123',
      assignedEmployeeId: '1',
      assigneeId: '2',
    },
    {
      _id: '124',
      assignedEmployeeId: '2',
      assigneeId: '4',
    },
  ];
  const assignedEmployees: AssignedEmployee[] = [
    {
      _id: '1',
      assignedEmployeeId: '1',
      assigneeId: '2',
      firstName: 'test',
      lastName: 'test',
      userName: 'test',
      role: 'admin',
      sex: 'm',
    },
  ];
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(Axios);
  });

  it('should load assignees on call of loadAssignees', async () => {
    mockAxios.onPost('/assignees/').reply(200, assignees);

    const gotAssignees = await assigneeService.loadAssignees('1');
    expect(assignees).toStrictEqual(gotAssignees);
  });

  it('should throw an error on call of loadAssignees', async () => {
    const errorStr = 'Internal error';
    mockAxios.onPost('/assignees/').reply(500, errorStr);

    try {
      await assigneeService.loadAssignees('1');
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should load loadAssigned employees on call of loadAssignedEmployees', async () => {
    mockAxios.onPost('/assignees/assigned').reply(200, assignedEmployees);

    const gotAssigned = await assigneeService.loadAssignedEmployees('1');
    expect(assignedEmployees).toStrictEqual(gotAssigned);
  });

  it('should throw an error on call of loadAssignedEmployees', async () => {
    const errorStr = 'Internal error';
    mockAxios.onPost('/assignees/assigned').reply(500, errorStr);

    try {
      await assigneeService.loadAssignedEmployees('1');
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call create assignee api and get created assignee', async () => {
    const newAssignee = {
      _id: '55',
      assignedEmployeeId: '3',
      assigneeId: '6',
    };
    mockAxios.onPost('/assignees/create').reply(200, newAssignee);

    const gotCreated = await assigneeService.createAssignee(newAssignee);
    expect(newAssignee).toStrictEqual(gotCreated);
  });

  it('should throw an error on create assignee', async () => {
    const create = assignees[0];
    const errorStr = 'Internal error';
    mockAxios.onPost('/assignees/create').reply(500, errorStr);

    try {
      await assigneeService.createAssignee(create);
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call delete assignee api and get deleted assignee', async () => {
    const deleteAssignee = assignees[0];
    mockAxios.onDelete('/assignees/').reply(200, deleteAssignee);

    const gotDeleted = await assigneeService.deleteAssignee(deleteAssignee);
    expect(deleteAssignee).toStrictEqual(gotDeleted);
  });

  it('should throw an error on delete assignee', async () => {
    const deleteAssignee = assignees[0];
    const errorObj = { message: 'Bad request' };
    mockAxios.onDelete('/assignees/').reply(401, errorObj);

    try {
      await assigneeService.deleteAssignee(deleteAssignee);
    } catch (error) {
      expect(error.response.status).toStrictEqual(401);
      expect(error.response.data).toStrictEqual(errorObj);
    }
  });
});
