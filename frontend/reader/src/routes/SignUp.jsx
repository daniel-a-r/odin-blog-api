import _ from 'lodash';
import { useState, useEffect } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { SIGN_UP_ENDPOINT } from '@/utils/endpoints';
import api, { setAccessToken } from '@/utils/apiClient';

const SignUp = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!_.isEmpty(user)) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignUp = async (formData) => {
    const body = {
      username: formData.get('username'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    try {
      const { data } = await api.post(SIGN_UP_ENDPOINT, body, {
        withCredentials: true,
      });
      setAccessToken(data.accessToken);
      setUser({ id: data.user.id, username: data.user.username });
      navigate('/');
    } catch (error) {
      if ((error.status = 400 && error.response?.data.validationErrors)) {
        const { validationErrors } = error.response.data;
        const validationErrorMessages = validationErrors.map(
          (validationError) => validationError.msg,
        );
        setErrorMessages(validationErrorMessages);
        console.log();
      } else {
        throw error;
      }
    }
  };

  return (
    <div className='grid h-full content-center sm:justify-center'>
      <Card className='sm:w-md max-w-lg'>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardAction>Login</CardAction>
        </CardHeader>
        <CardContent>
          <form action={handleSignUp} id='signUpForm' className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='username'>Username</Label>
              <Input type='text' id='username' name='username' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input type='password' id='password' name='password' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type='submit' form='signUpForm'>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
