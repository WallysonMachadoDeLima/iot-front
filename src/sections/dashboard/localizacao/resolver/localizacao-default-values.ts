import { ILocalizacaoCreateEdit } from '@/models';


export const LocalizacaoDefaultValues = (currentData?: ILocalizacaoCreateEdit) => {
  return {
    fk_id_tipolocal: currentData?.fk_id_tipolocal ?? '',
    nome: currentData?.nome || '',
    ativo: currentData?.ativo ?? true,
  };
};
