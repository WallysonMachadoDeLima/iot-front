import { ISalaCreateEdit } from "@/models";

// ----------------------------------------------------------------------

export const SalaDefaultValues = (currentData?: ISalaCreateEdit) => {
  return {
    id: currentData?.id || '',
    nome: currentData?.nome || '',
    descricao: currentData?.descricao || '',
  };
};
