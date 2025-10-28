'use client';

import { useEffect, useState } from 'react';
import { useError } from '@/hooks';
import { ISalaCreateEdit } from '@/models';
import { paths, useRouter } from '@/routes';
import { salaService } from '@/services';
import { useSnackbar } from 'notistack';

import { SalaEditTabs } from './sala-create-edit-tabs';

// ----------------------------------------------------------------------

type Props = {
  currentData?: ISalaCreateEdit;
  isView?: boolean;
};

export function SalaCreateEditForm({ currentData, isView }: Props) {
  const handleErrors = useError();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [finalizeForm, setFinalizeForm] = useState<boolean>(false);

  const [values, setValues] = useState<ISalaCreateEdit>();

  const handleCreate = async (data: ISalaCreateEdit) => {
    salaService
      .create(data)
      .then((response) => {
        enqueueSnackbar('Criado com sucesso!');
        router.push(paths.dashboard.infraestrutura.sala.list);
      })
      .catch((error) => handleErrors(error, 'Erro na criação!'))
      .finally(() => setFinalizeForm(false));
  };

  const handleUpdate = async (data: ISalaCreateEdit) => {
    salaService
      .update(Number(currentData?.id), { ...data, id: Number(currentData?.id) })
      .then(() => {
        enqueueSnackbar('Atualizado com sucesso!');
        router.push(paths.dashboard.infraestrutura.sala.list);
      })
      .catch((error) => handleErrors(error, 'Erro na atualização!'))
      .finally(() => setFinalizeForm(false));
  };

  const clearingShippingData = (data: ISalaCreateEdit) => {
    return data;
  };

  useEffect(() => {
    if (finalizeForm && values) {
      const data = clearingShippingData(values);
      !currentData ? handleCreate(data) : handleUpdate(data);
    }
  }, [finalizeForm, values, currentData]);

  return (
    <SalaEditTabs
      currentData={values || currentData}
      setValues={setValues}
      finalizeForm={finalizeForm}
      setFinalizeForm={setFinalizeForm}
      isView={isView}
    />
  );
}
