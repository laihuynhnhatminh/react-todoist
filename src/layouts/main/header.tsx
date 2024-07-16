import { Drawer } from 'antd';
import Color from 'color';
import { CSSProperties, useState } from 'react';

import { Iconify } from '@/components/icon';
import IconButton from '@/components/icon/iconButton';
import SvgIcon from '@/components/icon/svgIcon';
import Logo from '@/components/logo';
import { ThemeLayout } from '@/enums';
import { useSettings } from '@/stores';
import { useResponsive, useThemeToken } from '@/themes/hooks';

import { NAV_WIDTH, NAV_COLLAPSED_WIDTH, HEADER_HEIGHT } from './config';
import Nav from './nav';

type Props = {
  readonly className?: string;
};

export default function Header({ className = '' }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { themeLayout } = useSettings();
  const { colorBgElevated, colorBorder } = useThemeToken();
  const { screenMap } = useResponsive();

  const headerStyle: CSSProperties = {
    position: themeLayout === ThemeLayout.Horizontal ? 'relative' : 'fixed',
    borderBottom:
      themeLayout === ThemeLayout.Horizontal
        ? `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`
        : '',
    backgroundColor: Color(colorBgElevated).alpha(1).toString(),
  };

  if (screenMap.md) {
    headerStyle.right = '0px';
    headerStyle.left = 'auto';
    headerStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    }px)`;
  } else {
    headerStyle.width = '100vw';
  }

  return (
    <>
      <div className={`z-20 w-full ${className}`} style={headerStyle}>
        <div
          className="flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
          style={{
            height: HEADER_HEIGHT,
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        >
          <div className="flex items-baseline">
            {themeLayout !== ThemeLayout.Horizontal ? (
              <IconButton onClick={() => setDrawerOpen(true)} className="h-10 w-10 md:hidden">
                <SvgIcon icon="ic-menu" size="24" />
              </IconButton>
            ) : (
              <Logo />
            )}
            <div className="ml-4 hidden md:block">Text</div>
          </div>

          <div className="flex">
            <IconButton onClick={() => window.open('https://github.com/d3george/slash-admin')}>
              <Iconify icon="mdi:github" size={24} />
            </IconButton>
            <IconButton onClick={() => window.open('https://discord.gg/fXemAXVNDa')}>
              <Iconify icon="carbon:logo-discord" size={24} />
            </IconButton>
          </div>
        </div>
      </div>
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        styles={{
          header: {
            display: 'none',
          },
          body: {
            padding: 0,
            overflow: 'hidden',
          },
        }}
        width="auto"
      >
        <Nav closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
