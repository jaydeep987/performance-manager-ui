import { action, observable } from 'mobx';
import { LanguageKeys } from '~common/constants';

/**
 * Store to hold settings
 */
export class SettingStore {
  /**
   * Store's initial state.
   * Use to reset after logout
   */
  private static readonly initialState = {
    locale: LanguageKeys.en,
    isDrawerOpen: false,
  };

  /** Holds current locale string */
  @observable locale = SettingStore.initialState.locale;

  /** Hold status of side drawer */
  @observable isDrawerOpen = SettingStore.initialState.isDrawerOpen;

  /** set local in store */
  @action setLocale(locale: string): void {
    this.locale = locale;
  }

  /** Opens drawer */
  @action openDrawer(): void {
    this.isDrawerOpen = true;
  }

  /** Closes drawer */
  @action closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  /**
   * Resets store to initial state
   */
  @action resetStore(): void {
    this.isDrawerOpen = SettingStore.initialState.isDrawerOpen;
  }
}

export const settingStore = new SettingStore();
