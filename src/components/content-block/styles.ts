import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  content: {
    '&:last-child': {
      paddingBottom: 14,
    },
  },
  contentText: {
    whiteSpace: 'pre-wrap',
  },
  base: {

  },
  sub: {
    marginLeft: '5%',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    paddingTop: 5,
    borderRadius: 5,
    marginBottom: 7,
    marginRight: 10,
    backgroundColor: '#e1e4f6',
    boxShadow: '-2px -1px 1px 1px',
  },
  toolbar: {
    textAlign: 'right',
    marginTop: -8,
  },
});
