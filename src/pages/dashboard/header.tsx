import Color from 'color';
import { ThemeLayout } from '@/enums';
import { useThemeToken } from '@/hooks';
import { useResponsive } from '@/hooks/useResponsive';
import { useSettings } from '@/stores/settingStore';
import { CSSProperties, useState } from 'react';
import { HEADER_HEIGHT, NAV_COLLAPSED_WIDTH, NAV_WIDTH, OFFSET_HEADER_HEIGHT } from './config';
import { Drawer } from 'antd';
import Logo from '@/components/logo';
import { IconButton, Iconify, SvgIcon } from '@/components/icon';

interface Props {
  className?: string;
  offsetTop?: boolean;
}

export default function Header({ className = '', offsetTop = false }: Props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { themeLayout, breadCrumb } = useSettings();
  const { colorBgElevated, colorBorder } = useThemeToken();
  const { screenMap } = useResponsive();

  console.log();

  const headerStyle: CSSProperties = {
    position: themeLayout === ThemeLayout.Horizontal ? 'relative' : 'fixed',
    borderBottom:
      themeLayout === ThemeLayout.Horizontal
        ? `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`
        : '',
    backgroundColor: Color(colorBgElevated).alpha(1).toString(),
  };

  if (themeLayout === ThemeLayout.Horizontal) {
    headerStyle.width = '100vw';
  } else if (screenMap.md) {
    headerStyle.right = '0px';
    headerStyle.left = 'auto';
    headerStyle.width = `calc(100vw - ${themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH})px`;
  } else {
    headerStyle.width = `100vw`;
  }

  return (
    <>
      <header className={`z-20 w-full ${className}`} style={headerStyle}>
        {/* Baseline for header wrapper */}
        <div
          className="flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6 2xl:px-10"
          style={{
            height: offsetTop ? OFFSET_HEADER_HEIGHT : HEADER_HEIGHT,
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        >
          {/* Baseline for leftside icon */}
          <div className="flex items-baseline">
            {themeLayout !== ThemeLayout.Horizontal ? (
              <IconButton onClick={() => setOpenDrawer(true)} className="h-10 w-10 md:hidden">
                <SvgIcon icon="menu-icon" size="24" />
              </IconButton>
            ) : (
              <Logo />
            )}
            <div className="ml-4 hidden md:block">{breadCrumb ? <div>BreadCrumb</div> : null}</div>
          </div>

          {/* Baseline for other icon */}
          <div className="flex">
            <IconButton onClick={() => window.open('https://github.com/d3george/slash-admin')}>
              <Iconify icon="mdi:github" size={24} />
            </IconButton>
            <IconButton onClick={() => window.open('https://github.com/d3george/slash-admin')}>
              <Iconify icon="mdi:github" size={24} />
            </IconButton>
            <IconButton onClick={() => window.open('https://github.com/d3george/slash-admin')}>
              <Iconify icon="mdi:github" size={24} />
            </IconButton>
            <IconButton onClick={() => window.open('https://discord.gg/fXemAXVNDa')}>
              <Iconify icon="carbon:logo-discord" size={24} />
            </IconButton>
            <IconButton onClick={() => window.open('https://discord.gg/fXemAXVNDa')}>
              <Iconify icon="carbon:logo-discord" size={24} />
            </IconButton>
            <IconButton onClick={() => window.open('https://discord.gg/fXemAXVNDa')}>
              <Iconify icon="carbon:logo-discord" size={24} />
            </IconButton>
            <IconButton onClick={() => window.open('https://discord.gg/fXemAXVNDa')}>
              <Iconify icon="carbon:logo-discord" size={24} />
            </IconButton>
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
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
        <div>Fake Navbar</div>
      </Drawer>
    </>
  );
}
