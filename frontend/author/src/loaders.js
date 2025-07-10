import { authInterceptor } from '@/utils/axios.js';
import { POST_ENDPOINT } from '@/utils/utils.js';

export const dashboardLoader = async () => {
  const interceptorData = authInterceptor.get(POST_ENDPOINT);
  return interceptorData;
};
