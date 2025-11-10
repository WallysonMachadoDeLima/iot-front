'use client';

import { useError } from '@/hooks';
import { IDispositivoCreateEdit } from '@/models';
import { paths, useRouter } from '@/routes';
import { dispositivoService } from '@/services';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { DispositivoCreateEditTabs } from './dispositivo-create-edit-tabs';

type Props = {
  currentData?: IDispositivoCreateEdit;
};

export function DispositivoCreateEditForm({ currentData }: Props) {
  const handleErrors = useError();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [finalizeForm, setFinalizeForm] = useState<boolean>(false);

  const [values, setValues] = useState<IDispositivoCreateEdit>();

  const handleCreate = async (data: IDispositivoCreateEdit) => {
    dispositivoService
      .create(data)
      .then((response) => {
        enqueueSnackbar('Criado com sucesso!');
        router.push(paths.dashboard.dispositivo.list);
      })
      .catch((error) => handleErrors(error, 'Erro na criação!'))
      .finally(() => setFinalizeForm(false));
  };

  const handleUpdate = async (data: IDispositivoCreateEdit) => {
    dispositivoService
      .update(Number(currentData?.id_dispositivo), { ...data, id_dispositivo: Number(currentData?.id_dispositivo) })
      .then(() => {
        enqueueSnackbar('Atualizado com sucesso!');
        router.push(paths.dashboard.dispositivo.list);
      })
      .catch((error) => handleErrors(error, 'Erro na atualização!'))
      .finally(() => setFinalizeForm(false));
  };

  const clearingShippingData = (data: IDispositivoCreateEdit) => {
    return data;
  };

  useEffect(() => {
    if (finalizeForm && values) {
      const data = clearingShippingData(values);
      !currentData ? handleCreate(data) : handleUpdate(data);
    }
  }, [finalizeForm, values, currentData]);

  return (
    <DispositivoCreateEditTabs
      currentData={values || currentData}
      setValues={setValues}
      finalizeForm={finalizeForm}
      setFinalizeForm={setFinalizeForm}
    />
  );
}