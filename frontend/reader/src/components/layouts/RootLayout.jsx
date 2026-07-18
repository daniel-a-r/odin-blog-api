import { Button } from '@/components/ui/button';
import { Outlet } from 'react-router';
import { Link } from 'react-router';

const RootLayout = () => {
  return (
    <div className='mx-auto grid h-svh max-w-5xl grid-rows-[max-content_1fr] px-8'>
      <div className='flex justify-between py-4'>
        <Link to='/'>
          <Button variant='ghost'>Danny&apos;s Blog</Button>
        </Link>
        <div className='flex gap-2'>
          <Link to='login'>
            <Button variant='outline'>Login</Button>
          </Link>
          <Link to='sign-up'>
            <Button variant='outline'>Sign Up</Button>
          </Link>
        </div>
      </div>
      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
