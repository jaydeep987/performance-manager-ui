import i18next from 'i18next';
import { action, observable } from 'mobx';
import { Review, ReviewWithFeedbacks } from '~model/review';
import { User } from '~model/user';
import { LoadReviewQuery, reviewService } from '~services/review-service';
import { getApiErrorMessage } from '~utils/error-handle';

/**
 * Admin review store
 */
export class AdminReviewStore {
  /** Observalbe prop to hold employee data */
  @observable reviews: ReviewWithFeedbacks[] = [];

  /** Holds api error or other errors */
  @observable error = '';

  /** Employee select popup's open/close state */
  @observable employeeSelectPopupOpen = false;

  /** Holds selected employee from popup */
  @observable selectedEmployee?: User = undefined;

  /** Assignee popup's open/close state */
  @observable assigneePopupOpen = false;

  /** Translation function */
  private translate?: i18next.TFunction = undefined;

  /** Sets translation function */
  setTranslate(translate: i18next.TFunction): void {
    this.translate = translate;
  }

  /** Action to open employee select popup */
  @action openEmployeeSelectPopup(): void {
    this.employeeSelectPopupOpen = true;
  }

  /** Action to close employee select popup */
  @action closeEmployeeSelectPopup(): void {
    this.employeeSelectPopupOpen = false;
  }

  /** Action to open assignee popup */
  @action openAssigneePopup(): void {
    this.assigneePopupOpen = true;
  }

  /** Action to close assignee popup */
  @action closeAssigneePopup(): void {
    this.assigneePopupOpen = false;
  }

  /** Action to store selected employee */
  @action selectEmployee(selected: User): void {
    this.selectedEmployee = selected;
  }

  /** Loads reviews with feedbacks */
  @action loadReviews(query: LoadReviewQuery): Promise<void> {
    this.error = '';

    return reviewService
      .loadReviews(query)
      .then((reviews) => {
        this.reviews = reviews;
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      });
  }

  /** Create new review for some employee */
  @action createReview(review: Omit<Review, '_id'>): Promise<void> {
    this.error = '';

    return reviewService
      .createReview(review)
      .then((addedReview) => {
        this.reviews = [...this.reviews, ...[addedReview]];
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      });
  }

  /** Updates review for some employee */
  @action updateReview(review: Review): Promise<void> {
    this.error = '';

    return reviewService
      .updateReview(review)
      .then((updatedReview) => {
        const foundIndex = this.reviews.findIndex((freview) => freview._id === review._id);
        this.reviews = [
          ...this.reviews.slice(0, foundIndex),
          {
            ...updatedReview,
            feedbacks: this.reviews[foundIndex].feedbacks,
          },
          ...this.reviews.slice(foundIndex + 1),
        ];
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      });
  }

  /** Deletes review of some employee */
  @action deleteReview(review: Review): Promise<void> {
    this.error = '';

    return reviewService
      .deleteReview(review)
      .then(() => {
        this.reviews = [...this.reviews.filter((freview) => freview._id !== review._id)];
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      });
  }
}

export const adminReviewStore = new AdminReviewStore();
