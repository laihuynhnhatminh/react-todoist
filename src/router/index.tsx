import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';

import { AppRouteObject } from '@/entities';
import MainLayout from '@/layouts/main';

import { useRoutesFromModules } from './hooks/useRoutesFromModules';
import { ErrorRoutes } from './routes/errorRoutes';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export default function Router() {
  const permissionRoutes = useRoutesFromModules();
  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: <MainLayout />,
    children: [{ element: <Navigate to={HOMEPAGE} replace />, index: true }, ...permissionRoutes],
  };
  const routes: AppRouteObject[] = [asyncRoutes, ErrorRoutes];
  const router = createBrowserRouter(routes as RouteObject[]);

  return <RouterProvider router={router} />;
}
