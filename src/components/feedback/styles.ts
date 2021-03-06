import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles<Theme>(() => ({
  feedbacksWrap: {
    padding: 0,
  },
  inputFeedbackWrap: {
    display: 'flex',
    marginLeft: 5,
  },
}));
