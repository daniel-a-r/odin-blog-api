import _ from 'lodash';
import { Outlet, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LOGOUT_ENDPOINT } from '@/utils/endpoints';
import api, { setAccessToken } from '@/utils/apiClient';

const RootLayout = () => {
  const { user, setUser } = useAuth();

  const handleSignOut = async () => {
    try {
      const { data } = await api.get(LOGOUT_ENDPOINT, {
        withCredentials: true,
      });
      setAccessToken('');
      setUser({});
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mx-auto grid min-h-svh max-w-5xl grid-rows-[max-content_1fr] gap-y-8 p-8'>
      <div className='flex justify-between'>
        <Link to='/'>
          <Button variant='ghost'>Danny&apos;s Blog</Button>
        </Link>
        <div className='flex gap-2'>
          {!_.isEmpty(user) ? (
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
      <div className='px-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
