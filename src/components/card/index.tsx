import { CSSProperties } from 'react';

import { ThemeMode } from '@/enums';
import { useSettings } from '@/stores';
import { useThemeToken } from '@/themes/hooks';

type Props = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
};

export default function Card({ children, ...other }: Props) {
  const { colorBgContainer } = useThemeToken();
  const { themeMode } = useSettings();

  const bowShadow: { [key in ThemeMode]: string } = {
    light: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
    dark: 'rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px',
  };
  return (
    <div
      style={{
        background: colorBgContainer,
        backgroundImage: 'none',
        boxShadow: bowShadow[themeMode],
        transition: `box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
        borderRadius: '16px',
        padding: '24px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      }}
      {...other}
    >
      {children}
    </div>
  );
}
