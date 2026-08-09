import { useLoaderData } from 'react-router';

const Post = () => {
  const data = useLoaderData();

  return <p>Post</p>;
};

export default Post;
