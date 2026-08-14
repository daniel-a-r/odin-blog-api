import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api from '@/utils/api';
import { LOGIN_ENDPOINT } from '@/utils/endpoints';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const handleLogin = async (formData) => {
    const body = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    try {
      const { data } = await api.post(LOGIN_ENDPOINT, body, {
        withCredentials: true,
      });
      setAccessToken(data.accessToken);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='grid h-full content-center sm:justify-center'>
      <Card className='sm:w-md max-w-lg'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardAction>Sign Up</CardAction>
        </CardHeader>
        <CardContent>
          <form action={handleLogin} id='loginForm' className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='username'>Username</Label>
              <Input type='text' id='username' name='username' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input type='password' id='password' name='password' required />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type='submit' form='loginForm'>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
