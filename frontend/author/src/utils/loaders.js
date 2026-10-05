import { redirect } from 'react-router';
import api from '@/utils/axios.js';
import { POST_ENDPOINT } from '@/utils/utils.js';

export const validateLoginStatusLoader = async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return redirect('/dashboard');
  }
};

export const dashboardLoader = async () => {
  const interceptorData = api.get(POST_ENDPOINT);
  return interceptorData;
};

export const postEditorLoader = async ({ params }) => {
  const response = await api.get(POST_ENDPOINT + params.postId);
  return response.data.post;
};
