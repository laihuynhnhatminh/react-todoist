import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';
import SimpleLayout from '@/layouts/simple';

const Page403 = lazy(() => import('@/pages/sys/error/Page403'));

export const ErrorRoutes: RouteObject = {
  element: (
    <SimpleLayout>
      <Suspense fallback={<CircleLoading />}>
        <Outlet />
      </Suspense>
    </SimpleLayout>
  ),
  children: [{ path: '403', element: <Page403 /> }],
};
