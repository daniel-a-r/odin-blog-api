import { useRouteError, Link } from 'react-router';
import { buttonVariants } from '@/components/ui/button';

const PostErrorBoundary = () => {
  const error = useRouteError();

  console.log(error.name);
  console.log(error.status);

  if (error.name === 'AxiosError' && error.status === 404) {
    return (
      <div className='h-17/20 flex flex-col items-center justify-center gap-4'>
        <h1 className='text-9xl'>{error.status}</h1>
        <h2 className='text-3xl'>Page Not Found</h2>
        <Link
          to={'/'}
          className={`${buttonVariants({ variant: 'secondary' })} text-lg! h-auto!`}
        >
          Go back to homepage
        </Link>
      </div>
    );
  }

  return <p>Uh Oh, there&apos;s been an error</p>;
};

export default PostErrorBoundary;
