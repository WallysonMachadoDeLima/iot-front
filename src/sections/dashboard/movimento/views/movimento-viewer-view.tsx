'use client';

import { useError } from '@/hooks';
import { IMovimentoCreateEdit } from '@/models';
import { paths } from '@/routes';
import { movimentoService } from '@/services';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { useRouter } from '@/routes/hooks';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

interface ViewFieldProps {
  label: string;
  value: string | number | undefined;
}

function ViewField({ label, value }: ViewFieldProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Typography variant="body1">
        {value || '-'}
      </Typography>
    </Paper>
  );
}


export function MovimentoViewerView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<IMovimentoCreateEdit>();

  useEffect(() => {
    movimentoService
      .findOneById(Number(id))
      .then((response) => setCurrentData({ ...response, id_movimento: Number(id) }))
      .catch((error) => {
        handleErrors(error, 'Erro ao consultar a Movimentação');
        router.push(paths.dashboard.movimento.list);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Visualizar Movimentação"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Tipo Movimentação',
            href: paths.dashboard.movimento.list,
          },
          { name: currentData?.observacoes },
        ]}
      />

      {currentData &&
        <Box sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <Stack
              direction="row"
              spacing={3}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 3
              }}
            >
              <ViewField label="Código" value={currentData.id_movimento} />
              <ViewField label="Descrição" value={currentData.observacoes} />
            </Stack>
          </Stack>
        </Box>
      }
    </Container >
  );
}
