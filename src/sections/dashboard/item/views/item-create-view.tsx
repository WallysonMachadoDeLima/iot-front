
'use client';

import { paths } from '@/routes';
import { Container } from '@mui/material';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { ItemCreateEditForm } from '../item-create-edit-form';

export function ItemCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Cadastrar Item"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Item',
            href: paths.dashboard.item.list,
          },
          { name: 'Novo Item' },
        ]}
      />
      <ItemCreateEditForm />
    </Container>
  );
}
