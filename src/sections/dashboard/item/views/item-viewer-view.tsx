
'use client';

import { useError } from '@/hooks';
import { IItemFindAll } from '@/models';
import { paths } from '@/routes';
import { itemService } from '@/services/dashboard/item-service';
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
    <Paper sx={{ p: 2, flexGrow: 1 }}>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Typography variant="body1">
        {value || '-'}
      </Typography>
    </Paper>
  );
}

export function ItemViewerView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<IItemFindAll>();

  useEffect(() => {
    itemService
      .findOneById(Number(id))
      .then((response) => setCurrentData(response))
      .catch((error) => {
        handleErrors(error, 'Erro ao consultar Item');
        router.push(paths.dashboard.item.list);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Visualizar Item"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Item',
            href: paths.dashboard.item.list,
          },
          { name: currentData?.nome },
        ]}
      />

      {currentData && (
        <Box sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
              <ViewField label="Código" value={currentData.id_item} />
              <ViewField label="Tag/Código" value={currentData.tag_codigo} />
              <ViewField label="Ativo" value={currentData.ativo ? 'Sim' : 'Não'} />
            </Stack>
            <Stack direction="row" spacing={3}>
                <ViewField label="Nome" value={currentData.nome} />
                <ViewField label="Local de Origem" value={currentData.local_origem?.nome} />
            </Stack>
            <Stack>
                <ViewField label="Descrição" value={currentData.descricao} />
            </Stack>
          </Stack>
        </Box>
      )}
    </Container>
  );
}
