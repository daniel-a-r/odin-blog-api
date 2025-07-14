import Home from '@/routes/home/Home.jsx';
import Dashboard from '@/routes/dashboard/Dashboard.jsx';
import AuthorPost from '@/routes/AuthorPost/AuthorPost';
import { dashboardLoader } from '@/loaders.js';
import ErrorRedirect from '@/components/ErrorRedirect.jsx';

const routes = [
  { index: true, Component: Home },
  {
    path: '/dashboard',
    Component: Dashboard,
    loader: dashboardLoader,
    ErrorBoundary: ErrorRedirect,
  },
  { path: '/dashboard/:postId', Component: AuthorPost },
];

export default routes;
