import { ThemeProvider } from '@material-ui/styles';
import { mount } from 'enzyme';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { withTranslation } from 'react-i18next';
import sinon from 'sinon';
import { User } from '~model/user';
import { userService } from '~services/user-service';
import { SettingStore } from '~stores/settings';

import { getClassNamesFromStyles, getMockChangeEventObj } from '../../common/test-utils';
import { en } from '../../i18n/en';
import { initI18Next } from '../../i18n/i18n';
import { jp } from '../../i18n/jp';
import { muiTheme } from '../../pages/app/mui-theme';

import { Appbar } from './appbar';
import { styles } from './styles';

describe('Test Component: AppBar', () => {
  let AppBarElement: JSX.Element;
  let settingStore: SettingStore;
  let classes: { [key: string]: string };
  const userInfo: User = {
    _id: '2323fsdf232',
    firstName: 'User1',
    lastName: 'Lastname',
    userName: 'username',
    password: '123',
    sex: 'M',
    role: 'admin',
  };

  beforeAll(() => {
    settingStore = new SettingStore();
    initI18Next();
    classes = getClassNamesFromStyles(styles, muiTheme);
    const Component = withTranslation()(Appbar);
    AppBarElement = (
      <Provider {...{settingStore}}>
        <ThemeProvider theme={muiTheme}>
          <Component classes={classes} />
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render appbar with toolbar and menu button', () => {
    const wrapper = mount(AppBarElement);

    expect(wrapper.find(`div.${classes.toolbar}`).length).toBe(1);
    expect(wrapper.find(`button.${classes.menuButton}`).length).toBe(1);
  });

  it('should change state of drawer when click on menubutton', () => {
    const wrapper = mount(AppBarElement);

    expect(settingStore.isDrawerOpen).toBeFalsy();
    wrapper.find(`button.${classes.menuButton}`).simulate('click');
    expect(settingStore.isDrawerOpen).toBeTruthy();
  });

  it('should have header title (in english)', () => {
    const wrapper = mount(AppBarElement);

    expect(wrapper.find(`.${classes.toolbarLeft}`).last().text()).toBe(en.translation.app.title);
  });

  it ('should have welcome message with user name on right side', () => {
    const sandbox = sinon.createSandbox();
    sandbox.stub(userService, 'getUserInfo').returns(userInfo);

    const wrapper = mount(AppBarElement);

    // Find welcome message
    expect(
      wrapper
      .find(`.${classes.userWelcome}`)
      .last()
      .text(),
    ).toEqual(`Welcome${userInfo.firstName}`);

    sinon.restore();
  });

  it('should have language select box and change language of title when change it', () => {
    const wrapper = mount(AppBarElement);

    // change to japanese
    wrapper
      .find(`.${classes.languageSelect}`)
      .first()
      .props()
      .onChange!(getMockChangeEventObj('jp') as React.FormEvent);
    expect(wrapper.find(`.${classes.toolbarLeft}`).last().text()).toBe(jp.translation.app.title);

    // change back to english
    wrapper
      .find(`.${classes.languageSelect}`)
      .first()
      .props()
      .onChange!(getMockChangeEventObj('en') as React.FormEvent);
    expect(wrapper.find(`.${classes.toolbarLeft}`).last().text()).toBe(en.translation.app.title);
  });
});
