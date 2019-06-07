import {
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Roles } from '~model/user';
import { RoutePropsExtended } from '~pages/routes/routes';
import { userService } from '~services/user-service';
import { SettingStore } from '~stores/settings';
import { StyledComponentProps } from '~types/styled';

import { getAdminMenuLinks } from './get-admin-menu-links';
import { getNormalMenuLinks } from './get-normal-menu-links';
import { Classes, styles } from './styles';

/**
 * Side Drawer component
 */
@inject('settingStore')
@observer
class AppDrawer extends React.Component<AppDrawerProps> {
  /** Gives injected props */
  get injectedProps(): InjectedProps {
    return this.props as InjectedProps;
  }

  /** Drawer links */
  getLinks(): Links[] {
    const currentUser = userService.getUserInfo();

    if (!currentUser) {
      return [];
    }

    return currentUser.role === Roles.Admin ? getAdminMenuLinks(this.props) : getNormalMenuLinks(this.props);
  }

  /** Renders side drawer list items with icons and text */
  rednerDrawerListItems = (hideOnClick?: boolean): JSX.Element[] => (
    this
      .getLinks()
      .map((link: Links) => (
        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore there is some issue in types, actually component exists
        <ListItem
          button={true}
          component={React.forwardRef((props, ref: React.Ref<Link>) => <Link to={link.path} {...props} ref={ref} />)}
          key={link.path}
          onClick={hideOnClick ? this.handleDrawerClose : undefined}
        >
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText primary={link.text} />
        </ListItem>
      ))
  )

  /** Open drawer */
  handleDrawerOpen = (): void => {
    this.injectedProps.settingStore.openDrawer();
  }

  /** Closes drawer */
  handleDrawerClose = (): void => {
    this.injectedProps.settingStore.closeDrawer();
  }

  /** Renders app drawer */
  render(): JSX.Element {
    const { settingStore } = this.injectedProps;
    const { classes, theme } = this.props;

    return (
      <nav>
        <Hidden smUp={true} implementation="css">
          <Drawer
            className={classes.mobileDrawer}
            open={settingStore.isDrawerOpen}
            onClose={this.handleDrawerClose}
            variant="temporary"
            anchor={theme && theme.direction === 'rtl' ? 'right' : 'left'}
          >
            <List>
              {this.rednerDrawerListItems(true)}
            </List>
          </Drawer>
        </Hidden>
        <Hidden xsDown={true} implementation="css">
          <Drawer
            variant="permanent"
            open={settingStore.isDrawerOpen}
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: settingStore.isDrawerOpen,
              [classes.drawerClose]: !settingStore.isDrawerOpen,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: settingStore.isDrawerOpen,
                [classes.drawerClose]: !settingStore.isDrawerOpen,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme && theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <div>
              <List>
                {this.rednerDrawerListItems()}
              </List>
            </div>
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

export interface Links {
  /** Route path */
  path: RoutePropsExtended['path'];
  /** Icon component */
  icon: JSX.Element;
  /** Link text */
  text: string;
}

interface StoreProps {
  /** instance of Settings store */
  settingStore: SettingStore;
}

type InjectedProps = StoreProps;

export type AppDrawerProps = WithTranslation & Partial<StoreProps> & StyledComponentProps<Classes>;

const StyledAppDrawer = withStyles(styles)(AppDrawer);

export { StyledAppDrawer as AppDrawer };
