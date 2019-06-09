import { Feedback } from './feedback';

export interface Review {
  /** Unique ID */
  _id: string;
  /** Review description */
  description: string;
  /** Review written by someone, his ID */
  updatedBy: string;
  /** Review written for someone, his ID */
  employeeId: string;
}

export interface ReviewWithFeedbacks extends Review {
  /** Feedbacks of review */
  feedbacks: Feedback[];
}
