import i18next from 'i18next';
import { action, observable } from 'mobx';
import { Feedback } from '~model/feedback';
import { ReviewWithFeedbacks } from '~model/review';
import { feedbackService } from '~services/feedback-service';
import { LoadReviewQuery, reviewService } from '~services/review-service';
import { getApiErrorMessage } from '~utils/error-handle';

/**
 * Employee feedback store
 */
export class FeedbackStore {
  /**
   * Store's initial state.
   * Use to reset after logout
   */
  private static readonly initialState = {
    reviews: [],
    error: '',
    translate: undefined,
  };

  /** Observalbe prop to hold employee reviews and feedbacks */
  @observable reviews: ReviewWithFeedbacks[] = FeedbackStore.initialState.reviews;

  /** Holds api error or other errors */
  @observable error = FeedbackStore.initialState.error;

  /** Translation function */
  private translate?: i18next.TFunction = FeedbackStore.initialState.translate;

  /** Sets translation function */
  setTranslate(translate: i18next.TFunction): void {
    this.translate = translate;
  }

  /** Find review from stored reviews by matching feedback's reviewId */
  findReviewComparator = (feedbackReviewId: string) => (review: ReviewWithFeedbacks) => review._id === feedbackReviewId;

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

  /** Create new feedback for some review */
  @action createFeedback(feedback: Omit<Feedback, '_id'>): Promise<void> {
    this.error = '';

    return feedbackService
      .createFeedback(feedback)
      .then((addedFeedback) => {
        // Copy reviews to avoid updating refs
        const reviews = [...this.reviews];
        // Find review for which feedback was added
        const foundReview = reviews.find(this.findReviewComparator(feedback.reviewId));
        // Add feedback in its feedbacks
        (foundReview as ReviewWithFeedbacks).feedbacks.unshift(addedFeedback);
        // Update store
        this.reviews = [...reviews];
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      });
  }

  /** Updates feedback of some review */
  @action updateFeedback(feedback: Feedback): Promise<void> {
    this.error = '';

    return feedbackService
      .updateFeedback(feedback)
      .then((updatedFeedback) => {
        // Copy reviews
        const reviews = [...this.reviews];
        // Find review for which feedback was added
        const foundReview = reviews.find(this.findReviewComparator(feedback.reviewId)) as ReviewWithFeedbacks;
        // Now from feedbacks of that review find feedback to update
        const foundIndex = foundReview
          .feedbacks
          .findIndex((findFeedbak) => findFeedbak._id === feedback._id);
        // Now update feedback in array
        foundReview.feedbacks = [
          ...foundReview.feedbacks.slice(0, foundIndex),
          {
            ...updatedFeedback,
          },
          ...foundReview.feedbacks.slice(foundIndex + 1),
        ];
        // Update store
        this.reviews = [...reviews];
      })
      .catch((error) => {
        this.error = getApiErrorMessage({ error, translate: this.translate as i18next.TFunction });
        throw error;
      });
  }

  /** Deletes feedback of some review */
  @action deleteFeedback(feedback: Feedback): Promise<void> {
    this.error = '';

    return feedbackService
      .deleteFeedback(feedback)
      .then(() => {
        // Copy reviews
        const reviews = [...this.reviews];
        // Find review for which feedback was added
        const foundReview = reviews.find(this.findReviewComparator(feedback.reviewId)) as ReviewWithFeedbacks;
        foundReview.feedbacks = [...foundReview.feedbacks.filter((findFeedback) => findFeedback._id !== feedback._id)];
        // Update store
        this.reviews = [...reviews];
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
    this.reviews = FeedbackStore.initialState.reviews;
    this.error = FeedbackStore.initialState.error;
    this.translate = FeedbackStore.initialState.translate;
  }
}

export const feedbackStore = new FeedbackStore();
