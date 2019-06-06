/* tslint:disable:no-magic-numbers */

export const config = {
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3200',
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TIMEOUT: Number(process.env.API_TIMEOUT) || 3000,
};
