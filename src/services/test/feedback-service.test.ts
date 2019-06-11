import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Feedback } from '~model/feedback';
import { feedbackService } from '~services/feedback-service';

describe('Test: FeedbackService', () => {
  const feedbacks: Feedback[] = [
    {
      _id: '11',
      reviewId: 'test',
      employeeId: '2',
      feedback: 'first feedback',
    },
    {
      _id: '12',
      reviewId: 'test',
      employeeId: '2',
      feedback: 'otehre feedvack',
    },
  ];
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(Axios);
  });

  it('should load feedbacks on call of loadFeedbacks', async () => {
    mockAxios.onPost('/feedbacks/').reply(200, feedbacks);

    const gotData = await feedbackService.loadFeedbacks('1');
    expect(feedbacks).toStrictEqual(gotData);
  });

  it('should throw an error on call of loadFeedbacks', async () => {
    const errorStr = 'Internal error';
    mockAxios.onPost('/feedbacks/').reply(500, errorStr);

    try {
      await feedbackService.loadFeedbacks('1');
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call create feedback api and get created feedback', async () => {
    const newData = {
      _id: '1331',
      reviewId: 'new',
      employeeId: '2',
      feedback: 'new feedback',
    };
    mockAxios.onPost('/feedbacks/create').reply(200, newData);

    const gotCreated = await feedbackService.createFeedback(newData);
    expect(newData).toStrictEqual(gotCreated);
  });

  it('should throw an error on create feedback', async () => {
    const create = feedbacks[0];
    const errorStr = 'Internal error';
    mockAxios.onPost('/feedbacks/create').reply(500, errorStr);

    try {
      await feedbackService.createFeedback(create);
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call update feedback api and get updated feedback', async () => {
    const updated = {
      ...feedbacks[0],
      employeeId: '999',
    };
    mockAxios.onPut('/feedbacks/').reply(200, updated);

    const gotUpdated = await feedbackService.updateFeedback(updated);
    expect(updated).toStrictEqual(gotUpdated);
  });

  it('should throw an error on call update feedback api', async () => {
    const errorStr = 'Internal error';
    const updated = {
      ...feedbacks[0],
      employeeId: '999',
    };
    mockAxios.onPut('/feedbacks/').reply(500, errorStr);

    try {
      await feedbackService.updateFeedback(updated);
    } catch (error) {
      expect(error.response.status).toStrictEqual(500);
      expect(error.response.data).toStrictEqual(errorStr);
    }
  });

  it('should call delete feedback api and get deleted feedback', async () => {
    const deleted = feedbacks[0];
    mockAxios.onDelete('/feedbacks/').reply(200, deleted);

    const gotDeleted = await feedbackService.deleteFeedback(deleted);
    expect(deleted).toStrictEqual(gotDeleted);
  });

  it('should throw an error on delete assignee', async () => {
    const deleted = feedbacks[0];
    const errorObj = { message: 'Bad request' };
    mockAxios.onDelete('/feedbacks/').reply(401, errorObj);

    try {
      await feedbackService.deleteFeedback(deleted);
    } catch (error) {
      expect(error.response.status).toStrictEqual(401);
      expect(error.response.data).toStrictEqual(errorObj);
    }
  });
});
