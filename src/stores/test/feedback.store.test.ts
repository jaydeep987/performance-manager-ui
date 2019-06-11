import sinon from 'sinon';
import { Feedback } from '~model/feedback';
import { ReviewWithFeedbacks } from '~model/review';
import { feedbackService } from '~services/feedback-service';
import { reviewService } from '~services/review-service';

import { FeedbackStore } from '../feedback';

describe('Test Store: FeedbackStore', () => {
  let feedbackStore: FeedbackStore;
  let sandbox: sinon.SinonSandbox;
  const reviews: ReviewWithFeedbacks[] = [{
    _id: 'test',
    description: 'review1',
    updatedBy: '1',
    employeeId: '2',
    feedbacks: [{
      _id: '11',
      reviewId: 'test',
      employeeId: '2',
      feedback: 'first feedback',
    },          {
      _id: '12',
      reviewId: 'test',
      employeeId: '2',
      feedback: 'otehre feedvack',
    }],
  },                                      {
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

  beforeEach(() => {
    feedbackStore = new FeedbackStore();
    feedbackStore.setTranslate(spiedTranslation());
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /**
   * Initial values of store checks
   */
  function initialCheck(): void {
    expect(feedbackStore.reviews).toStrictEqual([]);
    expect(feedbackStore.error).toStrictEqual('');
  }

  /** translation function spied! */
  // tslint:disable-next-line:no-any
  function spiedTranslation(): sinon.SinonSpy<any> {
    return sinon.spy((str) => str);
  }

  function loadReviews(): void {
    const promiseResolved = new Promise<ReviewWithFeedbacks[]>((resolve) => {
      resolve(reviews);
    });
    sandbox.stub(reviewService, 'loadReviews').returns(promiseResolved);
  }

  it('should have props with default values', () => {
    initialCheck();
  });

  it('should load reviews with feedbacks on action call', async () => {
    loadReviews();

    expect(feedbackStore.reviews).toStrictEqual([]);
    await feedbackStore.loadReviews({ updatedBy: '1', employeeId: '2' });

    expect(feedbackStore.reviews).toStrictEqual(reviews);
  });

  it('should set error on calling action to load reviews with feedbacks', async () => {
    const promiseResolved = new Promise<ReviewWithFeedbacks[]>((_1, reject) => {
      reject('some error');
    });

    sandbox.stub(reviewService, 'loadReviews').returns(promiseResolved);
    expect(feedbackStore.reviews).toStrictEqual([]);

    try {
      await feedbackStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    } catch (error) {
      expect(feedbackStore.reviews).toStrictEqual([]);
      expect(feedbackStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should create new feedback on action call', async () => {
    const newFeedback: Feedback = {
      _id: 'aa',
      feedback: 'feedbacknew',
      employeeId: '4',
      reviewId: 'test',
    };
    const promiseResolved = new Promise<Feedback>((resolve) => {
      resolve({_id: 'new', ...newFeedback});
    });
    const expected: ReviewWithFeedbacks[] = [
      {
        ...reviews[0],
        feedbacks: [
          ...[newFeedback],
          ...reviews[0].feedbacks,
        ],
      },
      {
        ...reviews[1],
      },
    ];

    sandbox.stub(feedbackService, 'createFeedback').returns(promiseResolved);

    // first load some data
    loadReviews();
    await feedbackStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(feedbackStore.reviews).toStrictEqual(reviews);

    await feedbackStore.createFeedback(newFeedback);
    expect(feedbackStore.reviews).toStrictEqual(expected);
  });

  it('should give error on create new user on action call', async () => {
    const newFeedback: Feedback = {
      _id: 'aa',
      feedback: 'feedbacknew',
      employeeId: '4',
      reviewId: 'test',
    };
    const promiseResolved = new Promise<Feedback>((_1, reject) => {
      reject('creation error');
    });

    sandbox.stub(feedbackService, 'createFeedback').returns(promiseResolved);

    loadReviews();
    await feedbackStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(feedbackStore.reviews).toStrictEqual(reviews);

    try {
      await feedbackStore.createFeedback(newFeedback);
    } catch (error) {
      // store should be unaffected
      expect(feedbackStore.reviews).toStrictEqual(reviews);
      expect(feedbackStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should update current feedback of some review on action call', async () => {
    const updateFeedback: Feedback = {
     ...reviews[0].feedbacks[0],
     feedback: 'updated feedback',
    };
    const promiseResolved = new Promise<Feedback>((resolve) => {
      resolve(updateFeedback);
    });
    const expected: ReviewWithFeedbacks[] = [
      {
        ...reviews[0],
        feedbacks: [
          {
            ...updateFeedback,
          },
          {
            ...reviews[0].feedbacks[1],
          },
        ],
      },
      {
        ...reviews[1],
      },
    ];

    sandbox.stub(feedbackService, 'updateFeedback').returns(promiseResolved);

    // first load some data
    loadReviews();
    await feedbackStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(feedbackStore.reviews).toStrictEqual(reviews);

    await feedbackStore.updateFeedback(updateFeedback);

    // should update in-place
    expect(feedbackStore.reviews).toStrictEqual(expected);
  });

  it('should give an error when update current feedback of some review on action call', async () => {
    const updateFeedback: Feedback = {
     ...reviews[0].feedbacks[0],
     feedback: 'updated feedback',
    };
    const promiseResolved = new Promise<Feedback>((_1, reject) => {
      reject('some error');
    });

    sandbox.stub(feedbackService, 'updateFeedback').returns(promiseResolved);

    // first load some data
    loadReviews();
    await feedbackStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(feedbackStore.reviews).toStrictEqual(reviews);

    try {
      await feedbackStore.updateFeedback(updateFeedback);
    } catch (error) {
      // should update in-place
      expect(feedbackStore.reviews).toStrictEqual(reviews);
      expect(feedbackStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should delete feedback of some review on action call', async () => {
    const promiseResolved = new Promise<Feedback>((resolve) => {
      resolve(reviews[0].feedbacks[0]);
    });
    const expected: ReviewWithFeedbacks[] = [
      {
        ...reviews[0],
        feedbacks: [
          ...[reviews[0].feedbacks[1]],
        ],
      },
      {
        ...reviews[1],
      },
    ];

    sandbox.stub(feedbackService, 'deleteFeedback').returns(promiseResolved);

    // first load some data
    loadReviews();
    await feedbackStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(feedbackStore.reviews).toStrictEqual(reviews);

    await feedbackStore.deleteFeedback(reviews[0].feedbacks[0]);
    expect(feedbackStore.reviews).toStrictEqual(expected);
  });

  it('should give some error on delete feedback of some review on action call', async () => {
    const promiseResolved = new Promise<Feedback>((_1, reject) => {
      reject('some error');
    });

    sandbox.stub(feedbackService, 'deleteFeedback').returns(promiseResolved);

    // first load some data
    loadReviews();
    await feedbackStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(feedbackStore.reviews).toStrictEqual(reviews);

    try {
      await feedbackStore.deleteFeedback(reviews[0].feedbacks[0]);
    } catch (error) {
      expect(feedbackStore.reviews).toStrictEqual(reviews);
      expect(feedbackStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should reset store on call of reset', () => {
    feedbackStore.resetStore();

    initialCheck();
  });
});
