import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FeedbackIcon from '@material-ui/icons/Feedback';
import * as React from 'react';

import { AppDrawerProps, Links } from './app-drawer';

/**
 * Gives menu links for normal users
 */
export function getNormalMenuLinks(props: AppDrawerProps): Links[] {
  const { classes, t: translate } = props;

  return [
    {
      path: '/feedback',
      icon: <FeedbackIcon className={classes.drawerLinkIcon} />,
      text: translate('menus.normal.feedback'),
    },
    {
      path: '/assigned-to-you',
      icon: <AssignmentIndIcon className={classes.drawerLinkIcon} />,
      text: translate('menus.normal.assignedToYou'),
    },
  ];
}
