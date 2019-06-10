import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles<Theme>(() => ({
  reviewsWrap: {
    marginTop: 3,
  },
  noReviewMessage: {
    textAlign: 'center',
    backgroundColor: '#e8eaf6',
    color: '#1a237e',
    margin: 4,
  },
  reviewBlock: {
    padding: 5,
    backgroundColor: '#e8eaf6',
    margin: 4,
    borderRadius: 5,
    color: '#1a237e',
    boxShadow: '1px 1px 1px 1px, -1px 1px 1px 1px',
  },
  header: {
    padding: '5px 3px',
  },
  addIcon: {
    margin: '0 5px',
  },
  reviewForm: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 256,
    maxHeight: '100%',
  },
  reviewFormButtonWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  reviewFormButtons: {
    margin: '0 5px',
  },
  reviewsOfInfo: {
    color: '#065356',
    padding: '0 5px',
    backgroundColor: '#e7eeff',
    borderRadius: 5,
    boxShadow: '1px 1px 1px 0px',
    margin: '0 3px',
  },
}));
