import { paths } from '@/routes';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

import { RouterLink } from '@/routes/components';



type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  return (
    <Button
      component={RouterLink}
      href={paths.dashboard.root}
      variant="outlined"
      sx={{ mr: 1, ...sx }}
    >
      Login
    </Button>
  );
}
