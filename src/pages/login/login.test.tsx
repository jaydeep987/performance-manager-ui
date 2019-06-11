import { ThemeProvider } from '@material-ui/styles';
import { fireEvent, render, wait } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { withTranslation } from 'react-i18next';
import { Route, Router } from 'react-router-dom';
import sinon from 'sinon';
import { userService } from '~services/user-service';
import { SettingStore } from '~stores/settings';

import { getClassNamesFromStyles } from '../../common/test-utils';
import { initI18Next } from '../../i18n/i18n';
import { muiTheme } from '../app/mui-theme';

import { LoginForm } from './login-form';
import { styles as styles } from './styles';

describe('Test: Login', () => {
  let settingStore: SettingStore;
  let LoginFormComponent: JSX.Element;
  let classes: { [key: string]: string };
  let sandbox: sinon.SinonSandbox;
  let history: MemoryHistory;
  const onSubmit = jest.fn();
  const handleChange = jest.fn();

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    // mock login
    sandbox.stub(userService, 'isLoggedIn').returns(true);
    // make admin true
    sandbox.stub(userService, 'isAdmin').returns(true);
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeAll(() => {
    settingStore = new SettingStore();
    classes = {
       ...getClassNamesFromStyles(styles, muiTheme),
    };
    initI18Next();
    history = createMemoryHistory({initialEntries: ['/']});
    const TranslatedLoginForm = withTranslation()(LoginForm);
    // tslint:disable-next-line:no-any
    const renderComponent = (props: any) => (
      <TranslatedLoginForm
        handleChange={handleChange}
        handleSubmit={onSubmit}
        classes={classes}
        {...props}
      />
    );

    LoginFormComponent = (
      <Provider {...{settingStore}}>
        <ThemeProvider theme={muiTheme}>
          <Router history={history}>
            <Route
              path="/"
              render={renderComponent}
            />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render properly and have form', () => {
    const { container } = render(LoginFormComponent);
    const form = container.querySelector('form');

    expect(form).toBeInTheDocument();
    expect(form).toHaveStyle('display: block');
  });

  it('should have user name test box and label', () => {
    const { container } = render(LoginFormComponent);
    const input = container.querySelector('#username') as Element;

    expect(container.querySelector('label[for*=username]')).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input.getAttribute('placeholder')).toBe('User name');
    expect(input.getAttribute('required')).toBeDefined();
    expect(input.nodeValue).toBeNull();
  });

  it('should have password test box and label', () => {
    const { container } = render(LoginFormComponent);
    const input = container.querySelector('#password') as Element;

    expect(container.querySelector('label[for*=password]')).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input.getAttribute('placeholder')).toBe('Password');
    expect(input.getAttribute('required')).toBeDefined();
    expect(input.nodeValue).toBeNull();
  });

  it('should have login button', () => {
    const { container } = render(LoginFormComponent);
    const button = container.querySelector('[class*=loginButton]') as Element;

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Login');
  });

  it('should call onSubmit after pressing button', async () => {
    const { container } = render(LoginFormComponent);
    const username = container.querySelector('#username') as HTMLInputElement;
    const password = container.querySelector('#password') as HTMLInputElement;
    const form = container.querySelector('form') as Element;

    fireEvent.change(username, { target: { value: 'jay' } });
    fireEvent.change(password, { target: { value: '123' } });

    expect(username.value).toBe('jay');
    expect(password.value).toBe('123');

    form.dispatchEvent(new Event('submit'));
    await wait();

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
