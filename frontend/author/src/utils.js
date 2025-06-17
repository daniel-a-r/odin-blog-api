let host = import.meta.env.DEV ? 'http://localhost:3000/api/v1' : 'tbd';

export const LOGIN_ENDPOINT = `${host}/auth/login`;
export const POST_ENDPOINT = `${host}/author/post`;
