import { StyleRulesCallback } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export type Classes =
  'customizedHeader' |
  'buttonIcon' |
  'selectionButtons';

export const styles: StyleRulesCallback<Classes> = (): Record<Classes, CSSProperties> => ({
  customizedHeader: {
    '& :not(:first-child)': {
      margin: '0 5px',
    },
  },
  buttonIcon: {
    margin: '0 5px',
  },
  selectionButtons: {
    padding: '5px 3px',
  },
});
