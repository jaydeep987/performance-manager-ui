/** Various sizes for svg icon */
export const IconSize = {
  SM: 1,
  MD: 1.5,
  MD1: 1.8,
  MD2: 2,
  LG: 2.5,
};

/** Language keys */
export const LanguageKeys = {
  en: 'en',
  jp: 'jp',
};

/** Enum of languages with language key and text */
export const Languages = {
  [LanguageKeys.en]: 'English',
  [LanguageKeys.jp]: '日本語',
};

/**
 * Various response status codes
 */
export enum ResponseStatus {
  OK = 200,
  OK_CREATED = 201,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  BAD_REQUEST = 400,
  AUTH_FAILED = 401,
}
