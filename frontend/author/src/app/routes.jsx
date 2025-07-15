import Home from '@/routes/home/Home.jsx';
import Dashboard from '@/routes/dashboard/Dashboard.jsx';
import PostEditor from '@/routes/PostEditor/PostEditor';
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
  { path: '/dashboard/:postId', Component: PostEditor },
];

export default routes;
