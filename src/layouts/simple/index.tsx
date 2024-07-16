import { useThemeToken } from '@/themes/hooks';

import HeaderSimple from './header';

type Props = {
  readonly children: React.ReactNode;
};
export default function SimpleLayout({ children }: Props) {
  const { colorBgElevated, colorTextBase } = useThemeToken();
  return (
    <div
      className="flex h-screen w-full flex-col"
      style={{
        color: colorTextBase,
        background: colorBgElevated,
      }}
    >
      <HeaderSimple />
      {children}
    </div>
  );
}
