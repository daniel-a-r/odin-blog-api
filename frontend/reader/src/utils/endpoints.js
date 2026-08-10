export const baseURL = import.meta.env.DEV
  ? 'http://localhost:3000/api/v1'
  : 'tbd';

export const LOGIN_ENDPOINT = '/auth/login/';
export const SIGN_UP_ENDPOINT = '/auth/sign-up/';
export const LOGOUT_ENDPOINT = '/auth/logout/';
export const REFRESH_ENDPOINT = '/auth/refresh/';
export const READER_POST_ENDPOINT = '/reader/post/';
