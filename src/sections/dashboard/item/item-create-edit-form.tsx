
'use client';

import { useError } from '@/hooks';
import { IItemCreateEdit } from '@/models';
import { paths, useRouter } from '@/routes';
import { itemService } from '@/services/dashboard/item-service';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { ItemEditTabs } from './item-create-edit-tabs';

type Props = {
  currentData?: IItemCreateEdit;
};

export function ItemCreateEditForm({ currentData }: Props) {
  const handleErrors = useError();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [finalizeForm, setFinalizeForm] = useState<boolean>(false);

  const [values, setValues] = useState<IItemCreateEdit>();

  const handleCreate = async (data: IItemCreateEdit) => {
    itemService
      .create(data)
      .then((response) => {
        enqueueSnackbar('Criado com sucesso!');
        router.push(paths.dashboard.item.list);
      })
      .catch((error) => handleErrors(error, 'Erro na criação!'))
      .finally(() => setFinalizeForm(false));
  };

  const handleUpdate = async (data: IItemCreateEdit) => {
    itemService
      .update(Number(currentData?.id_item), { ...data, id_item: Number(currentData?.id_item) })
      .then(() => {
        enqueueSnackbar('Atualizado com sucesso!');
        router.push(paths.dashboard.item.list);
      })
      .catch((error) => handleErrors(error, 'Erro na atualização!'))
      .finally(() => setFinalizeForm(false));
  };

  const clearingShippingData = (data: IItemCreateEdit) => {
    return data;
  };

  useEffect(() => {
    if (finalizeForm && values) {
      const data = clearingShippingData(values);
      !currentData ? handleCreate(data) : handleUpdate(data);
    }
  }, [finalizeForm, values, currentData]);

  return (
    <ItemEditTabs
      currentData={values || currentData}
      setValues={setValues}
      finalizeForm={finalizeForm}
      setFinalizeForm={setFinalizeForm}
    />
  );
}
