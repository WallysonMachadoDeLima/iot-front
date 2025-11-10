'use client';

import { useError } from '@/hooks';
import { IDispositivoFindAll } from '@/models';
import { paths } from '@/routes';
import { dispositivoService } from '@/services/dashboard';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { useRouter } from '@/routes/hooks';

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

export function DispositivoViewerView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<IDispositivoFindAll>();

  useEffect(() => {
    dispositivoService
      .findOneById(Number(id))
      .then((response) => setCurrentData(response))
      .catch((error) => {
        handleErrors(error, 'Erro ao consultar Dispositivo');
        router.push(paths.dashboard.dispositivo.list);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Visualizar Dispositivo"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Dispositivo',
            href: paths.dashboard.dispositivo.list,
          },
          { name: currentData?.identificador },
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
              <ViewField label="ID" value={currentData.id_dispositivo} />
              <ViewField label="Identificador" value={currentData.identificador} />
              <ViewField label="Descrição" value={currentData.descricao} />
              <ViewField label="Tipo" value={currentData.tipo} />
              <ViewField label="Localização" value={currentData.localizacao} />
              <ViewField label="Status" value={currentData.ativo ? 'Ativo' : 'Inativo'} />
              <ViewField
                label="Data de Criação"
                value={new Date(currentData.criado_em).toLocaleDateString()}
              />
            </Stack>
          </Stack>
        </Box>
      )}
    </Container>
  );
}