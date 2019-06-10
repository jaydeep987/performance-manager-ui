import { IconButton, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import i18next from 'i18next';
import * as React from 'react';
import { ContentBlock, ContentBlockData } from '~components/content-block/content-block';

import { useStyles } from './styles';

const Feedback: React.FunctionComponent<FeedbackProps> = (props: FeedbackProps): JSX.Element => {
  const {
    t,
    feedbacks,
    reviewId,
    createFeedback,
    onCreateFeedback,
    onEditFeedback,
    onDeleteFeedback,
  } = props;
  const classes = useStyles();
  const [newFeedback, setNewFeedback] = React.useState('');
  const [editFeedbackId, setEditFeedbackId] = React.useState('');

  const saveEditedFeecback = async () => {
    if (!onEditFeedback) {
      return;
    }

    try {
      await onEditFeedback({
        id: editFeedbackId,
        feedback: newFeedback,
        reviewId,
      });
      setNewFeedback('');
      setEditFeedbackId('');
    } catch (err) {
      // ignore
    }
  };

  const saveNewFeedback = async () => {
    if (!onCreateFeedback) {
      return;
    }

    try {
      await onCreateFeedback({
        feedback: newFeedback,
        reviewId,
      });
      setNewFeedback('');
    } catch (error) {
      // ignore
    }
  };

  const onSaveFeedback = async () => {
    if (editFeedbackId) {
      await saveEditedFeecback();
    } else if (onCreateFeedback) {
      await saveNewFeedback();
    }
  };

  const onEditContent = (data: ContentBlockData) => {
    setNewFeedback(data.content);
    setEditFeedbackId(data.id);
  };

  const onDeleteContent = async (data: ContentBlockData) => {
    if (onDeleteFeedback) {
      try {
        await onDeleteFeedback({
          feedback: data.content,
          reviewId,
          ...data,
        });
      } catch (error) {
        // ignore
      }
    }
  };

  const renderFeedbackTextbox = () => createFeedback && (
    <div className={classes.inputFeedbackWrap}>
      <TextField
        multiline={true}
        name="newfeedback"
        required={true}
        variant="outlined"
        placeholder={t('reviews.feedback.inputFeedbackTextFieldPlaceholder')}
        label={t('reviews.feedback.inputFeedbackTextFieldLabel')}
        fullWidth={true}
        value={newFeedback}
        onChange={(e) => { setNewFeedback(e.target.value); }}
      />
      {newFeedback && <IconButton onClick={onSaveFeedback}><SaveIcon /></IconButton>}
    </div>
  );

  const renderFeedbackBlocks = () => feedbacks && feedbacks.map((feedback) => (
    <ContentBlock
      key={feedback.id}
      type="sub"
      onEditContent={onEditContent}
      onDeleteContent={onDeleteContent}
      {...{ content: feedback.feedback, ...feedback }}
    />
  ));

  return (
    <>
      <div className={classes.feedbacksWrap}>
        {renderFeedbackBlocks()}
        {renderFeedbackTextbox()}
      </div>
    </>
  );
};

export interface FeedbackData {
  /** Unique ID for feedback */
  id: string;
  /** Feedback of review or something */
  feedback: string;
  /** Review id of this feedback */
  reviewId: string;
  /** Whether feedback editable or not */
  editable?: boolean;
  /** Whether feedback editable or not */
  deletable?: boolean;
}

export interface FeedbackProps {
  /** feedbacks */
  feedbacks?: FeedbackData[];
  /** To allow user to add new feedback for each review */
  createFeedback?: boolean;
  /** Review id of this feedbacks */
  reviewId: string;
  /** Translation function */
  t: i18next.TFunction;
  /** On add new feedbak */
  onCreateFeedback?(data: Omit<FeedbackData, 'id'>): Promise<void>;
  /** On edit feedback */
  onEditFeedback?(data: FeedbackData): Promise<void>;
  /** On delete feedback */
  onDeleteFeedback?(data: FeedbackData): Promise<void>;
}

export {
  Feedback,
};
