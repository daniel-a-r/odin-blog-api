import { Button } from '@/components/ui/button';
import { Outlet, Link } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/utils/api';
import { LOGOUT_ENDPOINT } from '@/utils/endpoints';

const RootLayout = () => {
  const { accessToken, setAccessToken } = useAuth();

  const handleSignOut = async () => {
    try {
      const { data } = await api.get(LOGOUT_ENDPOINT, {
        withCredentials: true,
      });
      setAccessToken('');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mx-auto grid h-svh max-w-5xl grid-rows-[max-content_1fr] px-8'>
      <div className='flex justify-between py-4'>
        <Link to='/'>
          <Button variant='ghost'>Danny&apos;s Blog</Button>
        </Link>
        <div className='flex gap-2'>
          {accessToken ? (
            <Button variant='outline' onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Link to='login'>
                <Button variant='outline'>Login</Button>
              </Link>
              <Link to='sign-up'>
                <Button variant='outline'>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
