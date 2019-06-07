import { createMuiTheme } from '@material-ui/core/styles';

export const muiTheme = createMuiTheme({
  palette: {
    common: { black: '#000', white: '#fff' },
    background: { paper: '#fff', default: '#fafafa' },
    primary: {
      light: 'rgba(124, 77, 255, 1)',
      main: 'rgba(101, 31, 255, 1)',
      dark: 'rgba(98, 0, 234, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(41, 121, 255, 1)',
      main: 'rgba(41, 98, 255, 1)',
      dark: 'rgba(13, 71, 161, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
});
