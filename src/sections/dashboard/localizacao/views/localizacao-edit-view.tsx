'use client';

import { useError } from '@/hooks';
import { ILocalizacaoCreateEdit } from '@/models';
import { paths } from '@/routes';
import { localizacaoService } from '@/services';
import { Container } from '@mui/system';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { useRouter } from '@/routes/hooks';

import { LocalizacaoCreateEditForm } from '../localizacao-create-edit-form';



export function LocalizacaoEditView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<ILocalizacaoCreateEdit>();

  useEffect(() => {
    localizacaoService
      .findOneById(Number(id))
      .then((response) => setCurrentData(response))
      .catch((error) => {
        handleErrors(error, 'Erro ao consultar Localização');
        router.push(paths.dashboard.localizacao.list);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Editar Localização"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Localização',
            href: paths.dashboard.localizacao.list,
          },
          { name: currentData?.nome },
        ]}
      />

      {currentData && <LocalizacaoCreateEditForm currentData={currentData} />}
    </Container>
  );
}
