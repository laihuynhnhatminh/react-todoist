import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Color from 'color';
import { CSSProperties, useEffect, useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config';
import Logo from '@/components/logo';
import { ThemeLayout } from '@/enums';
import { useSettings, useSettingActions } from '@/stores';
import { useThemeToken } from '@/themes/hooks';
import { MenuProps } from 'antd';

type Props = {
  readonly closeSideBarDrawer?: () => void;
};

export default function Nav(props: Props) {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { colorPrimary, colorTextBase, colorBgElevated, colorBorder } = useThemeToken();

  const settings = useSettings();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();

  const menuStyle: CSSProperties = {
    background: colorBgElevated,
  };

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
            <div>
              <span className="ml-2 text-xl font-bold" style={{ color: colorPrimary }}>
                React Todoist
              </span>
            </div>
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
    </div>
  );
}
