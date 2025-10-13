'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useError } from '@/hooks';
import { ISalaCreateEdit } from '@/models';
import { paths } from '@/routes';
import { salaService } from '@/services';
import { Container } from '@mui/system';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { useRouter } from '@/routes/hooks';

import { SalaCreateEditForm } from '../sala-create-edit-form';

// ----------------------------------------------------------------------

export function SalaViewerView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<ISalaCreateEdit>();

  useEffect(() => {
    salaService
      .findOneById(Number(id))
      .then((response) => setCurrentData({ ...response, id: Number(id) }))
      .catch((error) => {
        handleErrors(error, 'Erro ao consultar Sala');
        router.push(paths.dashboard.sala.list);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Visualizar Sala"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Sala',
            href: paths.dashboard.sala.list,
          },
          { name: currentData?.descricao },
        ]}
      />

      {currentData && <SalaCreateEditForm currentData={currentData} isView={true} />}
    </Container>
  );
}
