import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { DRAWER_WIDTH } from '~components/app-drawer/styles';

export type Classes =
  'toolbar' |
  'toolbarRight' |
  'languageSelect' |
  'toolbarLeft' |
  'setLanguageLabel' |
  'appBarShift' |
  'menuButton' |
  'hide' |
  'appBar' |
  'userWelcome';

export const styles: StyleRulesCallback<Classes> = (theme: Theme): Record<Classes, CSSProperties> => ({
  appBar: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    color: '#fff',
  },
  toolbarLeft: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'inherit',
  },
  setLanguageLabel: {
    color: '#fff',
    padding: 5,
  },
  languageSelect: {
    color: '#fff',
  },
  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'height'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  menuButton: {
    marginLeft: 12,
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  userWelcome: {
    textAlign: 'center',
    color: '#fff',
    padding: '0 18px',
    fontStyle: 'bold',
  },
});
