import { NavLink } from 'react-router-dom';

import { useThemeToken } from '@/themes/hooks';

import { SvgIcon } from '../icon';

type Props = {
  readonly size?: number | string;
};

function Logo({ size = 50 }: Props) {
  const { colorPrimary } = useThemeToken();

  return (
    <NavLink to="/">
      <SvgIcon icon="ic-logo" color={colorPrimary} size={size} />
    </NavLink>
  );
}

export default Logo;
