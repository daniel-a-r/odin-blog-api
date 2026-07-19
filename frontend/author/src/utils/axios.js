import axios from 'axios';
import { baseURL } from '@/utils/utils';

const instance = axios.create({
  baseURL: baseURL,
});

const authInterceptor = axios.create({
  baseURL: baseURL,
});

authInterceptor.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

authInterceptor.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    try {
      const originalConfig = error.config;

      if (error.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        const response = await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        });

        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        originalConfig.headers.Authorization = `Bearer ${accessToken}`;

        console.log('retrying request with refresh token');

        return authInterceptor(originalConfig);
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem('accessToken');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export { authInterceptor };
export default instance;
