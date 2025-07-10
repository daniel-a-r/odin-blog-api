import axios from 'axios';
import { baseURL } from '@/utils/utils';

const authInterceptor = axios.create({
  baseURL: baseURL,
});

authInterceptor.interceptors.request.use(
  (config) => {
    console.log('requst interceptor');
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
    console.log('response interceptor');
    try {
      const originalConfig = error.config;
      if (error.response.status === 401) {
        const response = await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        originalConfig.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalConfig);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
);

export { authInterceptor };
