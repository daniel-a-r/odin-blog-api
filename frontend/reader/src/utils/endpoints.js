export const baseURL = import.meta.env.DEV
  ? 'http://localhost:3000/api/v1'
  : 'tbd';

export const LOGIN_ENDPOINT = '/auth/login/';
export const VALIDATE_ENDPOINT = '/auth/validate/';
export const LOGOUT_ENDPOINT = '/auth/logout/';
export const POST_ENDPOINT = '/reader/post/';
