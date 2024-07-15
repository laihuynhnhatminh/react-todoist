import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { MenuProps, Menu } from 'antd';
import Color from 'color';
import { m } from 'framer-motion';
import { CSSProperties, useEffect, useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

import MotionContainer from '@/components/animations/motionContainer';
import { varSlide } from '@/components/animations/variants';
import Logo from '@/components/logo';
import ScrollBar from '@/components/scrollbar';
import { ThemeLayout } from '@/enums';
import { useThemeToken } from '@/hooks';
import { useFlattenedRoute } from '@/router/hooks/useFlattenedRoutes';
import { usePermissionRoutes } from '@/router/hooks/usePermissionRoutes';
import { useRouteToMenu } from '@/router/hooks/useRouteToMenu';
import { useSettingActions, useSettings } from '@/stores/settingStore';
import { menuFilter } from '@/utils/routes';

import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config';

const slideInLeft = varSlide({ distance: 10 }).inLeft;

interface Props {
  readonly closeSideBarDraw?: () => void;
}

export default function Nav(props: Props) {
  /**
   * Page, path + theme data
   */
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { colorPrimary, colorText, colorBgElevated, colorBorder } = useThemeToken();

  const settings = useSettings();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();

  const menuStyle: CSSProperties = {
    background: colorBgElevated,
  };

  /**
   * Menu routing
   */
  const routeToMenu = useRouteToMenu();
  const permissionRoutes = usePermissionRoutes();
  const menuRoutes = menuFilter(permissionRoutes);
  const menuList = routeToMenu(menuRoutes);

  const flattenedRoutes = useFlattenedRoute();

  /**
   * State
   */
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [menuMode, setMenuMode] = useState<MenuProps['mode']>('inline');

  /**
   * useEffectFn
   */
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
   * Events Fn
   */
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };

  // Match the currently clicked one from inside the flattened routing information
  const onClick: MenuProps['onClick'] = ({ key }) => {
    const nextLink = flattenedRoutes?.find((el) => el.key === key);

    if (nextLink?.hideTab && nextLink?.frameSrc) {
      window.open(nextLink?.frameSrc, '_blank');
      return;
    }

    navigate(key);
    props?.closeSideBarDraw?.();
  };

  const setThemeLayout = (themeLayout: ThemeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    });
  };

  const toggleCollapse = () => {
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
        borderRight: `1px dash ${Color(colorBorder).alpha(0.6).toString()}`,
      }}
    >
      <div className="relative flex h-20 items-center justify-center py-4">
        <MotionContainer className="flex items-center">
          <Logo />
          {themeLayout !== ThemeLayout.Mini && (
            <m.div variants={slideInLeft}>
              <span className="ml-2 text-xl font-bold" style={{ color: colorPrimary }}>
                React Todoist
              </span>
            </m.div>
          )}
        </MotionContainer>
        <button
          onClick={toggleCollapse}
          className="absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center !text-gray md:block"
          style={{ color: colorText, borderColor: colorText, fontSize: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined size={20} /> : <MenuFoldOutlined size={20} />}
        </button>
      </div>

      <ScrollBar
        style={{
          height: `calc(100vh - 70px)`,
        }}
      >
        <Menu
          mode={menuMode}
          items={menuList}
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
      </ScrollBar>
    </div>
  );
}
