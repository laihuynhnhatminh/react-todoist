import { useMemo } from 'react';

import { getRoutesFromModules } from '../utils';

/**
 * return routes
 */
export function useRoutesFromModules() {
  return useMemo(() => {
    return getRoutesFromModules();
  }, []);
}
