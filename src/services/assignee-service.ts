import { AssignedEmployee, Assignee } from '~model/assignee';
import { sendRequest } from '~utils/request';

/**
 * Service for managing assignees
 */
export const assigneeService = {
  loadAssignees,
  loadAssignedEmployees,
  createAssignee,
  deleteAssignee,
};

/**
 * Loads assignees of some employee.
 */
async function loadAssignees(assignedEmployeeId: string): Promise<Assignee[]> {
  const assignees = await sendRequest<Assignee[]>({
    url: '/assignees/',
    data: { assignedEmployeeId },
    method: 'post',
  });

  return assignees;
}

/**
 * Loads assigned employees to given assignee.
 */
async function loadAssignedEmployees(assigneeId: string): Promise<AssignedEmployee[]> {
  const assignees = await sendRequest<AssignedEmployee[]>({
    url: '/assignees/assigned',
    data: { assigneeId },
    method: 'post',
  });

  return assignees;
}

/**
 * Creates new assignee for some employee.
 * So that assignee can participate in some employees' review process.
 */
async function createAssignee(assignee: Omit<Assignee, 'userInfo' | '_id'>): Promise<Assignee> {
  const addedAssignee = await sendRequest<Assignee>({
    url: '/assignees/create',
    data: assignee,
    method: 'post',
  });

  return addedAssignee;
}

/**
 * Deletes assignee of some employee.
 */
async function deleteAssignee(assignee: Omit<Assignee, 'userInfo'>): Promise<Assignee> {
  const deletedAssignee = await sendRequest<Assignee>({
    url: '/assignees/',
    method: 'delete',
    data: assignee,
  });

  return deletedAssignee;
}
