import { CircularProgress, CssBaseline, withStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { RouteProps, RouterProps } from 'react-router';
import { AppDrawer } from '~components/app-drawer/app-drawer';
import { Appbar } from '~components/appbar/appbar';
import { Routes, getDefaultRoute } from '~pages/routes/routes';
import { userService } from '~services/user-service';
import { SettingStore } from '~stores/settings';
import { StyledComponentProps } from '~types/styled';

import { Classes, styles } from './styles';

/**
 * Home component, which basically to be shown always!
 */
@inject('settingStore')
@observer
class Home extends React.Component<HomeProps> {

  /** Gives injected props */
  get injectedProps(): InjectedProps {
    return this.props as InjectedProps;
  }

  /**
   * In case user changes path manually and try to access / then redirect to
   * particular default route
   */
  componentDidUpdate(): void {
    this.redirectToDefaultRoute();
  }

  /** On component mount check user is logged in or not */
  componentDidMount(): void {
    if (!userService.isLoggedIn()) {
      this.injectedProps.history.replace('/login');
    }
    this.redirectToDefaultRoute();
  }

  /**
   * If / path is coming then redirect to particular default route
   */
  redirectToDefaultRoute(): void {
    const { location, history } = this.injectedProps;

    if (location && location.pathname === '/') {
      history.replace(getDefaultRoute());
    }
  }

  /** Renders home component */
  render(): JSX.Element {
    const { classes, t, i18n } = this.props;
    const { history } = this.injectedProps;

    return (
      <div className={classes.container}>
        <CssBaseline />
        <Appbar t={t} i18n={i18n} history={history} />
        <AppDrawer t={t} i18n={i18n} />
        <main className={classes.mainContent}>
          <div className={classes.toolbar} />
          <React.Suspense fallback={<CircularProgress className={classes.pageLoading} />}>
            <div className={classes.innerWrapper}>
              <Routes />
            </div>
          </React.Suspense>
        </main>
      </div>
    );
  }
}

interface StoreProps {
  /** Settings store */
  settingStore: SettingStore;
}

type InjectedProps = StoreProps & RouterProps & RouteProps;

type HomeProps = Partial<InjectedProps> & WithTranslation & StyledComponentProps<Classes>;

const TranslatedHome = withTranslation()(Home);
const StyledHome = withStyles(styles)(TranslatedHome);

export { StyledHome as Home };
