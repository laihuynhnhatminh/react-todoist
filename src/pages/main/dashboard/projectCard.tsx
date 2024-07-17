import Color from 'color';
import { CSSProperties } from 'react';

import { TodoistColor, TodoistColorCode } from '@/enums';

type Props = {
  readonly style?: CSSProperties;
  readonly projectName: string;
  readonly projectColor: TodoistColor;
};

export default function ProjectCard({ style, projectName, projectColor }: Props) {
  const colorCode = TodoistColorCode[projectColor];
  const projectCardStyle: CSSProperties = {
    background: `linear-gradient(135deg, ${Color(colorCode).alpha(0.2).toString()}, ${Color(colorCode).alpha(0.6).toString()}) rgb(255, 255, 255)`,
  };

  return (
    <div
      className="flex flex-col items-center rounded-2xl py-10"
      style={{
        ...projectCardStyle,
        ...style,
      }}
    >
      <span className="text-3xl font-bold">{projectName}</span>
      <span className="text-sm">Some random text</span>
    </div>
  );
}
