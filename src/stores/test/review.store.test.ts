import sinon from 'sinon';
import { Review, ReviewWithFeedbacks } from '~model/review';
import { reviewService } from '~services/review-service';

import { ReviewStore } from '../review';

describe('Test Store: FeedbackStore', () => {
  let reviewStore: ReviewStore;
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
      feedback: 'first review',
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
    reviewStore = new ReviewStore();
    reviewStore.setTranslate(spiedTranslation());
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  /**
   * Initial values of store checks
   */
  function initialCheck(): void {
    expect(reviewStore.reviews).toStrictEqual([]);
    expect(reviewStore.error).toStrictEqual('');
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

  it('should load reviews on action call', async () => {
    loadReviews();

    expect(reviewStore.reviews).toStrictEqual([]);
    await reviewStore.loadReviews({ updatedBy: '1', employeeId: '2' });

    expect(reviewStore.reviews).toStrictEqual(reviews);
  });

  it('should set error on calling action to load reviews', async () => {
    const promiseResolved = new Promise<ReviewWithFeedbacks[]>((_1, reject) => {
      reject('some error');
    });

    sandbox.stub(reviewService, 'loadReviews').returns(promiseResolved);
    expect(reviewStore.reviews).toStrictEqual([]);

    try {
      await reviewStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    } catch (error) {
      expect(reviewStore.reviews).toStrictEqual([]);
      expect(reviewStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should create new review on action call', async () => {
    const newReview: Review = {
      _id: 'aa',
      description: 'new Review',
      updatedBy: '2',
      employeeId: '2',
    };
    const promiseResolved = new Promise<Review>((resolve) => {
      resolve({_id: 'new', ...newReview});
    });
    const expected: Review[] = [
      ...reviews,
      {
        ...newReview,
      },
    ];

    sandbox.stub(reviewService, 'createReview').returns(promiseResolved as Promise<ReviewWithFeedbacks>);

    // first load some data
    loadReviews();
    await reviewStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(reviewStore.reviews).toStrictEqual(reviews);

    await reviewStore.createReview(newReview);
    expect(reviewStore.reviews).toStrictEqual(expected);
  });

  it('should give error on create new user on action call', async () => {
    const newReview: Review = {
      _id: 'aa',
      description: 'new Review',
      updatedBy: '2',
      employeeId: '2',
    };
    const promiseResolved = new Promise<Review>((resolve) => {
      resolve({_id: 'new', ...newReview});
    });

    sandbox.stub(reviewService, 'createReview').returns(promiseResolved as Promise<ReviewWithFeedbacks>);

    // first load some data
    loadReviews();
    await reviewStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(reviewStore.reviews).toStrictEqual(reviews);

    try {
      await reviewStore.createReview(newReview);
    } catch (error) {
      // store should be unaffected
      expect(reviewStore.reviews).toStrictEqual(reviews);
      expect(reviewStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should update current review on action call', async () => {
    const updatedReview: ReviewWithFeedbacks = {
     ...reviews[0],
     description: 'updated review',
    };
    const promiseResolved = new Promise<ReviewWithFeedbacks>((resolve) => {
      resolve(updatedReview);
    });
    const expected: ReviewWithFeedbacks[] = [
      {
        ...updatedReview,
      },
      {
        ...reviews[1],
      },
    ];

    sandbox.stub(reviewService, 'updateReview').returns(promiseResolved);

    // first load some data
    loadReviews();
    await reviewStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(reviewStore.reviews).toStrictEqual(reviews);

    await reviewStore.updateReview(updatedReview);

    // should update in-place
    expect(reviewStore.reviews).toStrictEqual(expected);
  });

  it('should give an error when update current review on action call', async () => {
    const updatedReview: ReviewWithFeedbacks = {
      ...reviews[0],
      description: 'updated review',
     };
    const promiseResolved = new Promise<ReviewWithFeedbacks>((resolve) => {
       resolve(updatedReview);
     });

    sandbox.stub(reviewService, 'updateReview').returns(promiseResolved);

     // first load some data
    loadReviews();
    await reviewStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(reviewStore.reviews).toStrictEqual(reviews);

    try {
      await reviewStore.updateReview(updatedReview);
    } catch (error) {
      // should update in-place
      expect(reviewStore.reviews).toStrictEqual(reviews);
      expect(reviewStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should delete review on action call', async () => {
    const promiseResolved = new Promise<ReviewWithFeedbacks>((resolve) => {
      resolve(reviews[0]);
    });
    const expected: ReviewWithFeedbacks[] = [
      {
        ...reviews[1],
      },
    ];

    sandbox.stub(reviewService, 'deleteReview').returns(promiseResolved);

    // first load some data
    loadReviews();
    await reviewStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(reviewStore.reviews).toStrictEqual(reviews);

    await reviewStore.deleteReview(reviews[0]);
    expect(reviewStore.reviews).toStrictEqual(expected);
  });

  it('should give some error on delete review of some review on action call', async () => {
    const promiseResolved = new Promise<ReviewWithFeedbacks>((_1, reject) => {
      reject('some error');
    });

    sandbox.stub(reviewService, 'deleteReview').returns(promiseResolved);

    // first load some data
    loadReviews();
    await reviewStore.loadReviews({ updatedBy: '1', employeeId: '2' });
    expect(reviewStore.reviews).toStrictEqual(reviews);

    try {
      await reviewStore.deleteReview(reviews[0]);
    } catch (error) {
      expect(reviewStore.reviews).toStrictEqual(reviews);
      expect(reviewStore.error).toStrictEqual('errorMessage.systemError');
    }
  });

  it('should reset store on call of reset', () => {
    reviewStore.resetStore();

    initialCheck();
  });
});
