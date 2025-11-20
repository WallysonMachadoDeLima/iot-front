import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';

// auth
import { useAuthContext } from '@/auth/hooks';
import { varHover } from '@/components/animate';
import CustomPopover, { usePopover } from '@/components/custom-popover';
import { useSnackbar } from '@/components/snackbar';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { getLocalItem } from '@/utils/storage';



const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: paths.dashboard.general.app,
  },
  {
    label: 'Settings',
    linkTo: paths.dashboard.general.app,
  },
];



export default function AccountPopover() {
  const router = useRouter();

  const user = getLocalItem('user');

  const { logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <Box
        component={m.div}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.02)}
        onClick={popover.onOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1,
          borderRadius: 2,
          cursor: 'pointer',
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          transition: 'all 0.2s',
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.photoURL}
          alt={user?.name}
          sx={{
            width: 40,
            height: 40,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>
      </Box>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 180, p: 0 }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        arrow="bottom-left"
        hiddenArrow
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/*
        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
        <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
          {option.label}
        </MenuItem>
          ))}
        </Stack>
         */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Sair
        </MenuItem>
      </CustomPopover>
    </>
  );
}

