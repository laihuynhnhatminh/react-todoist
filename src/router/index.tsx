import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';

import MainLayout from '@/layouts/main';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function Router() {
  const asyncRoutes: RouteObject = {
    path: '/',
    element: <MainLayout />,
    children: [{ element: <Navigate to={HOMEPAGE} replace />, index: true }],
  };

  const routes: RouteObject[] = [asyncRoutes];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
