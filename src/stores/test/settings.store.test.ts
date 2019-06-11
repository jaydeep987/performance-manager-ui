import { LanguageKeys } from '~common/constants';

import { SettingStore } from '../settings';

describe('Test Store: SettingStore', () => {
  let settingStore: SettingStore;

  beforeAll(() => {
    settingStore = new SettingStore();
  });

  it('should have props with default values', () => {
    expect(settingStore.isDrawerOpen).toBeFalsy();
    expect(settingStore.locale).toBe(LanguageKeys.en);
  });

  it('should update drawer prop on action call', () => {
    expect(settingStore.isDrawerOpen).toBeFalsy();
    settingStore.openDrawer();
    expect(settingStore.isDrawerOpen).toBeTruthy();
    settingStore.closeDrawer();
    expect(settingStore.isDrawerOpen).toBeFalsy();
  });

  it('should update local on action call', () => {
    expect(settingStore.locale).toBe(LanguageKeys.en);
    settingStore.setLocale(LanguageKeys.jp);
    expect(settingStore.locale).toBe(LanguageKeys.jp);
  });

  it('should reset store on call of reset', () => {
    settingStore.openDrawer();
    settingStore.setLocale(LanguageKeys.jp);

    expect(settingStore.isDrawerOpen).toBe(true);
    expect(settingStore.locale).toBe(LanguageKeys.jp);

    settingStore.resetStore();

    expect(settingStore.isDrawerOpen).toBe(false);
    // we dont want to reset language
    expect(settingStore.locale).toBe(LanguageKeys.jp);
  });
});
