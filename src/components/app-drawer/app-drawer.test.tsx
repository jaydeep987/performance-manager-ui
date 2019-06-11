import { Drawer, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { ReactWrapper, mount } from 'enzyme';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { withTranslation } from 'react-i18next';
import { HashRouter } from 'react-router-dom';
import sinon from 'sinon';
import { User } from '~model/user';
import { muiTheme } from '~pages/app/mui-theme';
import { userService } from '~services/user-service';
import { SettingStore } from '~stores/settings';

import { initI18Next } from '../../i18n/i18n';

import { AppDrawer } from './app-drawer';

describe('Test Component: AppDrawer', () => {
  let AppDrawerElement: JSX.Element;
  let settingStore: SettingStore;
  let sandbox: sinon.SinonSandbox;
  const userInfo: User = {
    _id: '2323fsdf232',
    firstName: 'User1',
    lastName: 'Lastname',
    userName: 'username',
    password: '123',
    sex: 'M',
    role: 'admin',
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeAll(() => {
    initI18Next();
    settingStore = new SettingStore();
    sandbox = sinon.createSandbox();
    // mock user service to provide currentUser
    sandbox.stub(userService, 'getUserInfo').returns(userInfo);
    const Component = withTranslation()(AppDrawer);
    AppDrawerElement = (
      <Provider {...{settingStore}}>
        <ThemeProvider theme={muiTheme}>
          <HashRouter>
            <Component />
          </HashRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  afterAll(() => {
    sandbox.restore();
  });

  it('should render appbar with permanent drawer', () => {
    const wrapper = mount(AppDrawerElement);
    let permanentDrawer: ReactWrapper | undefined;

    wrapper.find(Drawer).forEach((component: ReactWrapper) => {
      permanentDrawer = component.prop('variant') === 'permanent' ? component : undefined;
    });

    expect(permanentDrawer).not.toBe(undefined);
  });

  it('should open and close permanent drawer when state change', () => {
    const wrapper = mount(AppDrawerElement);
    let permanentDrawer: ReactWrapper | undefined;

    wrapper.find(Drawer).forEach((component: ReactWrapper) => {
      permanentDrawer = component.prop('variant') === 'permanent' ? component : undefined;
    });

    expect((permanentDrawer as ReactWrapper).prop('open')).toBeFalsy();
    expect((permanentDrawer as ReactWrapper).prop('className')).toContain('drawerClose');

    // externally update state
    settingStore.openDrawer();
    // as we externally tried to change state, we need to update
    wrapper.update();
    // after update, find again
    wrapper.find(Drawer).forEach((component: ReactWrapper) => {
      permanentDrawer = component.prop('variant') === 'permanent' ? component : undefined;
    });

    expect((permanentDrawer as ReactWrapper).prop('open')).toBeTruthy();
    expect((permanentDrawer as ReactWrapper).prop('className')).toContain('drawerOpen');

    // now try to close using close button
    (permanentDrawer as ReactWrapper).find(IconButton).simulate('click');
    // after update, find again
    wrapper.find(Drawer).forEach((component: ReactWrapper) => {
      permanentDrawer = component.prop('variant') === 'permanent' ? component : undefined;
    });
    expect((permanentDrawer as ReactWrapper).prop('open')).toBeFalsy();
    expect((permanentDrawer as ReactWrapper).prop('className')).toContain('drawerClose');
  });

  it('should render drawer with links', () => {
    const wrapper = mount(AppDrawerElement);
    let permanentDrawer: ReactWrapper | undefined;

    wrapper.find(Drawer).forEach((component: ReactWrapper) => {
      permanentDrawer = component.prop('variant') === 'permanent' ? component : undefined;
    });

    expect((permanentDrawer as ReactWrapper).find(ListItem).length).toBeGreaterThan(0);
  });

  it('should have drawer with every link should have icon and text', () => {
    const wrapper = mount(AppDrawerElement);
    let permanentDrawer: ReactWrapper | undefined;

    wrapper.find(Drawer).forEach((component: ReactWrapper) => {
      permanentDrawer = component.prop('variant') === 'permanent' ? component : undefined;
    });

    (permanentDrawer as ReactWrapper).find(ListItem).forEach((listItem) => {
      expect(listItem.find(ListItemIcon).length).toBe(1);
      expect(listItem.find(ListItemText).length).toBe(1);
    });
  });
});
