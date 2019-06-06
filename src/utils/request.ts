import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '~common/config';

/**
 * Sends http request
 */
export function sendRequest<R>(apiOptions: AxiosRequestConfig): Promise<R> {
  return Axios({
    baseURL: config.API_BASE_URL,
    timeout: config.API_TIMEOUT,
    ...apiOptions,
  })
  .then((response: AxiosResponse<R>) => response.data);
}
