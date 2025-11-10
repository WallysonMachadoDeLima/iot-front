'use client';

import { useError } from '@/hooks';
import { IDispositivoCreateEdit } from '@/models';
import { paths } from '@/routes';
import { dispositivoService } from '@/services';
import { Container } from '@mui/system';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { useRouter } from '@/routes/hooks';

import { DispositivoCreateEditForm } from '../dispositivo-create-edit-form';

export function DispositivoEditView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<IDispositivoCreateEdit>();

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
        heading="Editar Dispositivo"
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

      {currentData && <DispositivoCreateEditForm currentData={currentData} />}
    </Container>
  );
}