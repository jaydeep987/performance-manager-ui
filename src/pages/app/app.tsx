import { CssBaseline } from '@material-ui/core';
import {
  StylesProvider,
  ThemeProvider,
  createGenerateClassName,
  jssPreset,
} from '@material-ui/styles';
import { create } from 'jss';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Home } from '~pages/home/home';
import { Login } from '~pages/login/login';
import { stores } from '~stores/index';

import { muiTheme } from './mui-theme';

/**
 * set up for material css-in-js
 * this will allow our custom styles to be injected after material's styles
 * so specificity of our styles will always be higher than that of material's styles
 */
const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // custom insertion point to inject styles in DOM
  insertionPoint: 'jss-insertion-point',
});

/**
 * App start from here
 * Basically it does all base configuration before rendering actual app
 */
export const App: React.FunctionComponent = (): JSX.Element => (
  <Provider {...stores}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <HashRouter>
          <Switch>
            <Route exact={true} path="/login" render={(props) => <Login {...props} />} />
            <Route path="/" render={(props) => <Home {...props} />} />
          </Switch>
        </HashRouter>
      </StylesProvider>
    </ThemeProvider>
  </Provider>
);
