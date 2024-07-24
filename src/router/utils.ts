import { ascend } from 'ramda';

import { AppRouteObject, RouteMeta } from '@/entities';

/**
 * return menu routes
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
 * get routes from src/router/routes/modules
 */
export function getRoutesFromModules() {
  const menuModules: AppRouteObject[] = [];
  const modules = import.meta.glob('./routes/modules/**/*.tsx', { eager: true });
  Object.keys(modules).forEach((key) => {
    const module = (modules as any)[key].default || {};
    const moduleList = Array.isArray(module) ? [...module] : [module];
    menuModules.push(...moduleList);
  });
  return menuModules;
}

/**
 * return the routes will be used in sidebar menu
 */
export function getMenuRoutes(appRouteObjects: AppRouteObject[]) {
  return menuFilter(appRouteObjects);
}

/**
 * return flatten routes
 */
export function flattenMenuRoutes(routes: AppRouteObject[]) {
  return routes.reduce<RouteMeta[]>((prev, item) => {
    const { meta, children } = item;
    if (meta) prev.push(meta);
    if (children) prev.push(...flattenMenuRoutes(children));
    return prev;
  }, []);
}
