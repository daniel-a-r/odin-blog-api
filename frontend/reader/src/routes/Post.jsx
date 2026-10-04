import { useLoaderData } from 'react-router';
import { useState } from 'react';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Comments from '@/components/Comments';
import { useEffect } from 'react';

const Post = () => {
  const { post } = useLoaderData();
  const [comments, setComments] = useState(post.comments);

  useEffect(() => {
    setComments(post.comments);
  }, [post]);

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
      <Comments comments={comments} setComments={setComments} />
    </div>
  );
};

export default Post;
