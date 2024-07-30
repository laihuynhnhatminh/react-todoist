import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Color from 'color';
import { CSSProperties, useEffect, useState } from 'react';
import { NavLink, useLocation, useMatches, useNavigate } from 'react-router-dom';

import { IconButton, Iconify } from '@/components/icon';
import Logo from '@/components/logo';
import Scrollbar from '@/components/scrollbar';
import { ThemeLayout } from '@/enums';
import { useRoutesFromModules, useRouteToMenu } from '@/router/hooks';
import { menuFilter } from '@/router/utils';
import { useSettings, useSettingActions } from '@/stores';
import { useThemeToken } from '@/themes/hooks';

import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config';

type Props = {
  readonly closeSideBarDrawer?: () => void;
};

export default function Nav(props: Props) {
  const navigate = useNavigate();
  const matches = useMatches();
  const settings = useSettings();
  const { pathname } = useLocation();
  const { colorPrimary, colorTextBase, colorBgElevated, colorBorder } = useThemeToken();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();
  const menuStyle: CSSProperties = {
    background: colorBgElevated,
  };

  /**
   * Route into Menu item
   * TODO: Add a way to include a new menu route if in a project page
   */
  const routeToMenu = useRouteToMenu();
  const routesFromModules = useRoutesFromModules();
  const menuRoutes = menuFilter(routesFromModules);
  const menuItems = routeToMenu(menuRoutes);

  /**
   * state
   */
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [menuMode, setMenuMode] = useState<MenuProps['mode']>('inline');

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      const openKeys = matches
        .filter((match) => match.pathname !== '/')
        .map((match) => match.pathname);
      setOpenKeys(openKeys);
    }
  }, [matches, themeLayout]);

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      setCollapsed(false);
      setMenuMode('inline');
    }
    if (themeLayout === ThemeLayout.Mini) {
      setCollapsed(true);
      setMenuMode('inline');
    }
  }, [themeLayout]);

  /**
   * events
   */
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };
  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
    props?.closeSideBarDrawer?.();
  };

  const setThemeLayout = (themeLayout: ThemeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    });
  };

  const toggleCollapsed = () => {
    if (!collapsed) {
      setThemeLayout(ThemeLayout.Mini);
    } else {
      setThemeLayout(ThemeLayout.Vertical);
    }
    setCollapsed(!collapsed);
  };

  return (
    <div
      className="flex h-full flex-col"
      style={{
        width: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
        borderRight: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,
      }}
    >
      <div className="relative flex h-20 items-center justify-center py-4">
        <div className="flex items-center">
          <Logo />
          {themeLayout !== ThemeLayout.Mini && (
            <NavLink to="/">
              <span className="ml-2 text-xl font-bold" style={{ color: colorPrimary }}>
                React Todoist
              </span>
            </NavLink>
          )}
        </div>
        <button
          onClick={toggleCollapsed}
          className="absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center !text-gray md:block"
          style={{ color: colorTextBase, borderColor: colorTextBase, fontSize: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined size={20} /> : <MenuFoldOutlined size={20} />}
        </button>
      </div>

      <div className="flex flex-col justify-between">
        <Scrollbar
          className="flex"
          style={{
            height: `calc(100dvh - 130px)`,
          }}
        >
          <Menu
            mode={menuMode}
            items={menuItems}
            className="h-full !border-none"
            defaultOpenKeys={openKeys}
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={onClick}
            style={menuStyle}
            inlineCollapsed={collapsed}
          />
        </Scrollbar>
        <div className="flex w-full">
          <IconButton className="flex w-full gap-2 px-6" style={{ justifyContent: 'start' }}>
            <Iconify icon="fa6-solid:right-from-bracket" size={24} />
            {!collapsed && <div>Sign Out</div>}
          </IconButton>
        </div>
      </div>
    </div>
  );
}
