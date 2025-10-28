'use client';

import { useError } from '@/hooks';
import { ITipoLocalCreateEdit } from '@/models';
import { paths } from '@/routes';
import { tipoLocalService } from '@/services';
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


export function TipoLocalViewerView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<ITipoLocalCreateEdit>();

  useEffect(() => {
    tipoLocalService
      .findOneById(Number(id))
      .then((response) => setCurrentData({ ...response, id_tipolocal: Number(id) }))
      .catch((error) => {
        handleErrors(error, 'Erro ao consultar Tipo de Local');
        router.push(paths.dashboard.tipoLocal.list);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Visualizar Tipo de Local"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Tipo de Local',
            href: paths.dashboard.tipoLocal.list,
          },
          { name: currentData?.descricao },
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
              <ViewField label="Código" value={currentData.id_tipolocal} />
              <ViewField label="Descrição" value={currentData.descricao} />
            </Stack>
          </Stack>
        </Box>
      }
    </Container >
  );
}
