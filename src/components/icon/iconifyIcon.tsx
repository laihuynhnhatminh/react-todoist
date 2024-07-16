import { Icon } from '@iconify/react';
import styled from 'styled-components';

import type { IconProps } from '@iconify/react';

type Props = IconProps & {
  readonly size?: IconProps['width'];
};

export default function Iconify({ icon, size = '1em', className = '', ...other }: Props) {
  return (
    <StyledIconify className="anticon">
      <Icon icon={icon} width={size} height={size} className={`m-auto ${className}`} {...other} />
    </StyledIconify>
  );
}

const StyledIconify = styled.div`
  display: inline-flex;
  vertical-align: middle;
  svg {
    display: inline-block;
  }
`;
