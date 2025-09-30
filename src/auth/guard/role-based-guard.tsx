import Container from '@mui/material/Container';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';

import { ForbiddenIllustration } from '@/assets/illustrations';
import { MotionContainer, varBounce } from '@/components/animate';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({ hasContent, roles, children, sx }: RoleBasedGuardProp) {
  const { user } = useAuthContext();

  const currentRoles = user?.authorities;

  if (typeof roles !== 'undefined' && !roles.some((role) => currentRoles.includes(role))) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
