'use client';

import { useError } from '@/hooks';
import { ITipoLocalCreateEdit } from '@/models';
import { paths, useRouter } from '@/routes';
import { tipoLocalService } from '@/services';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { TipoLocalEditTabs } from './localizacao-create-edit-tabs';



type Props = {
  currentData?: ITipoLocalCreateEdit;
  isView?: boolean;
};

export function TipoLocalCreateEditForm({ currentData, isView }: Props) {
  const handleErrors = useError();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [finalizeForm, setFinalizeForm] = useState<boolean>(false);

  const [values, setValues] = useState<ITipoLocalCreateEdit>();

  const handleCreate = async (data: ITipoLocalCreateEdit) => {
    tipoLocalService
      .create(data)
      .then((response) => {
        enqueueSnackbar('Criado com sucesso!');
        router.push(paths.dashboard.infraestrutura.tipoLocal.list);
      })
      .catch((error) => handleErrors(error, 'Erro na criação!'))
      .finally(() => setFinalizeForm(false));
  };

  const handleUpdate = async (data: ITipoLocalCreateEdit) => {
    tipoLocalService
      .update(Number(currentData?.id_tipolocal), { ...data, id_tipolocal: Number(currentData?.id_tipolocal) })
      .then(() => {
        enqueueSnackbar('Atualizado com sucesso!');
        router.push(paths.dashboard.infraestrutura.tipoLocal.list);
      })
      .catch((error) => handleErrors(error, 'Erro na atualização!'))
      .finally(() => setFinalizeForm(false));
  };

  const clearingShippingData = (data: ITipoLocalCreateEdit) => {
    return data;
  };

  useEffect(() => {
    if (finalizeForm && values) {
      const data = clearingShippingData(values);
      !currentData ? handleCreate(data) : handleUpdate(data);
    }
  }, [finalizeForm, values, currentData]);

  return (
    <TipoLocalEditTabs
      currentData={values || currentData}
      setValues={setValues}
      finalizeForm={finalizeForm}
      setFinalizeForm={setFinalizeForm}
      isView={isView}
    />
  );
}
