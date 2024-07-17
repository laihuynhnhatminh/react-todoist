import { Suspense } from 'react';

import { Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { AppRouteObject } from '@/entities/route';
import Dashboard from '@/pages/dashboard';

const dashboard: AppRouteObject = {
  order: 1,
  path: 'dashboard',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Dashboard />,
    </Suspense>
  ),
  meta: {
    label: 'sys.menu.dashboard',
    icon: <Iconify icon="fa6-solid:table-cells-large" size={24} />,
    key: '/dashboard',
  },
};

export default dashboard;
