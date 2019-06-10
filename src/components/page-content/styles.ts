import { StyleRulesCallback, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { PAGE_HEADER_HEIGHT } from '~components/page-header/styles';

export type Classes =
  'pageContent';

const calculateUpperSectionHeight = (theme: Theme) => {
  const toolbarMinHeight = theme.mixins.toolbar.minHeight;
  const defaultToolbarHeight = 41;
  const normalizeHeight = 10;

  if (toolbarMinHeight && !isNaN(Number(toolbarMinHeight))) {
    return PAGE_HEADER_HEIGHT + Number(toolbarMinHeight) - normalizeHeight;
  }

  return PAGE_HEADER_HEIGHT + defaultToolbarHeight;
};

export const styles: StyleRulesCallback<Classes> = (theme: Theme): Record<Classes, CSSProperties> => ({
  pageContent: {
    padding: 5,
    height: `calc(100% - ${calculateUpperSectionHeight(theme)}px)`,
    overflowY: 'auto',
  },
});
