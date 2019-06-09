import i18next from 'i18next';
import { action, observable } from 'mobx';
import { Assignee } from '~model/assignee';
import { assigneeService } from '~services/assignee-service';
import { getApiErrorMessage } from '~utils/error-handle';

/**
 * Assignee store
 */
export class AssigneeStore {
  /** Observalbe prop to hold assignee data */
  @observable assignees: Assignee[] = [];

  /** Holds api error or other errors */
  @observable error = '';

  /** During fetch, show loading */
  @observable loading = false;

  /** Translation function */
  private translate?: i18next.TFunction = undefined;

  /** Sets translation function */
  setTranslate(translate: i18next.TFunction): void {
    this.translate = translate;
  }

  /** Loads assignees of some employee */
  @action loadAssignees(assignedEmployeeId: string): Promise<void> {
    this.error = '';
    this.loading = true;

    return assigneeService
      .loadAssignees(assignedEmployeeId)
      .then((assignees) => {
        this.assignees = assignees;
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  /** Create new assignee for some employee */
  @action createAssignee(assignee: Omit<Assignee, '_id'>): Promise<void> {
    this.error = '';
    this.loading = true;

    return assigneeService
      .createAssignee(assignee)
      .then((addedAssignee) => {
        this.assignees = [...this.assignees, ...[addedAssignee]];
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  /** Deletes assignee of some employee */
  @action deleteAssignee(assignee: Assignee): Promise<void> {
    this.error = '';
    this.loading = true;

    return assigneeService
      .deleteAssignee(assignee)
      .then(() => {
        this.assignees = [...this.assignees.filter((fassignee) => fassignee._id !== assignee._id)];
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  /** Clears store */
  @action clearStore(): void {
    this.assignees = [];
    this.error = '';
    this.loading = false;
  }
}

export const assigneeStore = new AssigneeStore();
