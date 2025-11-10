
'use client';

import { useError } from '@/hooks';
import { IItemCreateEdit } from '@/models';
import { paths } from '@/routes';
import { itemService } from '@/services/dashboard/item-service';
import { Container } from '@mui/system';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { useRouter } from '@/routes/hooks';

import { ItemCreateEditForm } from '../item-create-edit-form';

export function ItemEditView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const handleErrors = useError();

  const { id } = useParams();

  const [currentData, setCurrentData] = useState<IItemCreateEdit>();

  useEffect(() => {
    itemService
      .findOneById(Number(id))
      .then((response) => setCurrentData(response))
      .catch((error) => {
        handleErrors(error, 'Erro ao consultar Item');
        router.push(paths.dashboard.item.list);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Editar Item"
        links={[
          {
            name: 'Painel',
            href: paths.dashboard.root,
          },
          {
            name: 'Item',
            href: paths.dashboard.item.list,
          },
          { name: currentData?.nome },
        ]}
      />

      {currentData && <ItemCreateEditForm currentData={currentData} />}
    </Container>
  );
}
