import { useCallback, useMemo } from 'react';

import { flattenMenuRoutes, menuFilter } from '@/utils/routes';

import { usePermissionRoutes } from './usePermissionRoutes';

export function useFlattenedRoute() {
  const flattenRoutes = useCallback(flattenMenuRoutes, []);
  const permissionRoutes = usePermissionRoutes();
  return useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return flattenRoutes(menuRoutes);
  }, [flattenRoutes, permissionRoutes]);
}
