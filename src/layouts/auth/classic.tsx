import { useResponsive } from '@/hooks';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// auth
import { useAuthContext } from '@/auth/hooks';
import Logo from '@/components/logo';
import { useSettingsContext } from '@/components/settings';
import { paths } from '@/routes/paths';
// theme
import { bgGradient } from '@/theme/css';



const METHODS = [
  {
    id: 'jwt',
    label: 'Jwt',
    path: paths.auth.jwt.login,
    icon: '/assets/icons/auth/ic_jwt.svg',
  },
];

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const { method } = useAuthContext();

  const { themeMode } = useSettingsContext();

  const theme = useTheme();

  const upMd = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        py: { xs: 15, md: 30 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      spacing={10}
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94,
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      <Typography variant="h3" sx={{ maxWidth: 480, textAlign: 'center' }}>
        {title || 'PROJETO IOT'}
      </Typography>

      <Box
        component="img"
        alt="auth"
        src={image || `/assets/logo/logo_full.png`}
        sx={{ maxWidth: 600, borderRadius: 3 }}
      />

      <Stack direction="row" spacing={2}>
        {/*
        {METHODS.map((option) => (
          <Tooltip key={option.label} title={option.label}>
            <Link component={RouterLink} href={option.path}>
              <Box
                component="img"
                alt={option.label}
                src={option.icon}
                sx={{
                  width: 32,
                  height: 32,
                  ...(method !== option.id && {
                    filter: 'grayscale(100%)',
                  }),
                }}
              />
            </Link>
          </Tooltip>
        ))}
        */}
      </Stack>
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {renderLogo}

      {upMd && renderSection}

      {renderContent}
    </Stack>
  );
}
