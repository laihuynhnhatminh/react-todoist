import { useRef, Suspense } from 'react';
import styled from 'styled-components';

import { CircleLoading } from '@/components/loading';
import { ThemeLayout, ThemeMode } from '@/enums';
import { useSettings } from '@/stores';
import { useThemeToken } from '@/themes/hooks';

import Header from './header';
import Main from './main';
import Nav from './nav';

function MainLayout() {
  const { colorBgElevated, colorTextBase } = useThemeToken();
  const { themeLayout, themeMode } = useSettings();
  const mainEl = useRef(null);
  const navVertical = (
    <div className="z-50 hidden h-full flex-shrink-0 md:block">
      <Nav />
    </div>
  );

  return (
    <StyleWrapper $themeMode={themeMode}>
      <div
        className={`flex h-screen overflow-hidden ${
          themeLayout === ThemeLayout.Horizontal ? 'flex-col' : ''
        }`}
        style={{
          color: colorTextBase,
          background: colorBgElevated,
          transition:
            'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        <Suspense fallback={<CircleLoading />}>
          <Header />
          {navVertical}
          <Main ref={mainEl} />
        </Suspense>
      </div>
    </StyleWrapper>
  );
}
export default MainLayout;

const StyleWrapper = styled.div<{ $themeMode?: ThemeMode }>`
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#2c2c2c' : '#FAFAFA')};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#6b6b6b' : '#C1C1C1')};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#939393' : '##7D7D7D')};
  }
`;
