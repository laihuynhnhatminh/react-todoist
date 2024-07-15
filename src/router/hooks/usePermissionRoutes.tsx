import { isEmpty } from 'ramda';
import { lazy, Suspense, useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';
import { BasicStatus, PermissionType } from '@/enums';
import { useUserInfo } from '@/stores/userStore';
import { Permission } from '@/types';
import { AppRouteObject } from '@/types/router';
import { flattenTrees } from '@/utils/tree';

const entryPath = 'src/pages';
const pages = import.meta.glob('/src/pages/**/*.tsx');
export const pagesSelect = Object.entries(pages).map(([path]) => {
  const pagePath = path.replace(entryPath, '');
  return {
    label: pagePath,
    value: pagePath,
  };
});

export function usePermissionRoutes() {
  const { permissions } = useUserInfo();

  return useMemo(() => {
    const flattenedPermissions = flattenTrees(permissions);
    const permissionRoutes = transformPermissionToMenuRoutes(
      permissions || [],
      flattenedPermissions,
    );

    return [...permissionRoutes];
  }, [permissions]);
}

/**
 * transform Permission[] to  AppRouteObject[]
 * @param permissions
 * @param parent
 */
function transformPermissionToMenuRoutes(
  permissions: Permission[],
  flattenedPermissions: Permission[],
): AppRouteObject[] {
  return permissions.map((permission) => {
    const {
      route,
      type,
      label,
      icon,
      order,
      hide,
      hideTab,
      status,
      frameSrc,
      component,
      parentId,
      children = [],
    } = permission;

    const appRoute: AppRouteObject = {
      path: route,
      meta: {
        label,
        key: getCompleteRoute(permission, flattenedPermissions),
        hideMenu: !!hide,
        hideTab,
        disabled: status === BasicStatus.DISABLE,
      },
    };

    if (order) appRoute.order = order;
    if (icon) appRoute.meta!.icon = icon;
    if (frameSrc) appRoute.meta!.frameSrc = frameSrc;

    if (type === PermissionType.CATALOGUE) {
      appRoute.meta!.hideTab = true;
      if (!parentId) {
        appRoute.element = (
          <Suspense fallback={<CircleLoading />}>
            <Outlet />
          </Suspense>
        );
      }
      appRoute.children = transformPermissionToMenuRoutes(children, flattenedPermissions);

      if (!isEmpty(children)) {
        appRoute.children?.unshift({
          index: true,
          element: <Navigate to={children[0].route} replace />,
        });
      }
    } else if (type === PermissionType.MENU) {
      const Element = lazy(resolveComponent(component!) as any);
      if (frameSrc) {
        appRoute.element = <Element src={frameSrc} />;
      } else {
        appRoute.element = (
          <Suspense fallback={<CircleLoading />}>
            <Element />
          </Suspense>
        );
      }
    }

    return appRoute;
  });
}

function resolveComponent(path: string) {
  return pages[`${entryPath}${path}`];
}

/**
 * Splicing from the root permission route to the current permission route
 * @param {Permission} permission - current permission
 * @param {Permission[]} flattenedPermissions - flattened permission array
 * @param {string} route - parent permission route
 * @returns {string} - The complete route after splicing
 */
function getCompleteRoute(permission: Permission, flattenedPermissions: Permission[], route = '') {
  const currentRoute = route ? `/${permission.route}${route}` : `/${permission.route}`;

  if (permission.parentId) {
    const parentPermission = flattenedPermissions.find((p) => p.id === permission.parentId)!;
    return getCompleteRoute(parentPermission, flattenedPermissions, currentRoute);
  }

  return currentRoute;
}
