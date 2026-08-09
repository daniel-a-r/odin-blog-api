import api from '@/utils/api';
import { READER_POST_ENDPOINT } from '@/utils/endpoints';

const loadAllPosts = async () => {
  const { data } = await api.get(READER_POST_ENDPOINT);
  return data;
};

const loadPost = async ({ params }) => {
  const data = await api.get(`${READER_POST_ENDPOINT}${params.postId}`);
  return data;
};

export { loadAllPosts, loadPost };
