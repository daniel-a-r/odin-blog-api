import { useLoaderData } from 'react-router';

const Post = () => {
  const { post } = useLoaderData();

  console.log(post);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.createdAt}</p>
      <p>{post.body}</p>
    </>
  );
};

export default Post;
