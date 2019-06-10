import FeedbackIcon from '@material-ui/icons/Feedback';
import * as React from 'react';

import { AppDrawerProps, Links } from './app-drawer';

/**
 * Gives menu links for all users
 */
export function getCommonMenuLinks(props: AppDrawerProps): Links[] {
  const { classes, t: translate } = props;

  return [
    {
      path: '/feedback',
      icon: <FeedbackIcon className={classes.drawerLinkIcon} />,
      text: translate('menus.normal.feedback'),
    },
  ];
}
