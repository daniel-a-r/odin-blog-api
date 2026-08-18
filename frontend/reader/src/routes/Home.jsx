import { useLoaderData, Link } from 'react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const Home = () => {
  const posts = useLoaderData();

  return (
    <div className='grid h-full justify-items-center'>
      <ul className='flex w-full max-w-3xl flex-col gap-5'>
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <li>
              <Card>
                <CardHeader>
                  <CardTitle className='text-2xl'>{post.title}</CardTitle>
                  <CardDescription>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className='max-h-60'>
                  <p className='line-clamp-8'>{post.body}</p>
                </CardContent>
              </Card>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
