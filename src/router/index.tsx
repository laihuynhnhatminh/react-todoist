import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';

import MainLayout from '@/layouts/main';
import { ErrorRoutes } from './routes/errorRoutes';
import { usePermissionRoutes } from './hooks/usePermissionRoutes';
import { AppRouteObject } from '@/entities';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function Router() {
  const permissionRoutes = usePermissionRoutes();
  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: <MainLayout />,
    children: [{ element: <Navigate to={HOMEPAGE} replace />, index: true }, ...permissionRoutes],
  };
  const routes: AppRouteObject[] = [asyncRoutes, ErrorRoutes];
  const router = createBrowserRouter(routes as RouteObject[]);

  return <RouterProvider router={router} />;
}
