'use client';

import { paths } from '@/routes';
import { Container } from '@mui/material';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { LocalizacaoCreateEditForm } from '../localizacao-create-edit-form';


export function LocalizacaoCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Cadastrar Localização"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Localização',
            href: paths.dashboard.localizacao.list,
          },
          { name: 'Novo Localização' },
        ]}
      />
      <LocalizacaoCreateEditForm />
    </Container>
  );
}
