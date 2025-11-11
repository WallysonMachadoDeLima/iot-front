'use client';

import { useError } from '@/hooks';
import { IMovimentoCreateEdit } from '@/models';
import { paths } from '@/routes';
import { movimentoService } from '@/services';
import { Container } from '@mui/system';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { useRouter } from '@/routes/hooks';

import { MovimentoCreateEditForm } from '../movimento-create-edit-form';



export function MovimentoEditView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<IMovimentoCreateEdit>();

  useEffect(() => {
    movimentoService
      .findOneById(Number(id))
      .then((response) => setCurrentData({ ...response, id_movimento: Number(id) }))
      .catch((error) => {
        handleErrors(error, 'Erro ao consultar Tipo de Movimento.');
        router.push(paths.dashboard.movimento.list);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Editar Tipo de Movimento"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Tipo de Movimento',
            href: paths.dashboard.movimento.list,
          },
          { name: currentData?.observacoes },
        ]}
      />

      {currentData && <MovimentoCreateEditForm currentData={currentData} />}
    </Container>
  );
}
