import { StyleRulesCallback } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export type Classes =
  'container';

export const PAGE_HEADER_HEIGHT = 50;

export const styles: StyleRulesCallback<Classes> = (): Record<Classes, CSSProperties> => ({
  container: {
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: 11,
    width: '100%',
    height: PAGE_HEADER_HEIGHT,
    borderRadius: 0,
  },
});
