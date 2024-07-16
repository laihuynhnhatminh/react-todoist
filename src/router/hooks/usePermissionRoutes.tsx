import { useMemo } from 'react';

import { getRoutesFromModules } from '../utils';

/**
 * return routes about permission
 */
export function usePermissionRoutes() {
  return useMemo(() => {
    return getRoutesFromModules();
  }, []);
}
