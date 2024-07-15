import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';
import SimpleLayout from '@/layouts/simple';
import { AppRouteObject } from '@/types/router';

const Page403 = lazy(() => import('@/pages/sys/error/Page403'));

export const ErrorRoutes: AppRouteObject = {
  element: (
    <SimpleLayout>
      <Suspense fallback={<CircleLoading />}>
        <Outlet />
      </Suspense>
    </SimpleLayout>
  ),
  children: [{ element: <Page403 />, path: '403' }],
};
