import { NavLink } from 'react-router-dom';

import { useThemeToken } from '@/hooks';

import { Iconify } from '../icon';

interface Props {
  readonly size?: number | string;
}

export default function Logo({ size = 50 }: Props) {
  const { colorPrimary } = useThemeToken();

  return (
    <NavLink to="/">
      <Iconify icon="solar:code-square-bold" color={colorPrimary} size={size} />
    </NavLink>
  );
}
