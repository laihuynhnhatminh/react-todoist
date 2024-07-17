import { CSSProperties } from 'react';

type Props = {
  readonly style?: CSSProperties;
  readonly taskTitle: string;
};

export default function TaskRow({ style, taskTitle }: Props) {
  return (
    <div
      className="flex flex-col items-center rounded-2xl py-10"
      style={{
        ...style,
      }}
    >
      <span className="text-3xl font-bold">{taskTitle}</span>
      <span className="text-sm">Some random text</span>
    </div>
  );
}
