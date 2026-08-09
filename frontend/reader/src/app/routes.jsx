import Home from '@/routes/Home';
import RootLayout from '@/components/layouts/RootLayout';
import Login from '@/routes/Login';
import SignUp from '@/routes/SignUp';
import Post from '@/routes/Post';
import RootErrorBoundary from '@/routes/RootErrorBoundary';
import { loadAllPosts, loadPost } from '@/app/loaders';

const routes = [
  {
    Component: RootLayout,
    ErrorBoundary: RootErrorBoundary,
    children: [
      { index: true, Component: Home, loader: loadAllPosts },
      { path: 'login', Component: Login },
      { path: 'sign-up', Component: SignUp },
      {
        path: 'post/:postId',
        Component: Post,
        loader: loadPost,
      },
    ],
  },
];

export default routes;
