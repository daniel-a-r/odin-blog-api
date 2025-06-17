import axios from 'axios';
import { POST_ENDPOINT } from './utils';

export const dashboardLoader = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const data = await axios.get(POST_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};
