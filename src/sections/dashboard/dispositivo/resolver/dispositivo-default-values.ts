import { IDispositivoCreateEdit } from '@/models';

export const DispositivoDefaultValues = (currentData?: IDispositivoCreateEdit) => {
  return {
    fk_id_local: currentData?.fk_id_local ?? '',
    identificador: currentData?.identificador || '',
    descricao: currentData?.descricao || '',
    tipo: currentData?.tipo || '',
    ativo: currentData?.ativo ?? 1,
  };
};
