import i18next from 'i18next';
import { action, observable } from 'mobx';
import { Review, ReviewWithFeedbacks } from '~model/review';
import { LoadReviewQuery, reviewService } from '~services/review-service';
import { getApiErrorMessage } from '~utils/error-handle';

/**
 * Review store
 */
export class ReviewStore {
  /**
   * Store's initial state.
   * Use to reset after logout
   */
  private static readonly initialState = {
    reviews: [],
    error: '',
    translate: undefined,
  };

  /** Observalbe prop to hold employee data */
  @observable reviews: ReviewWithFeedbacks[] = [];

  /** Holds api error or other errors */
  @observable error = '';

  /** Translation function */
  private translate?: i18next.TFunction = undefined;

  /** Sets translation function */
  setTranslate(translate: i18next.TFunction): void {
    this.translate = translate;
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

  /**
   * Resets store to initial state
   */
  @action resetStore(): void {
    this.reviews = ReviewStore.initialState.reviews;
    this.error = ReviewStore.initialState.error;
    this.translate = ReviewStore.initialState.translate;
  }
}

export const reviewStore = new ReviewStore();
