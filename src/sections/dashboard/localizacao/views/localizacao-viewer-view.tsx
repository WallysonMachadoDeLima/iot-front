'use client';

import { useError } from '@/hooks';
import { ILocalizacaoCreateEdit } from '@/models';
import { paths } from '@/routes';
import { localizacaoService } from '@/services';
import { Container } from '@mui/system';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { useRouter } from '@/routes/hooks';
import { Box, Paper, Stack, Typography } from '@mui/material';

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

export function LocalizacaoViewerView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<ILocalizacaoCreateEdit>();

  useEffect(() => {
    localizacaoService
      .findOneById(Number(id))
      .then((response) => setCurrentData(response))
      .catch((error) => {
        handleErrors(error, 'Erro ao consultar Localização');
        router.push(paths.dashboard.localizacao.list);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Visualizar Localização"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Localização',
            href: paths.dashboard.localizacao.list,
          },
          { name: currentData?.nome },
        ]}
      />

      {currentData && (
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
              <ViewField label="Código" value={currentData.id_local} />
              <ViewField label="Nome" value={currentData.nome} />
              <ViewField label="Ativo" value={currentData.ativo ? 'Sim' : 'Não'} />
            </Stack>
          </Stack>
        </Box>
      )}
    </Container>
  );
}
