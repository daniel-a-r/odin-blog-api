import axios from 'axios';
import { baseURL } from '@/utils/endpoints.js';

let accessToken = null;

const setAxiosAccessToken = (token) => {
  accessToken = token;
};

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.status === 401 && originalRequest.url !== '/auth/refresh/') {
      try {
        const { data } = await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        });

        const newToken = data.accessToken;
        setAxiosAccessToken(newToken);

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token request failed:', refreshError);
        setAxiosAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
export { setAxiosAccessToken };
