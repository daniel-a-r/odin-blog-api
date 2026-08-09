import { useLoaderData } from 'react-router';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Home = () => {
  const posts = useLoaderData();

  return (
    <div className='grid h-full justify-items-center'>
      <ul className='flex w-full max-w-3xl flex-col gap-5'>
        {posts.map((post) => (
          <li key={post.id}>
            <Card>
              <CardHeader>
                <CardTitle className='text-3xl'>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.body}</p>
              </CardContent>
              <CardFooter>
                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
