import { StyleRulesCallback } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';

export type Classes =
  'list' |
  'content' |
  'title' |
  'titleContainer' |
  'assigneeTextField' |
  'loadingProgress' |
  'loadingProgressOverlay';

export const styles: StyleRulesCallback<Classes> = (): Record<Classes, CSSProperties> => ({
  list: {
    minWidth: 320,
  },
  content: {
    padding: 0,
  },
  title: {
    padding: '5px 18px',
  },
  titleContainer: {
    alignItems: 'center',
  },
  assigneeTextField: {
    width: '75%',
  },
  loadingProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  loadingProgressOverlay: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
});
