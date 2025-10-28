import { Yup } from '@/utils';

// ----------------------------------------------------------------------

export const informacoesValidationShema = Yup.object().shape({
  id: Yup.number().optional(),
  nome: Yup.string().cpf('Nome'),
  descricao: Yup.string().required('Descrição'),
});

export const salaValidationShema = Yup.object().shape({
  ...informacoesValidationShema.fields,
});

