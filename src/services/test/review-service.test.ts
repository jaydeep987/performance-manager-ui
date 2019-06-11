import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ReviewWithFeedbacks } from '~model/review';
import { reviewService } from '~services/review-service';

describe('Test: ReviewService', () => {
  const reviews: ReviewWithFeedbacks[] = [{
    _id: 'test',
    description: 'review1',
    updatedBy: '1',
    employeeId: '2',
    feedbacks: [{
      _id: '11',
      reviewId: 'test',
      employeeId: '2',
      feedback: 'first review',
    },          {
      _id: '12',
      reviewId: 'test',
      employeeId: '2',
      feedback: 'otehre feedvack',
    }],
  },
                                          {
    _id: 'test2',
    description: 'review2',
    updatedBy: '4',
    employeeId: '3',
    feedbacks: [{
      _id: '21',
      reviewId: 'test2',
      employeeId: '3',
      feedback: 'feed1',
    },          {
      _id: '21',
      reviewId: 'test2',
      employeeId: '3',
      feedback: 'feed2',
    }],
  }];
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(Axios);
  });

  it('should load reviews on call of loadReviews', async () => {
    mockAxios.onPost('/reviews/').reply(200, reviews);

    const gotData = await reviewService.loadReviews({ employeeId: '1' });
    expect(reviews).toStrictEqual(gotData);
  });

  it('should throw an error on call of loadReviews', async () => {
    const errorStr = 'Internal error';
    mockAxios.onPost('/reviews/').reply(500, errorStr);

    try {
      await reviewService.loadReviews({ employeeId: '1' });
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call create review api and get created review', async () => {
    const newData = {
      _id: 'test',
      description: 'review1',
      updatedBy: '1',
      employeeId: '2',
    };
    mockAxios.onPost('/reviews/create').reply(200, newData);

    const gotCreated = await reviewService.createReview(newData);
    expect(newData).toStrictEqual(gotCreated);
  });

  it('should throw an error on create review', async () => {
    const create = reviews[0];
    const errorStr = 'Internal error';
    mockAxios.onPost('/reviews/create').reply(500, errorStr);

    try {
      await reviewService.createReview(create);
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call update review api and get updated review', async () => {
    const updated = {
      ...reviews[0],
      description: 'updated',
    };
    mockAxios.onPut('/reviews/').reply(200, updated);

    const gotUpdated = await reviewService.updateReview(updated);
    expect(updated).toStrictEqual(gotUpdated);
  });

  it('should throw an error on call update review api', async () => {
    const errorStr = 'Internal error';
    const updated = {
      ...reviews[0],
      description: 'updated',
    };
    mockAxios.onPut('/reviews/').reply(500, errorStr);

    try {
      await reviewService.updateReview(updated);
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call delete review api and get deleted review', async () => {
    const deleted = reviews[0];
    mockAxios.onDelete('/reviews/').reply(200, deleted);

    const gotDeleted = await reviewService.deleteReview(deleted);
    expect(deleted).toStrictEqual(gotDeleted);
  });

  it('should throw an error on delete assignee', async () => {
    const deleted = reviews[0];
    const errorObj = { message: 'Bad request' };
    mockAxios.onDelete('/reviews/').reply(401, errorObj);

    try {
      await reviewService.deleteReview(deleted);
    } catch (error) {
      expect(error.response.status).toStrictEqual(401);
      expect(error.response.data).toStrictEqual(errorObj);
    }
  });
});
