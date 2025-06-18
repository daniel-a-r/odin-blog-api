export const baseURL = import.meta.env.DEV
  ? 'http://localhost:3000/api/v1'
  : 'tbd';

export const LOGIN_ENDPOINT = `${baseURL}/auth/login`;
export const POST_ENDPOINT = `${baseURL}/author/post`;
