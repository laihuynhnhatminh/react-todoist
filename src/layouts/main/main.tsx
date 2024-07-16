import { Content } from 'antd/es/layout/layout';
import { CSSProperties, forwardRef } from 'react';
import { Outlet } from 'react-router-dom';

import { ThemeLayout } from '@/enums';
import { useSettings } from '@/stores';
import { useResponsive } from '@/themes/hooks';

import { HEADER_HEIGHT, NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config';

const Main = forwardRef<HTMLElement>((_, ref) => {
  const { themeLayout } = useSettings();
  const { screenMap } = useResponsive();

  const mainStyle: CSSProperties = {
    paddingTop: HEADER_HEIGHT,
    transition: 'padding 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%',
  };

  if (screenMap.md) {
    mainStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    })`;
  } else {
    mainStyle.width = '100vw';
  }

  return (
    <Content ref={ref} style={mainStyle} className="flex overflow-auto">
      <div className="sm-auto h-full w-full flex-grow sm:p-2">
        <Outlet />
      </div>
    </Content>
  );
});

export default Main;
