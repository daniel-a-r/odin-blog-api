import { format } from 'date-fns';

export const baseURL = import.meta.env.DEV
  ? 'http://localhost:3000/api/v1'
  : 'https://odin-blog-api-backend-jc9y.onrender.com/api/v1';

export const LOGIN_ENDPOINT = '/auth/login';
export const POST_ENDPOINT = '/author/post/';
export const VALIDATE_ENDPOINT = '/auth/validate';
export const LOGOUT_ENDPOINT = '/auth/logout';
export const REFRESH_ENDPOINT = '/auth/refresh/';
export const USER_ENDPOINT = '/auth/user';

export const formatDate = (date) => {
  return format(date, 'PP p');
};
