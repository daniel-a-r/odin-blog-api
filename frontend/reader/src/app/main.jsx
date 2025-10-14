import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import routes from '@/app/routes';
import { ThemeProvider } from '@/components/theme-provider';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
