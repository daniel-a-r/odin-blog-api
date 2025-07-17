import { redirect } from 'react-router';
import { authInterceptor } from '@/utils/axios.js';
import { POST_ENDPOINT } from '@/utils/utils.js';

export const validateLoginStatusLoader = async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return redirect('/dashboard');
  }
};

export const dashboardLoader = async () => {
  const interceptorData = authInterceptor.get(POST_ENDPOINT);
  return interceptorData;
};

export const postEditorLoader = async ({ params }) => {
  const response = await authInterceptor.get(POST_ENDPOINT + params.postId);
  return response.data.post;
};
