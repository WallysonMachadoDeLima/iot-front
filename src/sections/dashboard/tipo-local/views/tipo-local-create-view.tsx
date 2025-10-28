'use client';

import { paths } from '@/routes';
import { Container } from '@mui/material';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';

import { TipoLocalCreateEditForm } from '../tipo-local-create-edit-form';



export function TipoLocalCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Cadastrar Tipo de Local"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Tipos de Local',
            href: paths.dashboard.tipoLocal.list,
          },
          { name: 'Novo Tipo de Local' },
        ]}
      />
      <TipoLocalCreateEditForm />
    </Container>
  );
}
