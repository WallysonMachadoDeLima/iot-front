'use client';

import { useError } from '@/hooks';
import { ITipoLocalCreateEdit } from '@/models';
import { paths } from '@/routes';
import { tipoLocalService } from '@/services';
import { Container } from '@mui/system';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { useRouter } from '@/routes/hooks';

import { TipoLocalCreateEditForm } from '../localizacao-create-edit-form';



export function TipoLocalViewerView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<ITipoLocalCreateEdit>();

  useEffect(() => {
    tipoLocalService
      .findOneById(Number(id))
      .then((response) => setCurrentData({ ...response, id_tipolocal: Number(id) }))
      .catch((error) => {
        handleErrors(error, 'Erro ao consultar Tipo de Local');
        router.push(paths.dashboard.infraestrutura.tipoLocal.list);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Visualizar Tipo de Local"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Tipo de Local',
            href: paths.dashboard.infraestrutura.tipoLocal.list,
          },
          { name: currentData?.descricao },
        ]}
      />

      {currentData && <TipoLocalCreateEditForm currentData={currentData} isView={true} />}
    </Container>
  );
}
