import { Suspense } from 'react';

import { Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { AppRouteObject } from '@/entities/route';
import TestPage from '@/pages/test';

const testPage: AppRouteObject = {
  order: 3,
  path: 'testpage',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <TestPage />,
    </Suspense>
  ),
  meta: {
    label: 'sys.menu.testpage',
    icon: <Iconify icon="fa6-solid:bong" size={24} />,
    key: '/testpage',
  },
};

export default testPage;
