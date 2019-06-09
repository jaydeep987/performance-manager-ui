export interface Feedback {
  /** Unique ID */
  _id: string;
  /** Feedback for review, that review ID */
  reviewId: string;
  /** Feedback by some employee, his ID */
  employeeId: string;
  /** Feedback itself */
  feedback: string;
}
