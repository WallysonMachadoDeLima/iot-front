'use client';

import { useError } from '@/hooks';
import { ILocalizacaoCreateEdit } from '@/models';
import { paths, useRouter } from '@/routes';
import { localizacaoService } from '@/services';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import { LocalizacaoEditTabs } from './localizacao-create-edit-tabs';



type Props = {
  currentData?: ILocalizacaoCreateEdit;
};

export function LocalizacaoCreateEditForm({ currentData }: Props) {
  const handleErrors = useError();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [finalizeForm, setFinalizeForm] = useState<boolean>(false);

  const [values, setValues] = useState<ILocalizacaoCreateEdit>();

  const handleCreate = async (data: ILocalizacaoCreateEdit) => {
    localizacaoService
      .create(data)
      .then((response) => {
        enqueueSnackbar('Criado com sucesso!');
        router.push(paths.dashboard.localizacao.list);
      })
      .catch((error) => handleErrors(error, 'Erro na criação!'))
      .finally(() => setFinalizeForm(false));
  };

  const handleUpdate = async (data: ILocalizacaoCreateEdit) => {
    localizacaoService
      .update(Number(currentData?.id_local), { ...data, id_local: Number(currentData?.id_local) })
      .then(() => {
        enqueueSnackbar('Atualizado com sucesso!');
        router.push(paths.dashboard.localizacao.list);
      })
      .catch((error) => handleErrors(error, 'Erro na atualização!'))
      .finally(() => setFinalizeForm(false));
  };

  const clearingShippingData = (data: ILocalizacaoCreateEdit) => {
    return data;
  };

  useEffect(() => {
    if (finalizeForm && values) {
      const data = clearingShippingData(values);
      !currentData ? handleCreate(data) : handleUpdate(data);
    }
  }, [finalizeForm, values, currentData]);

  return (
    <LocalizacaoEditTabs
      currentData={values || currentData}
      setValues={setValues}
      finalizeForm={finalizeForm}
      setFinalizeForm={setFinalizeForm}
    />
  );
}
