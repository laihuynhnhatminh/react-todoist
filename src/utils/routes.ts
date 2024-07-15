import { ascend } from 'ramda';

import { AppRouteObject, RouteMeta } from '@/types/router';

/**
 * Filter and sort AppRouteObject array to display children and sort by order
 */
export const menuFilter = (items: AppRouteObject[]) => {
  return items
    .filter((item) => {
      const show = item.meta?.key;
      if (show && item.children) {
        item.children = menuFilter(item.children);
      }
      return show;
    })
    .sort(ascend((item) => item.order || Infinity));
};

/**
 * Dynamically generating routes based on src/router/routes/modules file structure
 */
export const getRoutesFromModules = () => {
  const menuModules: AppRouteObject[] = [];

  const modules = import.meta.glob('/src/router/routes/modules/**/*.tsx', { eager: true });
  Object.keys(modules).forEach((key) => {
    const mod = (modules as any)[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    menuModules.push(...modList);
  });
  return menuModules;
};

/**
 * Get the routes that will be used in sidebar menu
 */
export const getMenuRoutes = (appRouteObjects: AppRouteObject[]) => {
  return menuFilter(appRouteObjects);
};

/**
 * return flatten routes
 */
export const flattenMenuRoutes = (routes: AppRouteObject[]) => {
  return routes.reduce<RouteMeta[]>((prev, curr) => {
    const { meta, children } = curr;
    if (meta) prev.push(meta);
    if (children) prev.push(...flattenMenuRoutes(children));
    return prev;
  }, []);
};
