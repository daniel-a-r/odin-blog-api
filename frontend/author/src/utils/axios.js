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

    if (accessToken === null) {
      throw new Error('accessToken does not exist');
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

authInterceptor.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    try {
      const originalConfig = error.config;
      if (error.response.status === 401) {
        const response = await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        originalConfig.headers.Authorization = `Bearer ${accessToken}`;
        console.log('retrying request with refresh token');
        return axios(originalConfig);
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem('accessToken');
      return Promise.reject(error);
    }
  },
);

export { authInterceptor };
export default instance;
