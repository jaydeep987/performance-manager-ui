import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export type Classes =
  'infoLabel' |
  'infoIcon' |
  'infoMessage';

export const styles: StyleRulesCallback<Classes> = (theme: Theme): Record<Classes, CSSProperties> => ({
  infoLabel: {
    backgroundColor: '#1669AA',
    margin: '0 2px',
  },
  infoIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  infoMessage: {
    display: 'flex',
    alignItems: 'center',
  },
});
