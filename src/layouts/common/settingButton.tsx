import { m } from 'framer-motion';
import { useState } from 'react';

import { varHover } from '@/components/animations/variants';
import { IconButton, SvgIcon } from '@/components/icon';

export default function SettingButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <m.div
        animate={{
          rotate: [0, drawerOpen ? 0 : 360],
        }}
        transition={{
          duration: 12,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
      >
        <IconButton className="h-10 w-10">
          <SvgIcon icon="setting-icon" size="24" />
        </IconButton>
      </m.div>
    </div>
  );
}
