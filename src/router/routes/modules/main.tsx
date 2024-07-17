import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';
import { AppRouteObject } from '@/entities/route';
import Dashboard from '@/pages/main/dashboard';
import TaskLog from '@/pages/main/log';

const main: AppRouteObject = {
  order: 1,
  path: 'main',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'sys.menu.main',
    key: '/main',
  },
  children: [
    {
      index: true,
      element: <Navigate to="dashboard" replace />,
    },
    {
      path: 'dashboard',
      element: <Dashboard />,
      meta: { label: 'sys.menu.dashboard', key: '/main/dashboard' },
    },
    {
      path: 'log',
      element: <TaskLog />,
      meta: { label: 'sys.menu.log', key: '/main/log' },
    },
  ],
};

export default main;
