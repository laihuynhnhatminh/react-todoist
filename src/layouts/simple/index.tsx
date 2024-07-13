import { useThemeToken } from '@/hooks';

import SimpleHeader from '../common/simpleHeader';

interface Props {
  children: React.ReactNode;
}

export default function SimpleLayout({ children }: Props) {
  const { colorBgElevated, colorTextBase } = useThemeToken();
  return (
    <div
      className="flex h-screen w-full flex-col"
      style={{ color: colorTextBase, background: colorBgElevated }}
    >
      <SimpleHeader />
      {children}
    </div>
  );
}
