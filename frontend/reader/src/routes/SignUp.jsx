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

const SignUp = () => {
  const signUp = (formData) => {
    console.log(formData);
  };

  return (
    <div className='grid h-full content-center sm:justify-center'>
      <Card className='max-w-lg sm:w-md'>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardAction>Login</CardAction>
        </CardHeader>
        <CardContent>
          <form action={signUp} id='signUpForm' className='grid gap-4'>
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
