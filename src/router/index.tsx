import { createHashRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';

import Page403 from '@/pages/sys/error/Page403';
import { AppRouteObject } from '@/types/router';

import { ErrorRoutes } from './routes/errorRoutes';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function Router() {
  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: <Page403 />,
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }],
  };

  const routes = [asyncRoutes, ErrorRoutes];

  const router = createHashRouter(routes as unknown as RouteObject[]);

  return <RouterProvider router={router} />;
}
