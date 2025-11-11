import { IMovimentoCreateEdit } from "@/models";



export const MovimentoDefaultValues = (currentData?: IMovimentoCreateEdit) => {
  return {
    id_movimento: currentData?.id_movimento || 0,
    observacoes: currentData?.observacoes || '',
  };
};
