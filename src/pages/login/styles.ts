import { StyleRulesCallback } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export type Classes =
  'container' |
  'form' |
  'textbox' |
  'loginButton';

export const styles: StyleRulesCallback<Classes> = (): Record<Classes, CSSProperties> => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: 'column',
    alignItems: 'center',
    margin: 0,
  },
  container: {
    width: '75%',
    padding: 30,
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
  },
  textbox: {
    width: '100%',
  },
  loginButton: {
    marginTop: 10,
  },
});
