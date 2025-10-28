'use client';

import { paths } from '@/routes';
import { Container } from '@mui/material';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';

import { SalaCreateEditForm } from '../sala-create-edit-form';

// ----------------------------------------------------------------------

export function SalaCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Cadastrar Sala"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Salas',
            href: paths.dashboard.infraestrutura.sala.list,
          },
          { name: 'Nova Sala' },
        ]}
      />
      <SalaCreateEditForm />
    </Container>
  );
}
