import { Yup } from '@/utils';

export const informacoesValidationShema = Yup.object().shape({
  fk_id_local: Yup.number().required('Local é obrigatório'),
  identificador: Yup.string().required('Identificador é obrigatório'),
  descricao: Yup.string().optional(),
  tipo: Yup.string().required('Tipo é obrigatório'),
  ativo: Yup.number().optional(),
});

export const dispositivoValidationShema = Yup.object().shape({
  ...informacoesValidationShema.fields,
});
