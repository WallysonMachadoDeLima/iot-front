'use client';

import { useResponsive } from '@/hooks';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';

import Logo from '@/components/logo';
import { NavSectionVertical } from '@/components/nav-section';
import Scrollbar from '@/components/scrollbar';
import { usePathname } from '@/routes/hooks';
import { getLocalItem } from '@/utils/storage';

import { AccountPopover } from '../_common';
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';



type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 1 }} />

      <NavSectionVertical
        data={navData}
        config={{
          currentRole: getLocalItem('user')?.authorities,
        }}
      />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },

      }}
    >

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
            borderRadius: 2,
            boxShadow: (theme) => theme.shadows[4],
          }}
        >
          {renderContent}

          <Stack
            flexGrow={1}
            direction="row"
            alignItems="center"
            sx={{
              ml: 2,
              mb: 2,
            }}
            spacing={{ xs: 0.5, sm: 1 }}
          >
            <AccountPopover />
          </Stack>
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
