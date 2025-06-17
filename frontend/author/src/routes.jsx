import Home from './routes/home/Home.jsx';
import Dashboard from './routes/dashboard/Dashboard.jsx';
import { dashboardLoader } from './loaders.js';

const routes = [
  { index: true, Component: Home },
  { path: '/dashboard', Component: Dashboard, loader: dashboardLoader },
];

export default routes;
