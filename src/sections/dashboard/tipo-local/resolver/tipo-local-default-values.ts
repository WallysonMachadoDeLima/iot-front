import { ITipoLocalCreateEdit } from "@/models";



export const TipoLocalDefaultValues = (currentData?: ITipoLocalCreateEdit) => {
  return {
    id_tipolocal: currentData?.id_tipolocal || 0,
    descricao: currentData?.descricao || '',
  };
};
