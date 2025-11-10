import { useEffect } from 'react';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes';
import { Button, Stack } from '@mui/material';
import Iconify from '@/components/iconify';

type Props = {
  filterName?: string;
  onFilterName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function DispositivoTableToolbar({ filterName, onFilterName }: Props) {
  const router = useRouter();

  return (
    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ p: 2.5 }} alignItems="center">
      <div style={{ flex: 1 }} />
      <Button
        onClick={() => router.push(paths.dashboard.dispositivo.create)}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
      >
        Novo Dispositivo
      </Button>
    </Stack>
  );
}