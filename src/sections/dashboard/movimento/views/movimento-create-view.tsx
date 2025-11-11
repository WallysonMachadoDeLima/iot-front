'use client';

import { paths } from '@/routes';
import { Container } from '@mui/material';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';

import { MovimentoCreateEditForm } from '../movimento-create-edit-form';



export function MovimentoCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Cadastrar Movimento"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Tipos de Movimentação',
            href: paths.dashboard.movimento.list,
          },
          { name: 'Novo Tipo de Local' },
        ]}
      />
      <MovimentoCreateEditForm />
    </Container>
  );
}
