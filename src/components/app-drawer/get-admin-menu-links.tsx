import PersonIcon from '@material-ui/icons/Person';
import RateReviewIcon from '@material-ui/icons/RateReview';
import * as React from 'react';

import { AppDrawerProps, Links } from './app-drawer';

/**
 * Gives menu links for admin users
 */
export function getAdminMenuLinks(props: AppDrawerProps): Links[] {
  const { classes, t: translate } = props;

  return [
    {
      path: '/employee',
      icon: <PersonIcon className={classes.drawerLinkIcon} />,
      text: translate('menus.admin.employee'),
    },
    {
      path: '/review',
      icon: <RateReviewIcon className={classes.drawerLinkIcon} />,
      text: translate('menus.admin.review'),
    },
  ];
}
