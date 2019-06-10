import { adminReviewStore } from './admin-review';
import { assigneeStore } from './assignees';
import { employeeReviewStore } from './employee-review';
import { employeeStore } from './employees';
import { feedbackStore } from './feedback';
import { reviewStore } from './review';
import { settingStore } from './settings';

export const stores = {
  settingStore,
  employeeStore,
  adminReviewStore,
  assigneeStore,
  feedbackStore,
  employeeReviewStore,
  reviewStore,
};

/**
 * Resets all stores
 * TODO: Find better solution for this (in each store)
 */
export function resetStores(): void {
  Object
    .values(stores)
    .forEach((store) => {
      store.resetStore();
    });
}
