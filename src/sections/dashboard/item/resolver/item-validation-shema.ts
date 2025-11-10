
import { Yup } from '@/utils';

export const informacoesValidationShema = Yup.object().shape({
  tag_codigo: Yup.string().required('Tag/Código é obrigatório'),
  nome: Yup.string().required('Nome é obrigatório'),
  descricao: Yup.string().optional(),
  ativo: Yup.boolean().optional(),
  fk_id_local_origem: Yup.number().required('Local de Origem é obrigatório'),
});

export const itemValidationShema = Yup.object().shape({
  ...informacoesValidationShema.fields,
});
