'use client';

import { useError } from '@/hooks';
import { IMovimentoCreateEdit } from '@/models';
import { paths, useRouter } from '@/routes';
import { movimentoService } from '@/services';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { MovimentoEditTabs } from './movimento-create-edit-tabs';



type Props = {
  currentData?: IMovimentoCreateEdit;
};

export function MovimentoCreateEditForm({ currentData }: Props) {
  const handleErrors = useError();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [finalizeForm, setFinalizeForm] = useState<boolean>(false);

  const [values, setValues] = useState<IMovimentoCreateEdit>();

  const handleCreate = async (data: IMovimentoCreateEdit) => {
    movimentoService
      .create(data)
      .then((response) => {
        enqueueSnackbar('Criado com sucesso!');
        router.push(paths.dashboard.movimento.list);
      })
      .catch((error) => handleErrors(error, 'Erro na criação!'))
      .finally(() => setFinalizeForm(false));
  };

  const handleUpdate = async (data: IMovimentoCreateEdit) => {
    movimentoService
      .update(Number(currentData?.id_movimento), { ...data, id_movimento: Number(currentData?.id_movimento) })
      .then(() => {
        enqueueSnackbar('Atualizado com sucesso!');
        router.push(paths.dashboard.movimento.list);
      })
      .catch((error) => handleErrors(error, 'Erro na atualização!'))
      .finally(() => setFinalizeForm(false));
  };

  const clearingShippingData = (data: IMovimentoCreateEdit) => {
    return data;
  };

  useEffect(() => {
    if (finalizeForm && values) {
      const data = clearingShippingData(values);
      !currentData ? handleCreate(data) : handleUpdate(data);
    }
  }, [finalizeForm, values, currentData]);

  return (
    <MovimentoEditTabs
      currentData={values || currentData}
      setValues={setValues}
      finalizeForm={finalizeForm}
      setFinalizeForm={setFinalizeForm}
    />
  );
}
