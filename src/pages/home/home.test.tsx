import { ThemeProvider } from '@material-ui/styles';
import { render } from '@testing-library/react';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryHistory, createMemoryHistory } from 'history';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { Route, Router } from 'react-router-dom';
import sinon from 'sinon';
import { User } from '~model/user';
import { userService } from '~services/user-service';
import { SettingStore } from '~stores/settings';

import { getClassNamesFromStyles } from '../../common/test-utils';
import { initI18Next } from '../../i18n/i18n';
import { styles as homeStyles } from '../../pages/home/styles';
import { muiTheme } from '../app/mui-theme';

import { Home } from './home';

const users: User[] = [{
  _id: 'test',
  firstName: 'somet',
  lastName: 'ere',
  sex: 'm',
  role: 'admin',
  userName: 'usaaa',
  password: 'abc',
},                     {
  _id: 'test2',
  firstName: 'werwr',
  lastName: 'xbxvx',
  sex: 'm',
  role: 'normal',
  userName: 'ppp',
  password: 'abc',
}];

describe('Test: Home', () => {
  let settingStore: SettingStore;
  let HomeComponent: JSX.Element;
  let classes: { [key: string]: string };
  let sandbox: sinon.SinonSandbox;
  let history: MemoryHistory;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockAxios = new MockAdapter(Axios);
    // mock login
    sandbox.stub(userService, 'isLoggedIn').returns(true);
    // make admin true
    sandbox.stub(userService, 'isAdmin').returns(true);
    // mock userinfo
    sandbox.stub(userService, 'getUserInfo').returns(users[0]);
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeAll(() => {
    settingStore = new SettingStore();
    classes = {
       ...getClassNamesFromStyles(homeStyles, muiTheme),
    };
    initI18Next();
    history = createMemoryHistory({initialEntries: ['/']});
    HomeComponent = (
      <Provider {...{settingStore}}>
        <ThemeProvider theme={muiTheme}>
          <Router history={history}>
            <React.Suspense fallback={'loading..'}>
              <Route path="/" render={(props) => <Home classes={classes} {...props} /> } />
            </React.Suspense>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render properly', () => {
    const { container } = render(HomeComponent);

    expect(container.querySelector('.container')).toHaveStyle('display: flex');
  });

  it('should have app bar', () => {
    const { container } = render(HomeComponent);

    expect(container.querySelector('[class*=appBar]')).toBeInTheDocument();
  });

  it('should have app drawer closed on left', () => {
    const { container } = render(HomeComponent);

    expect(container.querySelector('[class*=xsDown] [class*=drawerClose]')).toBeInTheDocument();
  });

  it('should have main content', () => {
    const { container } = render(HomeComponent);

    expect(container.querySelector('main[class*=mainContent]')).toBeInTheDocument();
  });

  it('should have main content as employee page for "admin"', () => {

    // we also need to stub user service so that authentication succeeds and content displayed
    mockAxios.onGet('/users/').reply(200, users);

    const { container } = render(HomeComponent);

    expect(history.location.pathname).toBe('/employee');
    expect(container.querySelector('main[class*=mainContent]')).toBeInTheDocument();
    // TODO: seems testing library does not support react lazy with my setup which can load named
    // exports. It's giving Error: Not supported in rc/pages/routes/routes.tsx:18
  });
});
