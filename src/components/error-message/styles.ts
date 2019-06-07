import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export type Classes =
  'error' |
  'icon' |
  'message' |
  'iconVariant';

export const styles: StyleRulesCallback<Classes> = (theme: Theme): Record<Classes, CSSProperties> => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(2),
  },
});
