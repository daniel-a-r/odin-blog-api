import Home from '@/routes/Home';
import RootLayout from '@/components/layouts/RootLayout';
import Login from '@/routes/Login';
import SignUp from '@/routes/SignUp';

const routes = [
  {
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'sign-up', Component: SignUp },
    ],
  },
];

export default routes;
