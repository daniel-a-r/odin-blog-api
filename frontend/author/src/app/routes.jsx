import Home from '@/routes/home/Home.jsx';
import Dashboard from '@/routes/dashboard/Dashboard.jsx';
import PostEditor from '@/routes/postEditor/PostEditor';
import ErrorRedirect from '@/components/ErrorRedirect.jsx';
import { validateLoginStatusLoader, dashboardLoader } from '@/utils/loaders.js';

const routes = [
  {
    path: '/',
    Component: Home,
    loader: validateLoginStatusLoader,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
    loader: dashboardLoader,
    ErrorBoundary: ErrorRedirect,
  },
  { path: '/dashboard/:postId', Component: PostEditor },
];

export default routes;
