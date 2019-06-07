import {
  AppBar,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import { mdiEarth, mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import i18next from 'i18next';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouterProps } from 'react-router';
import { IconSize, LanguageKeys, Languages } from '~common/constants';
import { userService } from '~services/user-service';
import { SettingStore } from '~stores/settings';
import { StyledComponentProps } from '~types/styled';

import { Classes, styles } from './styles';

/**
 * Appbar, the app header which will be alwas there.
 * Containing various tools like menuButton, language selector etc
 */
const Appbar: React.FunctionComponent<AppbarProps> = ((props: AppbarProps): JSX.Element => {
  const { classes, i18n, t: translate } = props;
  const { settingStore, history } = props as InjectedProps;

  reaction(
    () => settingStore.locale,
    (locale: string) => i18n.changeLanguage(locale), // tslint:disable-line:no-floating-promises
  );

  /** Renders languages selectbox items */
  const renderLanguageMenuItems = () => (
    Object
      .keys(LanguageKeys)
      .map((value: string) => (
        <MenuItem key={value} value={value}>
          {Languages[value]}
        </MenuItem>
      ))
  );

  const handleLocaleChange = (event: React.ChangeEvent<MaterialChange>) => {
    settingStore.setLocale(event.target.value as string);
  };

  const handleDrawerOpen = () => {
    settingStore.openDrawer();
  };

  const handleLogoutClick = () => {
    userService
      .logout()
      .finally(() => {
        history.replace('/login');
      })
      .catch();
  };

  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: settingStore.isDrawerOpen,
      })}
    >
      <Toolbar
        className={classes.toolbar}
        disableGutters={!settingStore.isDrawerOpen}
      >
        <IconButton
          color="inherit"
          aria-label="Open"
          onClick={handleDrawerOpen}
          className={classNames(classes.menuButton, {
            [classes.hide]: settingStore.isDrawerOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.toolbarLeft} variant="h4" color="inherit">
          <span className={classes.headTitle}>{translate('appTitle')}</span>
        </Typography>
        <Paper className={classes.toolbarRight}>
          <Button variant="contained" color="primary" onClick={handleLogoutClick}>
            <Typography className={classes.setLanguageLabel} variant="subtitle1">
              <Icon path={mdiLogout} size={IconSize.SM} color="#fff" />
            </Typography>
          </Button>
          <Typography className={classes.setLanguageLabel} variant="subtitle1">
            <Icon path={mdiEarth} size={IconSize.MD} spin={true} color="#fff" />
          </Typography>
          <Select
            className={classes.languageSelect}
            value={settingStore.locale}
            onChange={handleLocaleChange}
          >
            {renderLanguageMenuItems()}
          </Select>
        </Paper>
      </Toolbar>
    </AppBar>
  );
});

interface MaterialChange {
  /** Component name */
  name?: string;
  /** Component value */
  value: unknown;
}

interface InjectedProps extends RouterProps {
  /** Instance of Settings store */
  settingStore: SettingStore;
}

interface AppbarProps extends StyledComponentProps<Classes>, Partial<InjectedProps> {
  /** translation function */
  t: i18next.TFunction;
  /** i18n instance */
  i18n: i18next.i18n;
}

const WrappedAppbar = inject('settingStore')(observer(Appbar));
const StyledAppbar = withStyles(styles)(WrappedAppbar);

export { StyledAppbar as Appbar };
