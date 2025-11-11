import { Yup } from '@/utils';



export const informacoesValidationShema = Yup.object().shape({
  id_movimento: Yup.number().optional(),
  observacoes: Yup.string().required('Obeserção'),
});

export const movimentoValidationShema = Yup.object().shape({
  ...informacoesValidationShema.fields,
});

