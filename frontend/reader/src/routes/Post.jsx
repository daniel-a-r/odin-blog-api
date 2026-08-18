import { useLoaderData } from 'react-router';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const Post = () => {
  const { post } = useLoaderData();

  return (
    <div className='flex flex-col gap-2'>
      <CardHeader>
        <CardTitle className='text-2xl'>{post.title}</CardTitle>
        <CardDescription>
          {new Date(post.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='whitespace-pre-wrap'>{post.body}</p>
      </CardContent>
    </div>
  );
};

export default Post;
