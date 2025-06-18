import { authInterceptor } from './utils/axios';
import { POST_ENDPOINT } from './utils';

export const dashboardLoader = async () => {
  const interceptorData = authInterceptor.get(POST_ENDPOINT);
  return interceptorData;
};
