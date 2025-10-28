import { Yup } from '@/utils';


export const informacoesValidationShema = Yup.object().shape({
  fk_id_tipolocal: Yup.number().required('Tipo de Local é obrigatório'),
  nome: Yup.string().required('Nome é obrigatório'),
  ativo: Yup.number().optional(),
});

export const localizacaoValidationShema = Yup.object().shape({
  ...informacoesValidationShema.fields,
});

