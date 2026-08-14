import axios from 'axios';
import { baseURL } from '@/utils/endpoints.js';

let getAccessToken = () => null;
let setAccessToken = () => {};

const configureAuth = ({ getToken, setToken }) => {
  ((getAccessToken = getToken), (setAccessToken = setToken));
};

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const regex = /^\/auth\//;
    const isAuthEndpoint = originalRequest.url.match(regex);

    if (error.status === 401 && !isAuthEndpoint && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        });

        const newToken = data.accessToken;
        setAccessToken(newToken);

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token request failed:', refreshError);
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
export { configureAuth };
