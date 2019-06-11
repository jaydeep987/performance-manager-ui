import { Feedback } from '~model/feedback';
import { sendRequest } from '~utils/request';

/**
 * Service for managing feedbacks
 */
export const feedbackService = {
  loadFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};

/**
 * Loads feedbacks for particular review.
 */
async function loadFeedbacks(reviewId: string): Promise<Feedback[]> {
  const feedbacks = await sendRequest<Feedback[]>({
    url: '/feedbacks/',
    data: { reviewId },
    method: 'post',
  });

  return feedbacks;
}

/**
 * Creates new feedback for particular review.
 */
async function createFeedback(feedback: Omit<Feedback, '_id'>): Promise<Feedback> {
  const addedFeedback = await sendRequest<Feedback>({
    url: '/feedbacks/create',
    data: feedback,
    method: 'post',
  });

  return addedFeedback;
}

/**
 * Update feedback for particular review.
 */
async function updateFeedback(feedback: Feedback): Promise<Feedback> {
  const updatedFeedback = await sendRequest<Feedback>({
    url: '/feedbacks/',
    method: 'put',
    data: feedback,
  });

  return updatedFeedback;
}

/**
 * Deletes feedback
 */
async function deleteFeedback(feedback: Feedback): Promise<Feedback> {
  const deletedFeedback = await sendRequest<Feedback>({
    url: '/feedbacks/',
    method: 'delete',
    data: feedback,
  });

  return deletedFeedback;
}
