import { Review, ReviewWithFeedbacks } from '~model/review';
import { sendRequest } from '~utils/request';

/**
 * Service for review related things
 */
export const reviewService = {
  loadReviews,
  createReview,
  updateReview,
  deleteReview,
};

/**
 * Load all reviews for particular employee.
 * Also can filter by person who added review.
 */
async function loadReviews(query: LoadReviewQuery): Promise<ReviewWithFeedbacks[]> {
  const reviews = await sendRequest<ReviewWithFeedbacks[]>({
    url: '/reviews/',
    data: query,
    method: 'post',
  });

  return reviews;
}

export interface LoadReviewQuery {
  /** Review create/updated by id */
  updatedBy?: string;
  /** Id of employee */
  employeeId: string;
}

/**
 * Add new review for particular employee.
 * Needs review writer's ID.
 */
async function createReview(review: Omit<Review, '_id'>): Promise<ReviewWithFeedbacks> {
  const addedReview = await sendRequest<ReviewWithFeedbacks>({
    url: '/reviews/create',
    data: review,
    method: 'post',
  });

  return addedReview;
}

/**
 * Updates review for particular employee.
 * Needs review writer's ID.
 */
async function updateReview(review: Review): Promise<ReviewWithFeedbacks> {
  const updatedReview = await sendRequest<ReviewWithFeedbacks>({
    url: '/reviews/',
    data: review,
    method: 'put',
  });

  return updatedReview;
}

/**
 * Delete review for particular employee.
 */
async function deleteReview(review: Review): Promise<ReviewWithFeedbacks> {
  const deletedReview = await sendRequest<ReviewWithFeedbacks>({
    url: '/reviews/',
    data: review,
    method: 'delete',
  });

  return deletedReview;
}
