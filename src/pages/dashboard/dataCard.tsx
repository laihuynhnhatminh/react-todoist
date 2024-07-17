import { CSSProperties } from 'react';

import { Iconify } from '@/components/icon';

type Props = {
  readonly style?: CSSProperties;
  readonly icon: string;
  readonly title: string;
  readonly currentValue: string;
  readonly maxValue: string;
};

export default function DataCard({ style, icon, title, currentValue, maxValue }: Props) {
  return (
    <div
      className="flex flex-col items-center rounded-2xl py-12"
      style={{
        ...style,
      }}
    >
      <Iconify icon={icon} size={24} />
      <span className="text-sm">{title}</span>
      <span className="text-2xl font-bold">
        {currentValue} /{maxValue}
      </span>
    </div>
  );
}
