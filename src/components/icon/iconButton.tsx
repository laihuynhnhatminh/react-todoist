import { ButtonProps } from 'antd';
import { CSSProperties, ReactNode } from 'react';

interface Props extends ButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function IconButton({ children, className, style, onClick }: Props) {
  return (
    <button
      style={style}
      className={`hover:bg-hover flex cursor-pointer items-center justify-center rounded-full p-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
