import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import * as React from 'react';

import { AppDrawerProps, Links } from './app-drawer';
import { getCommonMenuLinks } from './get-common-menu-links.1';

/**
 * Gives menu links for normal users
 */
export function getNormalMenuLinks(props: AppDrawerProps): Links[] {
  const { classes, t: translate } = props;

  return [
    ...getCommonMenuLinks(props),
    {
      path: '/assigned-to-you',
      icon: <AssignmentIndIcon className={classes.drawerLinkIcon} />,
      text: translate('menus.normal.assignedToYou'),
    },
  ];
}
