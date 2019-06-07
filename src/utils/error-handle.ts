import { AxiosError } from 'axios';
import i18next from 'i18next';
import { ResponseStatus } from '~common/constants';
/* eslint-disable prefer-destructuring */

/**
 * Common function to extract error message from api error response.
 * It supports to check provided response code and get provided message for that code.
 * Default message will be system error message.
 */
export function getApiErrorMessage(params: GetApiErrorMessageParams): string {
  const {
    error,
    translate,
    code,
    codeMessage,
  } = params;
  let message: string;

  if (typeof error === 'string') {
    message = translate('errorMessage.systemError');
  } else if (code && error.response && error.response.status === code) {
    message = codeMessage as string;
  } else if (error.response && error.response.data && error.response.data.errorDetails) {
    message = error.response.data.errorDetails.message;
  } else if (error.response && error.response.status === ResponseStatus.AUTH_FAILED) {
    message = translate('errorMessage.unauthorizedAccess');
  } else if (error.response && error.response.status === ResponseStatus.INTERNAL_ERROR) {
    message = translate('errorMessage.internalError');
  } else if (error.response && error.response.status === ResponseStatus.BAD_REQUEST) {
    message = translate('errorMessage.badRequest');
  } else if (error.response && error.response.status === ResponseStatus.NOT_FOUND) {
    message = translate('errorMessage.notFound');
  } else {
    message = translate('errorMessage.systemError');
  }

  return message;
}

interface GetApiErrorMessageParams {
  /** Error object/string retrieved from api */
  error: string | AxiosError;
  /** Translate function */
  translate: i18next.TFunction;
  /** Response code you want to check with api returned error code */
  code?: ResponseStatus;
  /** Message for code you provided */
  codeMessage?: string;
}
