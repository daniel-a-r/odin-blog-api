import { useRouteError, Link } from 'react-router';
import { buttonVariants } from '@/components/ui/button';

const RootErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className='flex h-svh flex-col items-center justify-center gap-4'>
      {error.status === 404 ? (
        <>
          <h1 className='text-9xl'>{error.status}</h1>
          <h2 className='text-3xl'>Page Not Found</h2>
        </>
      ) : (
        <h2 className='text-3xl'>Oops something went wrong</h2>
      )}
      <Link
        to={'/'}
        className={`${buttonVariants({ variant: 'secondary' })} text-lg! h-auto!`}
      >
        Go back to homepage
      </Link>
    </div>
  );
};

export default RootErrorBoundary;
