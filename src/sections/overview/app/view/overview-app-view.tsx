'use client';

// next
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from '@/components/settings';



export default function OverviewAppView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Box
            component="img"
            src={`/assets/logo/logo_full.png`}
            sx={{ width: 400, height: 135, my: 2, borderRadius: 3 }}
          />
          <Typography variant="h3" sx={{ mb: 5 }}>
            {'Gráficos estatísticos e muito mais em breve...'}
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
