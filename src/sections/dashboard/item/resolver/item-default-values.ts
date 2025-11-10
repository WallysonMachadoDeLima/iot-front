
import { IItemCreateEdit } from '@/models';

export const ItemDefaultValues = (currentData?: IItemCreateEdit) => {
  return {
    tag_codigo: currentData?.tag_codigo || '',
    nome: currentData?.nome || '',
    descricao: currentData?.descricao || '',
    ativo: currentData?.ativo ?? true,
    fk_id_local_origem: currentData?.fk_id_local_origem ?? '',
  };
};
