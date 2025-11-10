'use client';

import { paths } from '@/routes';
import { Container } from '@mui/material';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { DispositivoCreateEditForm } from '../dispositivo-create-edit-form';

export function DispositivoCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Cadastrar Dispositivo"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Dispositivos', href: paths.dashboard.dispositivo.list },
          { name: 'Novo Dispositivo' },
        ]}
      />
      <DispositivoCreateEditForm />
    </Container>
  );
}