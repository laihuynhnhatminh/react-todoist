import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';
import { AppRouteObject } from '@/entities/route';

const main: AppRouteObject = {
  order: 1,
  meta: {
    key: '/main',
    label: 'sys.menu.main',
  },
  path: 'main',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  children: [],
};

export default main;
