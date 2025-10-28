import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Logo from '@/components/logo';
import { NavSectionMini } from '@/components/nav-section';
// theme
import { hideScroll } from '@/theme/css';
import { getLocalItem } from '@/utils/storage';

import { NavToggleButton } from '../_common';
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';



export default function NavMini() {
  const navData = useNavData();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <NavSectionMini
          data={navData}
          config={{
            currentRole: getLocalItem('user')?.authorities,
          }}
        />
      </Stack>
    </Box>
  );
}
